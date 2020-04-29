'use strict';

const connectToDatabase = require('./db');
const { honeyInfo, beekeeper } = require('./schema');

module.exports.getOne = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase()
        .then(() => {
            honeyInfo.findOne({ batchId: event.pathParameters.id })
                .then(data => {
                    beekeeper.findOne({ _id: data._doc.beekeeper })
                        .then(beekeeperData =>  {
                            callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    ...data._doc,
                                    beekeeper: {
                                        ...beekeeperData._doc,
                                    },
                                })
                            })
                    })
                })
                .catch(err => callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Could not fetch the note.'
                }));
        })
};
