'use client';

import { useState } from "react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const ChatInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <Input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type your message..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button className="mt-2" variant="secondary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;