'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { currentUser, type User } from '@/lib/data/users';
import { type EventCategory } from '@/lib/data/events';

interface UserContextType {
  user: User;
  toggleCategory: (cat: EventCategory) => void;
  isOnboarded: boolean;
  setOnboarded: (val: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(currentUser);
  const [isOnboarded, setOnboarded] = useState(false);

  const toggleCategory = useCallback((cat: EventCategory) => {
    setUser((prev) => {
      const cats = prev.preferences.favoriteCategories;
      const next = cats.includes(cat)
        ? cats.filter((c) => c !== cat)
        : [...cats, cat];
      return {
        ...prev,
        preferences: { ...prev.preferences, favoriteCategories: next },
      };
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ user, toggleCategory, isOnboarded, setOnboarded }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
