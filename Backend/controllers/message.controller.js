import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { decrypt, encrypt } from "../utils/crypto.js";

export const sendMessage=async (req,res)=>{
    try {
        const {message}=req.body;
        const {id: receiverId}=req.params
        const senderId=req.user.id;

        let conversation= await Conversation.findOne({
            participants: {$all:[senderId,receiverId]} // in the Conversation collection, it will search for the conversation between the two ids, by searching the participants array
        })

        if(!conversation){
            // if its the first time they are sending a message, we will create a new entry in the collection 

            conversation= await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const encryptedMessage=encrypt(message);
        const newMessage=new Message({senderId, receiverId, message: encryptedMessage.content, iv: encryptedMessage.iv});

        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(),newMessage.save()]);

        const decryptedMessage = {
            ...newMessage._doc,
            message: decrypt({ iv: newMessage.iv, content: newMessage.message })
        };
        return res.status(200).json(decryptedMessage);

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}


export const getMessages=async (req,res)=>{
    try {
        const {id: receiverId}=req.params;
        const senderId=req.user.id;

        const conversation=await Conversation.findOne({
            participants: {$all:[senderId,receiverId]}
        }).populate("messages") // this will create an array of objects with actual messages between the users

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages.map(message => {
            return {
                ...message._doc,
                message: decrypt({ iv: message.iv, content: message.message })
            };
        });

        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({message: "Internal Server Error!"});
    }
}