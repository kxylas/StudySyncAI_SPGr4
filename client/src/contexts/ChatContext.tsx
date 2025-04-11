import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from 'react';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();
  
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

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
  
  // Natural speech synthesis
  const speakMessage = useCallback((text: string) => {
    if (!speechSynthesisRef.current) return;
    
    // Stop any current speech
    stopSpeaking();
    
    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options for more natural-sounding speech
    // Find the most natural voice available (prefer female voices for assistant)
    const voices = speechSynthesisRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Samantha') || // macOS / iOS natural female voice
      voice.name.includes('Google US English Female') || // Google's female voice
      voice.name.includes('Microsoft Zira') // Microsoft's female voice
    );
    
    // Fall back to any female voice if preferred voices aren't available
    const femaleVoice = preferredVoice || voices.find(voice => voice.name.toLowerCase().includes('female'));
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    // Natural-sounding settings
    utterance.rate = 0.95; // Slightly slower than default
    utterance.pitch = 1.05; // Slightly higher pitch
    utterance.volume = 1.0; // Full volume
    
    // Add pauses for more natural rhythm
    // Replace periods followed by a space with a period and a slightly longer pause
    const textWithPauses = text
      .replace(/\.\s/g, '. <break time="400ms"/>')
      .replace(/\?\s/g, '? <break time="400ms"/>')
      .replace(/\!\s/g, '! <break time="400ms"/>')
      .replace(/,\s/g, ', <break time="200ms"/>');
    
    utterance.text = textWithPauses;
    
    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech Error",
        description: "Unable to speak the text. Please try again.",
        variant: "destructive",
      });
    };
    
    // Start speaking
    speechSynthesisRef.current.speak(utterance);
  }, [toast]);
  
  const stopSpeaking = useCallback(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ 
      chatState, 
      sendMessage, 
      clearChat, 
      loadChatHistory,
      speakMessage,
      stopSpeaking,
      isSpeaking
    }}>
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
