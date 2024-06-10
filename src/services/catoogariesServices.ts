import { ICategory } from "../interfaces/catogariesInterface";
import CatogariesRepo from "../repositories/catogariesRepository";

class CatogariesService {
    private catogariesRepo: CatogariesRepo;

    constructor(catogariesRepo: CatogariesRepo) {
        this.catogariesRepo = catogariesRepo
    }
    async createCatogary(name: string): Promise<ICategory | null> {
        try {
            return await this.catogariesRepo.createCatogary(name);

        } catch (error) {
            throw error
        }
    }
    async getCatogaries(page: number, limit: number): Promise<{ catogaries: ICategory[], total: number }> {
        try {
            const catogaries = await this.catogariesRepo.getCatogaries(page, limit);
            const total = await this.catogariesRepo.getCatogariesCount();
            return { catogaries, total };
        } catch (error) {
            throw error;
        }
    }
    
    async getCatogaryById(id: string): Promise<ICategory | null> {
        try {
            return await this.catogariesRepo.getCatogaryById(id);
        } catch (error) {
            throw error
        }
    }

    async updateCatogary(id: string, name: string): Promise<ICategory[] | null> {
        try {
            return await this.catogariesRepo.updateCatogaryById(id, name);
        } catch (error) {
            throw error
        }
    }
    async deleteCatogary(id: string): Promise<ICategory | null> {
        try {
            return await this.catogariesRepo.deleteCatogaryById(id);
        } catch (error) {
            throw error
        }
    }
    async blockStatus(id: string, status: boolean): Promise<ICategory[] | null> {
        try {
            return await this.catogariesRepo.blockStatus(id, status);
        } catch (error) {
            throw error
        }
    }

    async incrimentNos(id: string): Promise<ICategory | null> {
        try {
            return await this.catogariesRepo.incrimentNos(id);
        } catch (error) {
            throw error
        }
    }
    async decrimentNos(id: string): Promise<ICategory | null> {
        try {
            return await this.catogariesRepo.decrimentNos(id);
        } catch (error) {
            throw error
        }
    }
    
}

export default CatogariesService