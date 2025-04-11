import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChat } from '@/contexts/ChatContext';
import { format } from 'date-fns';
import { Send, Paperclip, Volume2, VolumeX, FileText } from 'lucide-react';
import ChatInterfaceStudyButton from './ChatInterfaceStudyButton';
import FileUploadDialog from './FileUploadDialog';

export default function ChatInterface() {
  const { chatState, sendMessage, speakMessage, stopSpeaking, isSpeaking } = useChat();
  const [messageText, setMessageText] = useState('');
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [chatFiles, setChatFiles] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.currentChat]);
  
  // Reset currentSpeakingId when speech stops
  useEffect(() => {
    if (!isSpeaking) {
      setCurrentSpeakingId(null);
    }
  }, [isSpeaking]);
  
  // Fetch chat files when component mounts
  useEffect(() => {
    const fetchChatFiles = async () => {
      try {
        // For now using a default chatId of 1
        const response = await fetch(`/api/uploads/chat/1`);
        if (response.ok) {
          const files = await response.json();
          setChatFiles(files);
        }
      } catch (error) {
        console.error('Error fetching chat files:', error);
      }
    };
    
    fetchChatFiles();
  }, []);

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
    "Graduation requirements",
    "Help me create a study schedule"
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#222222]" ref={chatMessagesRef} id="chat-messages">
        {/* Welcome message if no messages */}
        {chatState.currentChat.length === 0 && (
          <div className="mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="material-icons text-white text-xs sm:text-sm">smart_toy</span>
                </div>
              </div>
              <div className="ml-2 sm:ml-3 max-w-[75%] sm:max-w-2xl">
                <div className="bg-[#003366] p-2 sm:p-3 rounded-lg rounded-tl-none shadow-sm relative">
                  <p className="text-xs sm:text-sm text-[#F5A623] font-medium pr-6">
                    Hello! I'm msuStudySyncAI, your Morgan State University Computer Science program assistant. I can help with program information, course details, requirements, and create personalized study schedules based on your deadlines. What would you like to know about today?
                  </p>
                  
                  {/* Speak button for welcome message */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const welcomeMessage = "Hello! I'm msuStudySyncAI, your Morgan State University Computer Science program assistant. I can help with program information, course details, requirements, and create personalized study schedules based on your deadlines. What would you like to know about today?";
                      
                      if (isSpeaking && currentSpeakingId === "welcome") {
                        stopSpeaking();
                        setCurrentSpeakingId(null);
                      } else {
                        if (isSpeaking) stopSpeaking();
                        setCurrentSpeakingId("welcome");
                        speakMessage(welcomeMessage);
                      }
                    }}
                    className="absolute right-1 top-1 p-1 text-[#F5A623] hover:text-[#F5A623]/80 rounded-full hover:bg-[#002244]"
                  >
                    {isSpeaking && currentSpeakingId === "welcome" ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-[10px] sm:text-xs text-neutral-400 inline-block">{formatTime(new Date())}</span>
                  {isSpeaking && currentSpeakingId === "welcome" && (
                    <span className="text-[10px] text-[#F5A623] ml-2 inline-flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-pulse mr-1"></span>
                      Speaking...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {chatState.currentChat.map((message) => (
          <div key={message.id} className="mb-4">
            {message.role === 'user' ? (
              <div className="flex items-start justify-end">
                <div className="mr-2 sm:mr-3 max-w-[75%] sm:max-w-2xl">
                  <div className="bg-[#F5A623] p-2 sm:p-3 rounded-lg rounded-tr-none shadow-sm">
                    <p className="text-xs sm:text-sm text-[#003366] font-medium">{message.content}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-neutral-400 mt-1 inline-block">{formatTime(message.timestamp)}</span>
                </div>
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-icons text-white text-xs sm:text-sm">person</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-secondary flex items-center justify-center">
                    <span className="material-icons text-white text-xs sm:text-sm">smart_toy</span>
                  </div>
                </div>
                <div className="ml-2 sm:ml-3 max-w-[75%] sm:max-w-2xl">
                  <div className="bg-[#003366] p-2 sm:p-3 rounded-lg rounded-tl-none shadow-sm relative">
                    <p className="text-xs sm:text-sm text-[#F5A623] font-medium whitespace-pre-line pr-6">{message.content}</p>
                    
                    {/* Speak button */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (isSpeaking && currentSpeakingId === message.id) {
                          stopSpeaking();
                          setCurrentSpeakingId(null);
                        } else {
                          if (isSpeaking) stopSpeaking();
                          setCurrentSpeakingId(message.id);
                          speakMessage(message.content);
                        }
                      }}
                      className="absolute right-1 top-1 p-1 text-[#F5A623] hover:text-[#F5A623]/80 rounded-full hover:bg-[#002244]"
                    >
                      {isSpeaking && currentSpeakingId === message.id ? (
                        <VolumeX className="h-3.5 w-3.5" />
                      ) : (
                        <Volume2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-[10px] sm:text-xs text-neutral-400 inline-block">{formatTime(message.timestamp)}</span>
                    {isSpeaking && currentSpeakingId === message.id && (
                      <span className="text-[10px] text-[#F5A623] ml-2 inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-pulse mr-1"></span>
                        Speaking...
                      </span>
                    )}
                  </div>
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
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="material-icons text-white text-xs sm:text-sm">smart_toy</span>
                </div>
              </div>
              <div className="ml-2 sm:ml-3">
                <div className="bg-[#003366] p-2 sm:p-3 rounded-lg rounded-tl-none shadow-sm inline-flex">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F5A623] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F5A623] rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#F5A623] rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display chat files */}
        {chatFiles.length > 0 && (
          <div className="mb-4 border border-neutral-700 rounded-lg p-3 bg-neutral-800/50">
            <h3 className="text-sm text-[#F5A623] font-medium mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-1.5" />
              Uploaded Files
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {chatFiles.map((file) => (
                <a 
                  key={file.id}
                  href={`/api/uploads/${file.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded hover:bg-neutral-700/30 transition-colors group"
                >
                  {file.mimetype.startsWith('image/') ? (
                    <div className="w-10 h-10 bg-neutral-700 rounded flex items-center justify-center mr-2 overflow-hidden">
                      <img 
                        src={`/api/uploads/${file.id}`} 
                        alt={file.originalFilename}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-[#003366] rounded flex items-center justify-center mr-2">
                      <FileText className="h-5 w-5 text-[#F5A623]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-neutral-200 font-medium truncate">{file.originalFilename}</div>
                    <div className="text-[10px] text-neutral-400">
                      {(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions */}
      <div className="bg-neutral-900 border-t border-neutral-700 p-2 sm:p-3">
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 max-w-full overflow-x-auto pb-1 no-scrollbar">
          <ChatInterfaceStudyButton />
          
          {quickSuggestions.map((suggestion, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs whitespace-nowrap rounded-full bg-[#003366] text-[#F5A623] hover:bg-[#002855] hover:text-[#F5A623] flex-shrink-0"
              onClick={() => {
                setMessageText(suggestion);
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="flex items-center space-x-1 sm:space-x-2">
          <div className="flex-1 relative">
            <Textarea 
              id="message-input" 
              value={messageText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageText(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="w-full py-2 pl-3 sm:pl-4 pr-10 min-h-[40px] sm:min-h-[44px] max-h-[120px] rounded-full border border-neutral-600 bg-neutral-800 text-neutral-200 text-sm focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:outline-none resize-none overflow-y-auto" 
              placeholder="Type a message..." 
              disabled={chatState.loading}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsFileUploadOpen(true)}
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
      
      {/* File Upload Dialog */}
      <FileUploadDialog 
        isOpen={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        chatId={1} // For now using a default chatId of 1
        onUploadSuccess={(file) => {
          // Add file to chat files
          setChatFiles(prev => [...prev, file]);
          
          // Send a message about the uploaded file
          const fileType = file.mimetype.startsWith('image/') ? 'image' : 'document';
          sendMessage(`I've uploaded a ${fileType}: ${file.originalFilename}`);
        }}
      />
    </div>
  );
}
