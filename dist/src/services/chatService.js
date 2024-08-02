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
class ChatService {
    constructor(chatRepo) {
        this.chatRepo = chatRepo;
    }
    getChat(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.getChat(id);
        });
    }
    listStudentChats(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.listStudentChats(id);
        });
    }
    listInstructorChats(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.listInstructorChats(id);
        });
    }
    createMessage(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.createMessage(id, message);
        });
    }
    getMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.chatRepo.getMessages(id);
        });
    }
}
exports.default = ChatService;
