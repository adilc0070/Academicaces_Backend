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
const assignment_1 = __importDefault(require("../models/assignment"));
class AssignmentRepo {
    createAssignment(assignment) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAssignment = new assignment_1.default(assignment);
            return yield newAssignment.save();
        });
    }
    findAssignmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("id", id);
            return yield assignment_1.default.findById(id);
        });
    }
    findAssignmentByInstructorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield assignment_1.default.find({ instructor: id }).populate('courseId', 'title');
        });
    }
    findByCourseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield assignment_1.default.find({ courseId: id });
        });
    }
}
exports.default = AssignmentRepo;
