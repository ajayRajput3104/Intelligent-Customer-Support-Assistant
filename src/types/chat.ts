// src/types/chat.ts

// Defines the role of the message sender
export type MessageRole = "user" | "assistant";

// Represents the AI's analysis of the user's message
export interface MessageAnalysis {
  category: "Technical" | "Billing" | "General" | "Unknown";
  sentiment: "Positive" | "Neutral" | "Negative" | "Unknown";
}
export type MessageStatus = "pending" | "sent" | "error";

// Represents a single message in a conversation
export interface Message {
  id: string; // Unique identifier (e.g., UUID from Supabase)
  //conversation_id: string; // Belongs to which conversation
  role: MessageRole; // Who sent the message
  content: string; // The text of the message
  analysis?: MessageAnalysis; // Optional analysis for assistant messages
  created_at: string; // ISO 8601 timestamp
  status?: MessageStatus;
}

// Represents a single chat conversation in the sidebar
export interface Conversation {
  id: string; // Unique identifier for the conversation
  user_id: string; // The user who owns this conversation
  title: string; // A short title, e.g., the first user message
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // When the last message was added
}
