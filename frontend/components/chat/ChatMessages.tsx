import MessageBubble from "./MessageBubble";
import { ChatMessage } from "./utils/chat.types";

const welcomeButtons = ["View Telemetry", "Get Started", "Help"];

const ChatMessages = ({
  messages,
  handleButtonClick,
}: {
  messages: ChatMessage[];
  handleButtonClick: (btnText: string) => void;
}) => {
  const handleClick = (btn: string) => {
    if (btn === "View Telemetry") {
      handleButtonClick("View Telemetry");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 py-6 space-y-3 chat-bg">
      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-xl border border-primary/30">
          🤖
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-fit max-w-[9=100%] px-4 py-2 rounded-lg text-sm mr-auto bg-emerald-50 border rounded-bl-none">
            <h1 className="text-lg font-medium">
              Hey, I'm Rayda AI Assistant! How can I assist you today?
            </h1>
          </div>
          <div className="flex flex-wrap gap-1">
            {welcomeButtons.map((btn) => (
              <div
                key={btn}
                onClick={() => handleClick(btn)}
                className="p-1 px-2 bg-primary border border-sidebar-ring w-fit text-white text-sm rounded-full font-medium cursor-pointer hover:bg-primary/90 text-center shadow-md"
              >
                {btn}
              </div>
            ))}
          </div>
        </div>
      </div>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatMessages;
