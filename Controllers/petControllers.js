import Pet from '../Models/pet.js'; // Correct import

// Create a new pet
export const createPet = async (req, res) => {
    const {
        name,
        breed,
        age,
        temperament,
        specialNeeds,
        photo,
        description,
        owner,
        
    } = req.body;

    try {
        const pet = await Pet.create({
            name,
            breed,
            age,
            temperament,
            specialNeeds,
            photo,
            description,
            owner,
            
        });
        res.status(200).json({ message: 'Pet created successfully', data: pet });
    } catch (error) {
        res.status(500).json({ message: 'Error creating pet', data: error });
    }
};

// Get all pets
export const getPets = async (req, res) => {
    try {
        const pet = await Pet.find().populate('owner', 'username');
        res.status(200).json({ message: 'Pets retrieved successfully', data: pet });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving pets', data: error });
    }
};

// Get pet by ID
export const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner', 'username');
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet retrieved successfully', data: pet });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving pet', data: error });
    }
};

// Update a pet
export const updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet updated successfully', data: pet });
    } catch (error) {
        res.status(400).json({ message: 'Error updating pet', data: error });
    }
};

// Delete a pet
export const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet deleted successfully', data: pet });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting pet', data: error });
    }
};
