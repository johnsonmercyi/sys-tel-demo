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
    <div
      className={clsx(
        "max-w-[70%] px-4 py-2 rounded-lg text-sm",
        isUser
          ? "ml-auto bg-green-500 text-white rounded-br-none"
          : "mr-auto bg-white border rounded-bl-none"
      )}
    >
      {content}
    </div>
  );
};

export default MessageBubble;
