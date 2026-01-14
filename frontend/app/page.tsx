"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChatMessage } from "@/components/chat/utils/chat.types";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);


  const handleSend = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      },
    ]);

    const delayAndReply = async (content: any) => {
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          role: "system",
          content,
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
    };

    if (message.trim() === "View Telemetry") {
      console.log("User message:", message);
      const data = await window.electron.getTelemetry();
      setTelemetry(data);
      delayAndReply(
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
    } else {
      delayAndReply(`Rayda AI understands that you said: "${message}"`);
    }
  };

  useEffect(() => {
    const fetchTelemetry = async () => {
      const data = await window.electron.getTelemetry();
      setTelemetry(data);
    };
    fetchTelemetry();

    // Refresh and fetch updated telemetry data every 15 seconds
    const interval = setInterval(fetchTelemetry, 15_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChatContainer>
      <ChatHeader />
      <ChatMessages messages={messages} handleButtonClick={handleSend} isTyping={isTyping} />
      <ChatInput onSend={handleSend} />
    </ChatContainer>
  );
}
