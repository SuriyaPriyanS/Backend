import Pet from '../Models/pet.js';
import User from '../Models/user.js';
import sendEmail from '../Nodemadeailer/SentEmail.js'; 

export const contactOwner = async (req, res) => {
    const { petId } = req.body;
    const userId = req.user.id;

    try {
        const pet = await Pet.findById(petId).populate('owner');
        const user = await User.findById(userId);

        if (!pet || !pet.owner) {
            return res.status(404).json({ message: 'Pet or owner not found' });
        }

        // Example logic to send contact details (e.g., email or notification)
        // await sendEmail(pet.owner.email, user.email, user.name);

        res.status(200).json({ message: 'Contact details sent to the owner' });
    } catch (error) {
        res.status(500).json({ message: 'Error contacting owner', error });
    }
};
