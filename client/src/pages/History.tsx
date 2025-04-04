import AppContainer from '@/components/AppContainer';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function History() {
  const { chatState, loadChatHistory } = useChat();

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-neutral-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-6">Chat History</h1>
          
          {chatState.history.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-neutral-500">No chat history found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chatState.history.map((chat) => (
                <Card key={chat.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">{chat.title}</CardTitle>
                    <p className="text-xs text-neutral-500">
                      {format(new Date(chat.createdAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                      {chat.messages[0]?.content || 'No messages'}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => loadChatHistory(chat.id)}
                      className="w-full"
                    >
                      Continue Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </AppContainer>
  );
}
