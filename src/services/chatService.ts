import ChatRepo from "../repositories/chatRepository";

class ChatService {
    private chatRepo: ChatRepo;
    constructor(chatRepo: ChatRepo) {
        this.chatRepo = chatRepo;
    }

    async getChat(id: string) {
        return await this.chatRepo.getChat(id);
    }

    async listStudentChats(id: string) {
        return await this.chatRepo.listStudentChats(id);
    }

    async listInstructorChats(id: string) {
        return await this.chatRepo.listInstructorChats(id);
    }

    async createMessage(id: string, message: string) {
        return await this.chatRepo.createMessage(id, message);
    }

    async getMessages(id: string) {
        return await this.chatRepo.getMessages(id);
    }
}

export default ChatService;