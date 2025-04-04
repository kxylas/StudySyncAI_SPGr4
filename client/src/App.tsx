import { useState, useEffect } from "react";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/history" component={History} />
      <Route path="/settings" component={Settings} />
      <Route path="/program-overview" component={ProgramOverview} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/requirements" component={Requirements} />
      <Route path="/internships" component={Internships} />
      <Route path="/study-groups" component={StudyGroups} />
      <Route path="/create-study-group" component={CreateStudyGroup} />
      <Route path="/advisors" component={Advisors} />
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
  );
}

export default App;
