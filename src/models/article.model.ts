import mongoose,{model,Schema} from "mongoose";

type Article ={
    magazineTitle:string;
    body:string;
}

// Create a Mongoose schema for the Article type
const articleSchema = new mongoose.Schema<Article>({
  magazineTitle: String,
  body: String,
});

// Create a Mongoose model for the Article type
const Article = mongoose.model("Article", articleSchema);

export default Article;
