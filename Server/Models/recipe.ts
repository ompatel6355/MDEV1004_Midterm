import { Collection, Schema, model } from 'mongoose';

// recipes Interface - defines the structure of a recipe document

interface IRecipe
{
    title: string;
    ingredients: string[];
    instructions: string[];
    origin: string;
    preparationTime: string;
    servingSize: string;
    difficulty: string;
    calorieCount: string;
    microNutrients: string;
    sourceURL: string;
    imageURL: string;
}

const recipeSchema = new Schema<IRecipe>({
    title: String,
    ingredients: [String],
    instructions: [String],
    origin: String,
    preparationTime: String,
    servingSize: String,
    difficulty: String,
    calorieCount: String,
    microNutrients: String,
    sourceURL: String,
    imageURL: String
});

let Recipe = model<IRecipe>('recipe', recipeSchema);

export default Recipe;