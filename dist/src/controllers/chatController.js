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
class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chatService.getChat(req.params.id);
            res.json(response);
        });
    }
    listStudentChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chatService.listStudentChats(req.params.id);
            res.json(response);
        });
    }
    listInstructorChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chatService.listInstructorChats(req.params.id);
            res.json(response);
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chatService.createMessage(req.params.id, req.body.message);
            res.json(response);
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.chatService.getMessages(req.params.id);
            res.json(response);
        });
    }
}
exports.default = ChatController;
