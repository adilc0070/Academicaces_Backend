"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CatagoriesController {
    constructor(catogariesService) {
        this.catogariesService = catogariesService;
    }
    createCatogary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.body.value;
                const catogary = yield this.catogariesService.createCatogary(name);
                res.status(200).json({ catogary });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
    getCatogaries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 8 } = req.query;
                const { catogaries, total } = yield this.catogariesService.getCatogaries(Number(page), Number(limit));
                res.status(200).json({ catogaries, total });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
    getCatogaryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const catogary = yield this.catogariesService.getCatogaryById(id);
                res.status(200).json({ catogary });
            }
            catch (error) {
                res.status(400).json({ error });
            }
        });
    }
    updateCatogary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            try {
                const updatedCategory = yield this.catogariesService.updateCatogary(id, name);
                if (updatedCategory) {
                    res.status(200).json(updatedCategory);
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCatogary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedCatogary = yield this.catogariesService.deleteCatogary(id);
                if (deletedCatogary) {
                    res.status(200).json(deletedCatogary);
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    blockStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            try {
                const updatedCategory = yield this.catogariesService.blockStatus(id, status);
                if (updatedCategory) {
                    res.status(200).json(updatedCategory);
                }
                else {
                    res.status(404).json({ message: 'Category not found' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CatagoriesController;
