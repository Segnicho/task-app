import express from 'express';

import { getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection } from '../controllers/collection.js';

const router = express.Router();

router.get('/', getAllCollections);
router.post('/', createCollection);
router.patch('/:id', updateCollection);
router.delete('/:id', deleteCollection);

export default router;