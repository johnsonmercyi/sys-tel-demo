"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import { ChatMessage } from "@/components/chat/utils/chat.types";
import { useEffect, useState } from "react";

export default function Home() {
  const [telemetry, setTelemetry] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        timestamp: Date.now(),
      },
    ]);

    const delayAndReply = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: `Rayda AI understands that you said: "${message}"`,
          timestamp: Date.now(),
        },
      ]);
    }

    delayAndReply();
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
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </ChatContainer>
  );
}
