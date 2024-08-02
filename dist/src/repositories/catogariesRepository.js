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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catogories_1 = __importDefault(require("../models/catogories"));
class CatogariesRepo {
    createCatogary(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCatogary = new catogories_1.default({
                name
            });
            return yield newCatogary.save();
        });
    }
    getCatogaries(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            return yield catogories_1.default.find({}).skip(skip).limit(limit);
        });
    }
    getCatogariesCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.countDocuments({});
        });
    }
    getCatogaryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findById(id);
        });
    }
    deleteCatogaryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findByIdAndDelete(id);
        });
    }
    updateCatogaryById(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findByIdAndUpdate(id, { name }, { new: true });
        });
    }
    blockStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findByIdAndUpdate(id, { isBlock: status }, { new: true });
        });
    }
    incrimentNos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findByIdAndUpdate(id, { $inc: { noCoures: 1 } });
        });
    }
    decrimentNos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield catogories_1.default.findByIdAndUpdate(id, { $inc: { noCoures: -1 } });
        });
    }
}
exports.default = CatogariesRepo;
