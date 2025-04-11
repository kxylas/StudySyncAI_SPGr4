export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface ChatState {
  currentChat: Message[];
  history: ChatHistory[];
  loading: boolean;
}

export interface ChatContextType {
  chatState: ChatState;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  loadChatHistory: (id: string) => void;
  speakMessage: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}
