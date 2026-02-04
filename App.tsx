
import React, { useState, useEffect } from 'react';
import { DiaryView, DiaryEntry, MoodType, User } from './types';
import { AuthPage } from './components/AuthPage';
import { OpeningPage } from './components/OpeningPage';
import { ClosingPage } from './components/ClosingPage';
import { HomeSpace } from './components/HomeSpace';
import { UnstructuredDiaryPage } from './components/UnstructuredDiaryPage';
import { PermissionPage } from './components/PermissionPage';
import { ReflectionPage } from './components/ReflectionPage';
import { WeeklyResetPage } from './components/WeeklyResetPage';
import { JournalPage } from './components/JournalPage';
import { PERMISSION_LINES, REFLECTION_PROMPTS, WEEKLY_RESETS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<DiaryView>('auth');
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [dayNumber, setDayNumber] = useState(1);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('steady_heart_diary_v5');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed);
      setDayNumber(parsed.length + 1);
    }
    
    const savedUser = localStorage.getItem('diary_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('opening');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('steady_heart_diary_v5', JSON.stringify(entries));
  }, [entries]);

  const handleLogin = () => {
    const mockUser: User = { name: "Loved One", email: "user@example.com" };
    setUser(mockUser);
    localStorage.setItem('diary_user', JSON.stringify(mockUser));
    setCurrentView('opening');
  };

  const recordEntry = (entry: Partial<DiaryEntry>) => {
    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type: entry.type || 'daily',
      ...entry
    };
    setEntries(prev => [...prev, newEntry]);
    setDayNumber(prev => prev + 1);
  };

  const navigateTo = (view: DiaryView) => setCurrentView(view);
  const handleReturnToHome = () => setCurrentView('home');

  if (!user && currentView === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  switch (currentView) {
    case 'opening':
      return <OpeningPage onEnter={() => navigateTo('home')} />;
    
    case 'closing':
      return <ClosingPage onReturn={() => navigateTo('home')} />;

    case 'home':
      return <HomeSpace onNavigate={navigateTo} dayCount={dayNumber} />;

    case 'journal':
      return <JournalPage entries={entries} onBack={handleReturnToHome} />;

    case 'write':
      return (
        <UnstructuredDiaryPage 
          day={dayNumber}
          onSave={async (data) => {
            recordEntry({
              type: 'daily',
              content: data.content,
              mood: data.mood,
              gratitude: data.gratitude
            });
          }}
          onNext={handleReturnToHome}
          onBack={handleReturnToHome}
          onClose={() => navigateTo('closing')}
        />
      );

    case 'permission':
      return (
        <PermissionPage 
          line={PERMISSION_LINES[Math.floor(Math.random() * PERMISSION_LINES.length)]} 
          onContinue={handleReturnToHome} 
        />
      );

    case 'reflect':
      return (
        <ReflectionPage 
          prompt={REFLECTION_PROMPTS[Math.floor(Math.random() * REFLECTION_PROMPTS.length)].text}
          onBack={handleReturnToHome}
          onComplete={(res) => {
            recordEntry({ type: 'reflection', reflectionResponse: res });
            handleReturnToHome();
          }}
        />
      );

    case 'reset':
      return (
        <WeeklyResetPage 
          data={WEEKLY_RESETS[0]} 
          onBack={handleReturnToHome}
          onComplete={(responses, carryingForward) => {
            recordEntry({ type: 'weekly', weeklyResponses: responses, carryingForward });
            handleReturnToHome();
          }}
        />
      );

    default:
      return <HomeSpace onNavigate={navigateTo} dayCount={dayNumber} />;
  }
};

export default App;
