import React, { createContext, useContext, useMemo, useState } from 'react';
import { accountService } from '../services/accountService';
import { LoginInput, ProfileInput, RegisterInput, UserProfile } from '../types/account';

// Browser-local profile provider supporting account creation, login, logout, deletion, and avatar management.

interface AccountContextValue {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  register: (input: RegisterInput) => { success: boolean; profile?: UserProfile; error?: string };
  login: (input: LoginInput) => { success: boolean; profile?: UserProfile; error?: string };
  logout: () => void;
  deleteAccount: () => { success: boolean };
  saveProfile: (input: ProfileInput) => UserProfile;
  removeProfile: () => void;
  updateAvatar: (avatarUrl: string) => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

export const AccountProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(() => accountService.getProfile());

  const value = useMemo<AccountContextValue>(() => ({
    profile,
    isAuthenticated: Boolean(profile),
    register: (input: RegisterInput) => {
      const res = accountService.register(input);
      if (res.success && res.profile) {
        setProfile(res.profile);
      }
      return res;
    },
    login: (input: LoginInput) => {
      const res = accountService.login(input);
      if (res.success && res.profile) {
        setProfile(res.profile);
      }
      return res;
    },
    logout: () => {
      accountService.logout();
      setProfile(null);
    },
    deleteAccount: () => {
      if (!profile) return { success: false };
      const res = accountService.deleteAccount(profile.id);
      if (res.success) {
        setProfile(null);
      }
      return res;
    },
    saveProfile: (input: ProfileInput) => {
      const next = accountService.saveProfile(input);
      setProfile(next);
      return next;
    },
    removeProfile: () => {
      accountService.logout();
      setProfile(null);
    },
    updateAvatar: (avatarUrl: string) => {
      const updated = accountService.updateAvatar(avatarUrl);
      if (updated) {
        setProfile(updated);
      }
    },
  }), [profile]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount must be used inside AccountProvider');
  return context;
};
