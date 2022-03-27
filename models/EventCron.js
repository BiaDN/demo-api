const mongoose = require('mongoose')

const EventCronSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    blockHash: {
        type: String,
        required: true
    },
    blockNumber: {
        type: Number,
        required: true
    },
    transactionHash: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        unique: true,
        required: true
    },
    returnValues: {
        type: Object,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    raw: {
        type: Object,
        required: true
    },
    balance: {
        type: Number,
    }
}, { timestamps: { createdAt: 'created_at' } })
// , { timestamps: { createdAt: 'created_at' } }
module.exports = mongoose.model('EventCron', EventCronSchema)