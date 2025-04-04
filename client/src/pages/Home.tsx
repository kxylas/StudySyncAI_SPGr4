import AppContainer from '@/components/AppContainer';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import InfoPanel from '@/components/InfoPanel';

export default function Home() {
  return (
    <AppContainer>
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ChatInterface />
        <InfoPanel />
      </main>
    </AppContainer>
  );
}
