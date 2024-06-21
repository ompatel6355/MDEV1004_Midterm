"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipe_1 = require("../Controllers/recipe");
router.get('/', (req, res, next) => { (0, recipe_1.DisplayRecipeList)(req, res, next); });
router.get('/:id', (req, res, next) => { (0, recipe_1.DisplayRecipeById)(req, res, next); });
router.post('/add', (req, res, next) => { (0, recipe_1.AddRecipe)(req, res, next); });
router.put('/update/:id', (req, res, next) => { (0, recipe_1.UpdateRecipe)(req, res, next); });
router.delete('/delete/:id', (req, res, next) => { (0, recipe_1.DeleteRecipe)(req, res, next); });
exports.default = router;
//# sourceMappingURL=index.js.map