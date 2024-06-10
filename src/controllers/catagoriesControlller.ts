import { Request, Response } from "express";
import CatogariesService from "../services/catoogariesServices";
// import { ICategory } from "../interfaces/catogariesInterface"; 

class CatagoriesController {
    private catogariesService: CatogariesService
    constructor(catogariesService: CatogariesService) {
        this.catogariesService = catogariesService
    }
    async createCatogary(req: Request, res: Response) {
        try {
            const name  = req.body.value
            
            const catogary = await this.catogariesService.createCatogary(name)
            res.status(200).json({ catogary })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
    async getCatogaries(req: Request, res: Response) {
        try {
            const { page = 1, limit = 8 } = req.query;
            const { catogaries, total } = await this.catogariesService.getCatogaries(Number(page), Number(limit));
            res.status(200).json({ catogaries, total });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    
    async getCatogaryById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const catogary = await this.catogariesService.getCatogaryById(id)
            res.status(200).json({ catogary })
        } catch (error) {
            res.status(400).json({ error })
        }
    }   
    async updateCatogary(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name } = req.body;

        
        
        try {
            const updatedCategory = await this.catogariesService.updateCatogary(id, name);
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            throw error
        }
    }
    async deleteCatogary(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deletedCatogary = await this.catogariesService.deleteCatogary(id);
            if (deletedCatogary) {
                res.status(200).json(deletedCatogary);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            throw error
        }
    }
    async blockStatus(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const updatedCategory = await this.catogariesService.blockStatus(id, status);
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            throw error
        }
    }

}

export default CatagoriesController