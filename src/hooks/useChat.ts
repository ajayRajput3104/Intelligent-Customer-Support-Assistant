"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { getAiResponse } from "@/lib/api";
import { Message } from "@/types/chat";

// CHANGE: Switched to sessionStorage for session-only persistence.
const SESSION_STORAGE_KEY = "chat_session_history";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      // CHANGE: Load messages from sessionStorage on initial load.
      const savedMessages = sessionStorage.getItem(SESSION_STORAGE_KEY);
      const parsedMessages: Message[] = savedMessages
        ? JSON.parse(savedMessages)
        : [];

      setMessages(
        parsedMessages.map((message) =>
          message.role === "user" && message.status === "pending"
            ? { ...message, status: "error" }
            : message
        )
      );
    } catch (error) {
      console.error("Failed to parse messages from sessionStorage", error);
    }
  }, []);

  // CHANGE: Effect to save messages to sessionStorage whenever they change.
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages to sessionStorage", error);
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
      status: "pending",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const aiData = await getAiResponse(text);
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: aiData.response,
        analysis: aiData.analysis,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev.map(
          (m): Message =>
            m.id === userMessage.id ? { ...m, status: "sent" } : m
        ),
        assistantMessage,
      ]);
    } catch (error: any) {
      toast.error(error.message || "The assistant failed to respond.");
      userMessage.status = "error";
      setMessages((prev) =>
        prev.map(
          (m): Message =>
            m.id === userMessage.id ? { ...m, status: "error" } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== messageId));
    toast.success("Message removed.");
  }, []);

  const resendMessage = useCallback(
    async (messageId: string) => {
      const messageToResend = messages.find((m) => m.id === messageId);
      if (!messageToResend) return;

      setMessages((prev) => prev.filter((m) => m.id !== messageId));
      await sendMessage(messageToResend.content);
    },
    [messages, sendMessage]
  );

  return { messages, isLoading, sendMessage, removeMessage, resendMessage };
};
