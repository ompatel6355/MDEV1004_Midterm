"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRecipe = exports.UpdateRecipe = exports.AddRecipe = exports.DisplayRecipeById = exports.DisplayRecipeList = void 0;
const recipe_1 = __importDefault(require("../Models/recipe"));
const Util_1 = require("../Util");
function DisplayRecipeList(req, res, next) {
    recipe_1.default.find({})
        .then((data) => {
        res.status(200).json({ success: true, msg: "Recipe List Retrieved and Displayed", data: data });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to retrieve recipe list", data: err });
    });
}
exports.DisplayRecipeList = DisplayRecipeList;
function DisplayRecipeById(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to retrieve a recipe", data: "" });
    }
    else {
        recipe_1.default.findById({ _id: id })
            .then((data) => {
            if (data) {
                res.status(200).json({ success: true, msg: "One Recipe Retrieved and Displayed", data: data });
            }
            else {
                res.status(404).json({ success: false, msg: "Recipe not found", data: "" });
            }
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to retrieve recipe", data: err });
        });
    }
}
exports.DisplayRecipeById = DisplayRecipeById;
function AddRecipe(req, res, next) {
    let ingredients = (req.body.ingredients) ? (0, Util_1.SanitizeArray)(req.body.ingredients) : (0, Util_1.SanitizeArray)("");
    let instructions = (req.body.instructions) ? (0, Util_1.SanitizeArray)(req.body.instructions) : (0, Util_1.SanitizeArray)("");
    let recipe = new recipe_1.default({
        title: req.body.title,
        ingredients: ingredients,
        instructions: instructions,
        origin: req.body.origin,
        preparationTime: req.body.preparationTime,
        servingSize: req.body.servingSize,
        difficulty: req.body.difficulty,
        calorieCount: req.body.calorieCount,
        microNutrients: req.body.microNutrients,
        sourceURL: req.body.sourceURL,
        imageURL: req.body.imageURL
    });
    recipe_1.default.create(recipe)
        .then(() => {
        res.status(200).json({ success: true, msg: "Recipe added", data: recipe });
    })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to add recipe", data: err });
    });
}
exports.AddRecipe = AddRecipe;
function UpdateRecipe(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to update a recipe", data: "" });
    }
    else {
        let ingredients = (req.body.ingredients) ? (0, Util_1.SanitizeArray)(req.body.ingredients) : (0, Util_1.SanitizeArray)("");
        let instructions = (req.body.instructions) ? (0, Util_1.SanitizeArray)(req.body.instructions) : (0, Util_1.SanitizeArray)("");
        let recipeToUpdate = {
            _id: id,
            title: req.body.title,
            ingredients: ingredients,
            instructions: instructions,
            origin: req.body.origin,
            preparationTime: req.body.preparationTime,
            servingSize: req.body.servingSize,
            difficulty: req.body.difficulty,
            calorieCount: req.body.calorieCount,
            microNutrients: req.body.microNutrients,
            sourceURL: req.body.sourceURL,
            imageURL: req.body.imageURL
        };
        recipe_1.default.updateOne({ _id: id }, recipeToUpdate)
            .then(() => {
            res.status(200).json({ success: true, msg: "Recipe updated", data: recipeToUpdate });
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to update recipe", data: err });
        });
    }
}
exports.UpdateRecipe = UpdateRecipe;
function DeleteRecipe(req, res, next) {
    let id = req.params.id;
    if (id.length != 24) {
        res.status(400).json({ success: false, msg: "A valid ID is required to delete a recipe", data: "" });
    }
    else {
        recipe_1.default.deleteOne({ _id: id })
            .then(() => {
            res.status(200).json({ success: true, msg: "Recipe deleted", data: id });
        })
            .catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to delete recipe", data: err });
        });
    }
}
exports.DeleteRecipe = DeleteRecipe;
//# sourceMappingURL=recipe.js.map