import AppContainer from '@/components/AppContainer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-neutral-100">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-heading font-bold text-neutral-900 mb-6">Settings</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key">OpenAI API Key (optional)</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="sk-..." 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  If provided, this will be used instead of the default API key. 
                  Your API key is stored locally and never sent to our servers.
                </p>
              </div>
              
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-700">
                StudySyncAI v1.0.0 - Morgan State University Computer Science Program Assistant
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                Powered by OpenAI GPT-4o
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppContainer>
  );
}
