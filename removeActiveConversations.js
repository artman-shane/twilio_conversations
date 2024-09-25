import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_SECRET_SID,
  process.env.TWILIO_SECRET_KEY,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

client.conversations.v1.conversations
  .list({ state: "active" })
  .then((conversations) => {
    conversations.forEach((conversation) => {
      console.log(`Conversation ${conversation.sid} found`);
      client.conversations.v1
        .conversations(conversation.sid)
        .remove()
        .then(() => {
          console.log(`Conversation ${conversation.sid} removed`);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  })
  .catch((err) => {
    console.error(err);
  });
