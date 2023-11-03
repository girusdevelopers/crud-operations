import { Request, Response } from 'express';
import Article from '@/models/article.model' 
// Import your Mongoose model

// Controller function to create a new article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const { magazineTitle, body } = req.body;
    const article = new Article({ magazineTitle, body });
    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the article' });
  }
};

// Controller function to get all articles
export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Controller function to get a specific article by ID
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the article' });
  }
};
//-==+---+++----++++-----+++++++++
// export const getArticleByWord = async (req: Request, res: Response) => {
//     try {
//       const name = req.params.word.toLowerCase();
//       const magazines = await Article.find({});
//       const magazineName = magazines.map((magazineTitle) => magazineTitle.magazine.toLowerCase());
//       console.log(magazineName);
  
//       let foundMagazines = [];
//       for (const filename of magazineName) {
//         if (filename.includes(name)) {
//           foundMagazines.push(filename);
//         }
//       }
//       if (foundMagazines.length > 0) {
//         res.status(200).json(foundMagazines);
//       } else {
//         res.status(200).json({ message: `${name} Magazine Not Found.` });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "An error occurred while fetching Magazine." });
//     }
//   };//--------------------------------------------------


export const getArticleByWord = async (req, res) => {
  try {
    const name = req.params.word.toLowerCase();

    // Find articles that match the provided word
    const articles = await Article.find({ magazineTitle: { $regex: name, $options: 'i' } });

    if (articles.length > 0) {
      const magazineNames = articles.map((article) => article.magazineTitle);
      res.status(200).json(magazineNames);
    } else {
      res.status(404).json({ message: `${name} Magazine Not Found.` });
    }
  } catch (error) {
    console.error('Error while fetching articles:', error);
    res.status(500).json({ error: 'An error occurred while fetching articles.' });
  }
};






// Controller function to update an existing article by ID
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const { magazineTitle, body } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      { magazineTitle, body },
      { new: true } // Return the updated article
    );

    if (updatedArticle) {
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the article' });
  }
};

// Controller function to delete an article by ID
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const articleId = req.params.id;
    const deletedArticle = await Article.findByIdAndRemove(articleId);
    
    if (deletedArticle) {
      res.status(204).json(); // No content on successful deletion
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the article' });
  }
};
