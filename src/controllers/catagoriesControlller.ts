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
            console.log(req.body);
            const name  = req.body.value
            console.log(name);
            
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

}

export default CatagoriesController