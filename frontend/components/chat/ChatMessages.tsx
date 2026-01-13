import MessageBubble from "./MessageBubble";
import { ChatMessage } from "./utils/chat.types";

const ChatMessages = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 py-6 space-y-3 chat-bg">
      {messages.map(msg => (
        <MessageBubble 
          key={msg.id} 
          role={msg.role} 
          content={msg.content} 
        />
      ))}
    </div>
  );
};

export default ChatMessages;
