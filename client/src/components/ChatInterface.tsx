import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@/contexts/ChatContext';
import { format } from 'date-fns';
import { Send, Paperclip } from 'lucide-react';

export default function ChatInterface() {
  const { chatState, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.currentChat]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || chatState.loading) return;
    
    await sendMessage(messageText);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  const quickSuggestions = [
    "Program objectives",
    "Group A electives",
    "Internship opportunities",
    "Graduation requirements"
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 bg-[#222222]" ref={chatMessagesRef} id="chat-messages">
        {/* Welcome message if no messages */}
        {chatState.currentChat.length === 0 && (
          <div className="mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="material-icons text-white text-sm">smart_toy</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="bg-[#003366] p-3 rounded-lg rounded-tl-none shadow-sm max-w-2xl">
                  <p className="text-sm text-[#F5A623] font-medium">
                    Hello! I'm StudySyncAI, your Morgan State University Computer Science program assistant. I can help with program information, course details, requirements, and more. What would you like to know about today?
                  </p>
                </div>
                <span className="text-xs text-neutral-400 mt-1 inline-block">{formatTime(new Date())}</span>
              </div>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {chatState.currentChat.map((message) => (
          <div key={message.id} className="mb-4">
            {message.role === 'user' ? (
              <div className="flex items-start justify-end">
                <div className="mr-3">
                  <div className="bg-[#F5A623] p-3 rounded-lg rounded-tr-none shadow-sm max-w-2xl">
                    <p className="text-sm text-[#003366] font-medium">{message.content}</p>
                  </div>
                  <span className="text-xs text-neutral-400 mt-1 inline-block">{formatTime(message.timestamp)}</span>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-icons text-white text-sm">person</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-icons text-white text-sm">smart_toy</span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="bg-[#003366] p-3 rounded-lg rounded-tl-none shadow-sm max-w-2xl">
                    <p className="text-sm text-[#F5A623] font-medium whitespace-pre-line">{message.content}</p>
                  </div>
                  <span className="text-xs text-neutral-400 mt-1 inline-block">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {chatState.loading && (
          <div className="mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="material-icons text-white text-sm">smart_toy</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="bg-[#003366] p-3 rounded-lg rounded-tl-none shadow-sm inline-flex">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-[#F5A623] rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions */}
      <div className="bg-neutral-900 border-t border-neutral-700 p-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="px-3 py-1 text-xs rounded-full bg-[#003366] text-[#F5A623] hover:bg-[#002855] hover:text-[#F5A623]"
              onClick={() => {
                setMessageText(suggestion);
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input 
              id="message-input" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full py-2 pl-4 pr-10 rounded-full border border-neutral-600 bg-neutral-800 text-neutral-200 focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:outline-none" 
              placeholder="Type a message..." 
              disabled={chatState.loading}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-[#F5A623]"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            className="rounded-full p-2 bg-[#F5A623] text-[#003366] flex items-center justify-center hover:bg-[#E39311] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623]"
            disabled={!messageText.trim() || chatState.loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
