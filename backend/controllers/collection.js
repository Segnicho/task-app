import Collection from "../models/collection.js";
import Task from "../models/task.js";

export const createCollection = async (req, res) => {
    try {
        const collection = await Collection.create(req.body);
        return res.status(201).json({ collection });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getAllCollections = async (req, res) => {
    try {
        const collections = await Collection.findAll({
        });
        console.log("collections are", collections);
        return res.status(200).json({ collections });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = await Collection.findOne({
            where: { id: id },
            include: Task
        });
        if (collection) {
            return res.status(200).json({ collection });
        }
        return res.status(404).send("Collection with the specified ID does not exists");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const updateCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Collection.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedCollection = await Collection.findOne({ where: { id: id } });
            return res.status(200).json({ collection: updatedCollection });
        }
        throw new Error("Collection not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export const deleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Collection.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Collection deleted");
        }
        throw new Error("Collection not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
