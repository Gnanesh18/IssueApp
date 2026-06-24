const express = require('express');
const Issue = require('../models/issues');

const router = express.Router();

// Create Issue
router.post('/', async (req, res) => {
    try {
        const newIssue = new Issue(req.body);
        await newIssue.save();
        res.status(201).json(newIssue);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Issues
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.json(issues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Issue
router.put('/:id', async (req, res) => {
    try {
        const updatedIssue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedIssue);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Issue
router.delete('/:id', async (req, res) => {
    try {
        await Issue.findByIdAndDelete(req.params.id);
        res.json({ message: 'Issue deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;