import express from 'express';
const router = express.Router();

import { DisplayRecipeList, DisplayRecipeById, AddRecipe, UpdateRecipe, DeleteRecipe } from '../Controllers/recipe';

/* List of Routes (endpoints) */

/* GET Recipe List. */
router.get('/', (req, res, next) => {  DisplayRecipeList(req, res, next); });

/* GET Recipe by ID. */
router.get('/:id', (req, res, next) => {  DisplayRecipeById(req, res, next); });

/* Add Recipe */
router.post('/add', (req, res, next) => {  AddRecipe(req, res, next); });

/* Update Recipe */
router.put('/update/:id', (req, res, next) => {  UpdateRecipe(req, res, next); });

/* Delete Recipe */
router.delete('/delete/:id', (req, res, next) => {  DeleteRecipe(req, res, next); });

export default router;
