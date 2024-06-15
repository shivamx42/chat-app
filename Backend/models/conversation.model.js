import mongoose from "mongoose";

// this model is there for all the conversations between two users (i.e. personal messages)

// so each entry in the conversation collection will have an id which will correspond to the conversations between the two users and in the participants array will be the ids of the users
// in the messages array, all the ids of all the messages that have taken place between the users will be present 

const conversationSchema = new mongoose.Schema({
	
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],

}, { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;