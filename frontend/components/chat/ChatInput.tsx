"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SendIcon } from "lucide-react";

const ChatInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  return (
    <div className="border-t border-gray-200">
      <div className="relative p-5 h-fit w-full">
        <Input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Type your message..."
          className="w-full h-12 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          disabled={!message.trim()}
          className="h-10 w-10 rounded-full mt-2 absolute right-7 top-4 cursor-pointer hover:bg-primary/90 flex items-center justify-center p-0"
          onClick={handleSend}
        >
          <SendIcon className="rotate-45" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
