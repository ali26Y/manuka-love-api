const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const honeyJarPhotoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    photo: {
        _meta: {
            Location: String,
        },
    }
});

const locationDetailPhotoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    photo: {
        _meta: {
            Location: String,
        },
    }
});

const locationPhotoLinkSchema = new Schema({
    BeekeeperLocation_left_id: Schema.Types.ObjectId,
    locationDetailPhoto_right_id: Schema.Types.ObjectId,
})

const honeyInfoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    batchId: String,
    analyticaFile: {
        _meta: {
            Location: String,
        },
    },
    mgo: Number,
    rmpId: String,
    mfgDate_utc: Date,
    bbDate_utc: Date,
    beekeeperLocation: Schema.Types.ObjectId,
    JarImage: Schema.Types.ObjectId,
});

const beekeeperSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    isPublic: Boolean,
    beekeeperProfileImage: {
        _meta: {
            Location: String,
        },
    },
});

const beekeeperLocationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    city: String,
    postcode: String,
    area: String,
    latitude: Number,
    longitude: Number,
    shortDescription: String,
    mapImage: {
        _meta: {
            Location: String,
        },
    },
    beekeeper: Schema.Types.ObjectId,
});

module.exports = {
    honeyInfo: mongoose.model('honeyinfos', honeyInfoSchema),
    beekeeper: mongoose.model('beekeepers', beekeeperSchema),
    beekeeperLocation: mongoose.model('beekeeperlocations', beekeeperLocationSchema),
    honeyJarPhoto: mongoose.model('honeyjarphotos', honeyJarPhotoSchema),
    locationDetailPhoto: mongoose.model('locationdetailphotos', locationDetailPhotoSchema),
    locationPhotoLink: mongoose.model('beekeeperlocation_locationphotos_manies', locationPhotoLinkSchema),
};
