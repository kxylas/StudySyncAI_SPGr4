import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { ChatState, ChatContextType, Message } from '@/types/chat';

const initialChatState: ChatState = {
  currentChat: [],
  history: [],
  loading: false,
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatState, setChatState] = useState<ChatState>(initialChatState);
  const { toast } = useToast();

  useEffect(() => {
    // Load chat history from the server when the component mounts
    const fetchChatHistory = async () => {
      try {
        const response = await apiRequest('GET', '/api/chat/history', undefined);
        const data = await response.json();
        setChatState(prev => ({ ...prev, history: data }));
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    // Update state with user message
    setChatState(prev => ({
      ...prev,
      currentChat: [...prev.currentChat, userMessage],
      loading: true,
    }));

    try {
      // Send message to the server
      const response = await apiRequest('POST', '/api/chat/message', { 
        message: content,
        history: chatState.currentChat.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });
      
      const data = await response.json();
      
      // Add AI response to chat
      setChatState(prev => ({
        ...prev,
        currentChat: [
          ...prev.currentChat,
          {
            id: nanoid(),
            content: data.message,
            role: 'assistant',
            timestamp: new Date(),
          }
        ],
        loading: false,
      }));
    } catch (error) {
      setChatState(prev => ({ ...prev, loading: false }));
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      console.error('Error sending message:', error);
    }
  };

  const clearChat = () => {
    setChatState(prev => ({
      ...prev,
      currentChat: [],
    }));
  };

  const loadChatHistory = (id: string) => {
    const chatToLoad = chatState.history.find(chat => chat.id === id);
    if (chatToLoad) {
      setChatState(prev => ({
        ...prev,
        currentChat: chatToLoad.messages,
      }));
    }
  };

  return (
    <ChatContext.Provider value={{ chatState, sendMessage, clearChat, loadChatHistory }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
