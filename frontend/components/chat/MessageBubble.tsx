import clsx from "clsx";

const MessageBubble = ({
  role,
  content,
}: {
  role: "user" | "system";
  content: string;
}) => {
  const isUser = role === "user";
  return (
    <div className="flex gap-2">
      {!isUser && (
        <div className="h-10 w-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-xl border border-primary/30">
          🤖
        </div>
      )}
      <div
        className={clsx(
          "w-fit max-w-[70%] px-4 py-2 rounded-lg text-sm",
          isUser
            ? "ml-auto bg-primary/90 border text-white rounded-br-none"
            : "mr-auto bg-emerald-50 border rounded-bl-none"
        )}
      >
        {content}
      </div>
      {isUser && (
        <div className="h-10 w-10 rounded-full bg-primary/90 flex items-center justify-center text-white text-xl border border-emerald-200">
          U
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
