// app/components/kit/tabs/chat/types/chat.ts

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  usedFallback?: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
}
