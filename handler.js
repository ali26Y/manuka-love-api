'use strict';

const connectToDatabase = require('./db');
const { honeyInfo, beekeeper, beekeeperLocation, honeyJarPhoto, locationDetailPhoto, locationPhotoLink } = require('./schema');

module.exports.getOne = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectToDatabase();
        const data = await honeyInfo.findOne({ batchId: event.pathParameters.id });

        const findBeekeeperLocation = async () => await beekeeperLocation.findOne({ _id: data._doc.beekeeperLocation });
        const findJarImageData = async () => await honeyJarPhoto.findOne({ _id: data.JarImage });
        const [beekeeperLocationData, jarImageData] = await Promise.all([
            findBeekeeperLocation(),
            findJarImageData(),
        ]);

        const findBeekeeper = async () => await beekeeper.findOne({ _id: beekeeperLocationData.beekeeper });
        const findLocationLink = async () => await locationPhotoLink.find({ BeekeeperLocation_left_id: beekeeperLocationData._id });
        const [beekeeperData, locationPhotoLinkData] = await Promise.all([
            findBeekeeper(),
            findLocationLink(),
        ]);

        const locationDetail = await locationDetailPhoto.find({ 
            $or: [ 
                {  _id: beekeeperLocationData._doc.locationPhotos },
                ...locationPhotoLinkData.map(item => ({
                    _id: item.locationDetailPhoto_right_id,
                })),
            ]
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ 
                ...data._doc, 
                beekeeper: beekeeperData._doc,
                location: {
                    ...beekeeperLocationData._doc,
                    locationDetailPhoto: locationDetail,
                },
                JarImage: jarImageData._doc,
            })
       };

    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
            },
            body: 'Could not fetch the data.'
        }
    }
}
