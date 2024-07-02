import ChatService from "../services/chatService";
class ChatController {
    private chatService: ChatService
    constructor(chatService: ChatService) {
        this.chatService = chatService
    }
    async getChat(req: any, res: any) {
        const response = await this.chatService.getChat(req.params.id)
        res.json(response)
    }
    async listStudentChats(req: any, res: any) {
        const response = await this.chatService.listStudentChats(req.params.id)
        res.json(response)
    }
    async listInstructorChats(req: any, res: any) {
        
        const response = await this.chatService.listInstructorChats(req.params.id)
        res.json(response)
    }
    async createMessage(req: any, res: any) {
        const response = await this.chatService.createMessage(req.params.id, req.body.message)
        res.json(response)
    }
    async getMessages(req: any, res: any) {
        const response = await this.chatService.getMessages(req.params.id)
        res.json(response)
    }

}
export default ChatController