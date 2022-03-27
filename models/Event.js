const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    address: {
        type: String,
    },
    blockHash: {
        type: String,
        unique: true,

    },
    blockNumber: {
        type: Number,

    },
    transactionHash: {
        type: String,
        unique: true,

    },
    id: {
        type: String,
        unique: true,

    },
    returnValues: {
        type: Object,

    },
    event: {
        type: String,

    },
    signature: {
        type: String,

    },
    raw: {
        type: Object,

    }
}, { timestamps: { createdAt: 'created_at' } })
// , { timestamps: { createdAt: 'created_at' } }
module.exports = mongoose.model('Event', EventSchema)