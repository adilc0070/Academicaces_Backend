import { Request, Response } from "express";
import CatogariesService from "../services/catoogariesServices";
import { ICategory } from "../interfaces/catogariesInterface";

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
    async getCatogaries(_req: Request, res: Response) {
        try {
            const catogaries: ICategory[] = await this.catogariesService.getCatogaries()
            res.status(200).json({ catogaries })
        } catch (error) {
            res.status(400).json({ error })
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

}

export default CatagoriesController