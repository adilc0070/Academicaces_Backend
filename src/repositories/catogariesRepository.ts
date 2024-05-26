import catogories from "../models/catogories";
import { ICategory } from "../interfaces/catogariesInterface";


class CatogariesRepo {
    async createCatogary(name: string): Promise<ICategory | null> {

        const newCatogary = new catogories({
            name
        })
        return await newCatogary.save()
    }

    async getCatogaries(): Promise<ICategory[]> {
        return await catogories.find({})
    }

    async getCatogaryById(id: string): Promise<ICategory | null> {
        return await catogories.findById(id)
    }

    async deleteCatogaryById(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndDelete(id)
    }

    async updateCatogaryById(id: string, name: string): Promise<ICategory | null> {
        return await catogories.findByIdAndUpdate(id, { name })
    }
    async incrimentNos(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndUpdate(id, { $inc: { noCoures: 1 } })
    }

    async decrimentNos(id: string): Promise<ICategory | null> {
        return await catogories.findByIdAndUpdate(id, { $inc: { noCoures: -1 } })
    }
}

export default CatogariesRepo
