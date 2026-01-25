'use client';

import React, { useState } from 'react';
import { Settings, Bell, Moon, Volume2, Globe, Shield, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    sound: true,
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">Quick settings</p>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Notifications</Label>
                  <p className="text-sm text-muted-foreground">Order updates</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Appearance</p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => setSettings({...settings, darkMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sound */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label>Sound</Label>
                  <p className="text-sm text-muted-foreground">App sounds</p>
                </div>
              </div>
              <Switch
                checked={settings.sound}
                onCheckedChange={(checked) => setSettings({...settings, sound: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
            <Globe className="h-4 w-4" />
            <span className="text-xs">Language</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Privacy</span>
          </Button>
        </div>

        {/* Save Button */}
        <Button className="w-full gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}