"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ChatBox from "@/components/chat/ChatBox";
import InputBox from "@/components/chat/InputBox";

import { useChat } from "@/hooks/useChat";

export default function Home() {
  const { messages, isLoading, sendMessage, removeMessage, resendMessage } =
    useChat();

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };
  return (
    <main className="flex flex-col h-screen bg-muted/50">
      {/*Navbar */}
      <Navbar />

      {/*ChatBox */}
      <div className="flex-1 overflow-hidden">
        <ChatBox
          messages={messages}
          isLoading={isLoading}
          onRemoveMessage={removeMessage}
          onResendMessage={resendMessage}
        />
      </div>

      {/*InputBox*/}
      <div className="p-4 border-t bg-background">
        <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
      <Footer />
    </main>
  );
}
