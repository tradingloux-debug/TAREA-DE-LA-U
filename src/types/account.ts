export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisteredUser extends UserProfile {
  password: string; // Plain password stored locally in browser storage for session simulation
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  avatarUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// Fields accepted for editing an existing profile
export type ProfileInput = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>;
