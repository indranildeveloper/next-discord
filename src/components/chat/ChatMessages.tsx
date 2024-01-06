"use client";

import { FC, Fragment } from "react";
import { Loader2, ServerCrash } from "lucide-react";
import { ChatMessagesProps } from "@/interface/components/ChatMessagesProps";
import ChatWelcome from "./ChatWelcome";
import { useChatQuery } from "@/hooks/useChatQuery";
import { MessageWithMemberWithProfile } from "@/types/server";

const ChatMessages: FC<ChatMessagesProps> = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}) => {
  const queryKey = `chat:${chatId}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "pending") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading Messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />

      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, idx) => (
          <Fragment key={idx}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;