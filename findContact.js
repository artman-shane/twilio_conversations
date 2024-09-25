import ManageConversations from "./manageConversations.js";
import dotenv from "dotenv";

dotenv.config();

const manageConversations = new ManageConversations();

const conversations = await manageConversations.findConversationsByContact(process.env.CONTACT_LOOKUP_NUMBER);
console.log(`Here are some conversations:`);
const messages = await conversations.forEach((conversation) => {
  console.log(conversation.conversationSid);
  const _messages = manageConversations
    .getMessageBody(conversation.conversationSid)
    .then((messages) => {
      messages.forEach((message) => {
        console.log(message.conversationSid, message.body, message.author);
      });
    });
});

console.log(messages);

// conversations.forEach((conversation) => {
//   manageConversations.getMessageBody(conversation);
// });
