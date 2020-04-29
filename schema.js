const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    beekeeper: mongoose.ObjectId,
});

const beekeeperSchema = new Schema({
    _id: Schema.Types.ObjectId,
    city: String,
    postcode: String,
    area: String,
    firstName: String,
    lastName: String,
    nickName: String,
});

module.exports = {
    honeyInfo: mongoose.model('honeyinfos', honeyInfoSchema),
    beekeeper: mongoose.model('beekeepers', beekeeperSchema),
};
