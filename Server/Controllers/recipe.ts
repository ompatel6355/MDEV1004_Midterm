import { Request, Response, NextFunction } from 'express';

import Recipe from '../Models/recipe';
import { SanitizeArray } from '../Util';

/**
 * This function displays the recipe list in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayRecipeList(req: Request, res: Response, next: NextFunction): void
{
    Recipe.find({})
    .then((data) =>
    {
        res.status(200).json({success: true, msg: "Recipe List Retrieved and Displayed", data: data})
    })
    .catch((err) =>
    {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to retrieve recipe list", data: err });
    });
}

/**
 * This function displays a single recipe by ID in JSON format
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DisplayRecipeById(req: Request, res: Response, next: NextFunction) : void
{
    // endpoint should be /api/:id
    let id = req.params.id;

    // ensure that the id is valid
    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to retrieve a recipe", data: ""});
    }
    else
    {
        Recipe.findById({_id: id})
        .then((data) =>
        {
            if(data)
            {
                res.status(200).json({success: true, msg: "One Recipe Retrieved and Displayed", data: data});
            }
            else
            {
                res.status(404).json({success: false, msg: "Recipe not found", data: ""});
            }
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to retrieve recipe", data: err });
        });
    }
}

/**
 * This function adds a recipe to the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function AddRecipe(req: Request, res: Response, next: NextFunction): void
{
    let ingredients = (req.body.ingredients) ?  SanitizeArray(req.body.ingredients as string) : SanitizeArray("");
    let instructions = (req.body.instructions) ? SanitizeArray(req.body.instructions as string) : SanitizeArray("");

    let recipe = new Recipe({
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
 
    Recipe.create(recipe)
    .then(() =>
    {
        res.status(200).json({success: true, msg: "Recipe added", data: recipe});
    })
    .catch((err) =>
    {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to add recipe", data: err });
    });
}

/**
 * This function updates a recipe in the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function UpdateRecipe(req: Request, res: Response, next: NextFunction): void
{
    // endpoint should be /api/update/:id
    let id = req.params.id;

    // ensure that the id is valid
    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to update a recipe", data: ""});
    }
    else
    {
        let ingredients = (req.body.ingredients) ?  SanitizeArray(req.body.ingredients as string) : SanitizeArray("");
        let instructions = (req.body.instructions) ? SanitizeArray(req.body.instructions as string) : SanitizeArray("");

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

        Recipe.updateOne({_id: id}, recipeToUpdate)
        .then(() =>
        {
            res.status(200).json({success: true, msg: "Recipe updated", data: recipeToUpdate});
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to update recipe", data: err });
        });
    }
}

/**
 * This function deletes a recipe from the database
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function DeleteRecipe(req: Request, res: Response, next: NextFunction): void
{
    // endpoint should be /api/delete/:id
    let id = req.params.id;

    // ensure that the id is valid
    if (id.length != 24)
    {
        res.status(400).json({success: false, msg: "A valid ID is required to delete a recipe", data: ""});
    }
    else
    {
        Recipe.deleteOne({_id: id})
        .then(() =>
        {
            res.status(200).json({success: true, msg: "Recipe deleted", data: id});
        })
        .catch((err) =>
        {
            console.error(err);
            res.status(500).json({ success: false, msg: "Failed to delete recipe", data: err });
        });
    }
}
