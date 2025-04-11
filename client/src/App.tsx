import { useState, useEffect, Component, ErrorInfo, ReactNode } from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { ChatProvider } from "./contexts/ChatContext";
import LoadingScreen from "@/components/LoadingScreen";

import Home from "@/pages/Home";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import ProgramOverview from "@/pages/ProgramOverview";
import Curriculum from "@/pages/Curriculum";
import Requirements from "@/pages/Requirements";
import Internships from "@/pages/Internships";
import StudyGroups from "@/pages/StudyGroups";
import CreateStudyGroup from "@/pages/CreateStudyGroup";
import Advisors from "@/pages/Advisors";
import CareerResources from "@/pages/CareerResources";
import Profile from "@/pages/Profile";
import StudySchedule from "@/pages/StudySchedule";
import UserFlow from "@/pages/UserFlow";

// Error boundary to catch and handle React errors
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#222222] text-gray-200">
          <div className="max-w-md p-6 rounded-lg bg-[#333333] shadow-lg">
            <h2 className="text-xl font-semibold text-[#F5A623] mb-4">Something went wrong</h2>
            <p className="mb-4">
              The application encountered an error. You can try refreshing the page or contact support.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-[#003366] text-white rounded hover:bg-[#004488] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
      <Route path="/profile" component={Profile} />
      <Route path="/program-overview" component={ProgramOverview} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/requirements" component={Requirements} />
      <Route path="/internships" component={Internships} />
      <Route path="/study-groups" component={StudyGroups} />
      <Route path="/create-study-group" component={CreateStudyGroup} />
      <Route path="/advisors" component={Advisors} />
      <Route path="/career-resources" component={CareerResources} />
      <Route path="/study-schedule" component={StudySchedule} />
      <Route path="/user-flow" component={UserFlow} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              <Router />
              <Toaster />
            </>
          )}
        </ChatProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
