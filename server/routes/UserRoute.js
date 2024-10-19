import express from 'express';
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser, searchUsers } from '../controllers/UserController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express.Router();

// Existing routes
router.get('/:id', getUser);
router.get('/', getAllUsers);
router.put('/:id', authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unfollowUser);

// New route for searching users
router.get('/search', searchUsers);  // Add this line for searching users

export default router;
