const Disease = require('../models/Disease');

// @desc    Get all diseases
// @route   GET /api/diseases
// @access  Public
const getDiseases = async (req, res) => {
    try {
        const diseases = await Disease.find({});
        res.json(diseases);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get disease by ID
// @route   GET /api/diseases/:id
// @access  Public
const getDiseaseById = async (req, res) => {
    try {
        const disease = await Disease.findOne({ id: req.params.id });
        if (disease) {
            res.json(disease);
        } else {
            res.status(404).json({ message: 'Disease not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a disease
// @route   POST /api/diseases
// @access  Private (Admin)
const createDisease = async (req, res) => {
    try {
        const { id, name, category, description, symptoms, treatments, image } = req.body;
        const diseaseExists = await Disease.findOne({ id });

        if (diseaseExists) {
            return res.status(400).json({ message: 'Disease ID already exists' });
        }

        const disease = await Disease.create({
            id, name, category, description, symptoms, treatments, image
        });

        res.status(201).json(disease);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a disease
// @route   PUT /api/diseases/:id
// @access  Private (Admin)
const updateDisease = async (req, res) => {
    try {
        const disease = await Disease.findOne({ id: req.params.id });

        if (disease) {
            disease.name = req.body.name || disease.name;
            disease.category = req.body.category || disease.category;
            disease.description = req.body.description || disease.description;
            disease.symptoms = req.body.symptoms || disease.symptoms;
            disease.treatments = req.body.treatments || disease.treatments;
            disease.image = req.body.image || disease.image;

            const updatedDisease = await disease.save();
            res.json(updatedDisease);
        } else {
            res.status(404).json({ message: 'Disease not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a disease
// @route   DELETE /api/diseases/:id
// @access  Private (Admin)
const deleteDisease = async (req, res) => {
    try {
        const disease = await Disease.findOne({ id: req.params.id });

        if (disease) {
            await disease.deleteOne();
            res.json({ message: 'Disease removed' });
        } else {
            res.status(404).json({ message: 'Disease not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getDiseases, getDiseaseById, createDisease, updateDisease, deleteDisease };
