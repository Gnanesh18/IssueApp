const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    },
    due: {
        type: Number
    },
    owner: {
        type: String
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low']
    },
    status: {
        type: String,
        default: 'Open',
        enum: ['Open', 'In Progress', 'Resolved']
    }
});

module.exports = mongoose.model('Issue', issueSchema);