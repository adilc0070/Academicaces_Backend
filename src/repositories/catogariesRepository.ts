import catogories from "../models/catogories";
import { ICategory } from "../interfaces/catogariesInterface";


class CatogariesRepo {
    async createCatogary(name: string): Promise<ICategory | null> {

        const newCatogary = new catogories({
            name
        })
        return await newCatogary.save()
    }

    async getCatogaries(page: number, limit: number): Promise<ICategory[]> {
        const skip = (page - 1) * limit;
        return await catogories.find({}).skip(skip).limit(limit);
    }
    
    async getCatogariesCount(): Promise<number> {
        return await catogories.countDocuments({});
    }
    

    async getCatogaryById(id: string): Promise<ICategory | null> {
        return await catogories.findById(id)
    }

    async deleteCatogaryById(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndDelete(id)
    }

    async updateCatogaryById(id: string, name: string): Promise<ICategory[] | null> {
        return await catogories.findByIdAndUpdate(id, { name }, { new: true })

    }
    async blockStatus(id: string, status: boolean): Promise<ICategory[] | null> {
        return await catogories.findByIdAndUpdate(id, { isBlock: status }, { new: true })
    }
    async incrimentNos(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndUpdate(id, { $inc: { noCoures: 1 } })
    }

    async decrimentNos(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndUpdate(id, { $inc: { noCoures: -1 } })
    }
}

export default CatogariesRepo
