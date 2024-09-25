import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

class ManageConversations {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_SECRET_SID,
      process.env.TWILIO_SECRET_KEY,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    );
    this.client.conversations.v1.conversations.list;
    this.conversations = this.client.conversations.v1.conversations;
    this.participantConversations =
      this.client.conversations.v1.participantConversations;
  }

  removeAllConversationsByState(state) {
    if (state !== "active" && state !== "inactive" && state !== "closed") {
      throw new Error(
        "Invalid state. State must be 'active', 'inactive', or 'closed'."
      );
    }

    this.conversations
      .list({ state })
      .then((conversations) => {
        conversations.forEach((conversation) => {
          console.log(`Conversation ${conversation.sid} found`);
          this.client.conversations.v1
            .conversations(conversation.sid)
            .remove()
            .then(() => {
              console.log(
                `Conversation ${conversation.sid}:${state} - removed`
              );
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async findConversationsByContact(_contact) {
    const conversations = await this.participantConversations
      .list({ address: _contact, limit: 20 })
    return conversations;
  }

  async getMessageBody(_conversationSid) {
    const messages = await this.conversations(_conversationSid)
      .messages.list()
    return messages;
  }
}

export default ManageConversations;
