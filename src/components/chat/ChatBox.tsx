"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
// CHANGE: Corrected the import path to use the reliable alias.
import MessageBubble from "../MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
// CHANGE: Corrected the import path for the Loader component.
import Loader from "@/components/Loader";

interface ChatBoxProps {
  messages: Message[];
  isLoading: boolean;
  onRemoveMessage: (messageId: string) => void;
  onResendMessage: (messageId: string) => void;
}

const LoadingSkeleton = () => (
  <div className="flex items-start gap-3 animate-pulse">
    <div className="w-8 h-8 rounded-full bg-muted" />
    <div className="flex-1 space-y-2">
      Assistant is thinking
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
    </div>
  </div>
);

export default function ChatBox({
  messages,
  isLoading,
  onRemoveMessage,
  onResendMessage,
}: ChatBoxProps) {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <ScrollArea className="h-full w-full">
      <div
        className="w-full max-w-4xl mx-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onRemove={onRemoveMessage}
            onResend={onResendMessage}
          />
        ))}
        {isLoading && <LoadingSkeleton />}
        <div ref={scrollAnchorRef} />
      </div>
    </ScrollArea>
  );
}
