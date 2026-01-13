const ChatContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col h-screen w-full">{children}</div>;
};

export default ChatContainer;
