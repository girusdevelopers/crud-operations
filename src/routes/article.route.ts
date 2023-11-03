import express from 'express';
import {
  createArticle,
  getArticles,
  getArticleById,
  getArticleByWord,
  updateArticle,
  deleteArticle,
} from '@controllers/article.controller'; // Import your controller functions

const router = express.Router();

// Define routes for article operations
router.post('/articles', createArticle); // Create a new article
router.get('/articles', getArticles); // Get all articles
router.get('/articles/:id', getArticleById); // Get a specific article by ID
router.get('/article/:word',getArticleByWord);//Get a specific article by word
router.put('/articles/:id', updateArticle); // Update an article by ID
router.delete('/articles/:id', deleteArticle); // Delete an article by ID

export default router;
