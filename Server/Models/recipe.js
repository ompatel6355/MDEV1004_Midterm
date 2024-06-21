"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
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
let Recipe = (0, mongoose_1.model)('recipe', recipeSchema);
exports.default = Recipe;
//# sourceMappingURL=recipe.js.map