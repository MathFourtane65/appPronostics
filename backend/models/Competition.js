const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    description: {
        type: String,
    },
    numberMatches: {
        type: Number,
    },
    listMatches: {
        type: [String],
    }
})

module.exports = mongoose.model('Competition', CompetitionSchema);