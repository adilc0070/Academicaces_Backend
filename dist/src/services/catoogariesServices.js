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
class CatogariesService {
    constructor(catogariesRepo) {
        this.catogariesRepo = catogariesRepo;
    }
    createCatogary(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.createCatogary(name);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCatogaries(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catogaries = yield this.catogariesRepo.getCatogaries(page, limit);
                const total = yield this.catogariesRepo.getCatogariesCount();
                return { catogaries, total };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCatogaryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.getCatogaryById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCatogary(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.updateCatogaryById(id, name);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCatogary(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.deleteCatogaryById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    blockStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.blockStatus(id, status);
            }
            catch (error) {
                throw error;
            }
        });
    }
    incrimentNos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.incrimentNos(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    decrimentNos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catogariesRepo.decrimentNos(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CatogariesService;
