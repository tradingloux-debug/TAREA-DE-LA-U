import { LoginInput, ProfileInput, RegisterInput, RegisteredUser, UserProfile } from '../types/account';
import { Booking } from '../types/booking';

const USERS_STORAGE_KEY = 'gia_registered_users_v2';
const ACTIVE_SESSION_KEY = 'gia_active_session_v2';
const OLD_LEGACY_KEY = 'gia_user_profile_v1';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

// Clean up any old simulated account that was set by default in older versions
try {
  if (localStorage.getItem(OLD_LEGACY_KEY)) {
    localStorage.removeItem(OLD_LEGACY_KEY);
  }
} catch {
  // ignore in non-browser env
}

export const PRESET_AVATARS = [
  {
    id: 'volcano',
    name: 'Volcán Ilamatepec',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'surf',
    name: 'Surf City El Sunzal',
    url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'coffee',
    name: 'Ruta de las Flores',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'traveler-m',
    name: 'Explorador',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'traveler-f',
    name: 'Aventurera',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'maya',
    name: 'Tazumal Maya',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  },
];

export const accountService = {
  // Get all registered users from local storage
  getAllUsers(): RegisteredUser[] {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveAllUsers(users: RegisteredUser[]): void {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users database', e);
    }
  },

  // Get current active logged-in profile
  getProfile(): UserProfile | null {
    try {
      const activeId = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (!activeId) return null;
      const users = this.getAllUsers();
      const user = users.find(u => u.id === activeId);
      if (!user) {
        localStorage.removeItem(ACTIVE_SESSION_KEY);
        return null;
      }
      // Return profile without sensitive password
      const { password, ...profile } = user;
      return profile;
    } catch {
      return null;
    }
  },

  // Register a brand new account
  register(input: RegisterInput): { success: boolean; profile?: UserProfile; error?: string } {
    const cleanEmail = normalizeEmail(input.email);
    if (!cleanEmail || !input.password.trim()) {
      return { success: false, error: 'Correo y contraseña son requeridos.' };
    }

    const users = this.getAllUsers();
    const existing = users.find(u => normalizeEmail(u.email) === cleanEmail);
    if (existing) {
      return {
        success: false,
        error: 'Ya existe una cuenta registrada con este correo. Inicia sesión en su lugar.',
      };
    }

    const now = new Date().toISOString();
    const newUser: RegisteredUser = {
      id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: cleanEmail,
      phone: input.phone.trim(),
      country: input.country.trim(),
      password: input.password.trim(),
      avatarUrl: input.avatarUrl?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    const nextUsers = [...users, newUser];
    this.saveAllUsers(nextUsers);
    localStorage.setItem(ACTIVE_SESSION_KEY, newUser.id);

    const { password, ...profile } = newUser;
    return { success: true, profile };
  },

  // Log in with existing credentials
  login(input: LoginInput): { success: boolean; profile?: UserProfile; error?: string } {
    const cleanEmail = normalizeEmail(input.email);
    const cleanPass = input.password.trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Ingresa correo y contraseña.' };
    }

    const users = this.getAllUsers();
    const user = users.find(u => normalizeEmail(u.email) === cleanEmail);

    if (!user) {
      return {
        success: false,
        error: 'No encontramos ninguna cuenta con ese correo electrónico. Puedes crear una nueva cuenta.',
      };
    }

    if (user.password !== cleanPass) {
      return {
        success: false,
        error: 'Contraseña incorrecta. Por favor verifica tus credenciales.',
      };
    }

    localStorage.setItem(ACTIVE_SESSION_KEY, user.id);
    const { password, ...profile } = user;
    return { success: true, profile };
  },

  // Log out active session
  logout(): void {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch {
      // ignore
    }
  },

  // Permanently delete user account and session
  deleteAccount(userId: string): { success: boolean } {
    try {
      const users = this.getAllUsers();
      const nextUsers = users.filter(u => u.id !== userId);
      this.saveAllUsers(nextUsers);
      const activeId = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (activeId === userId) {
        localStorage.removeItem(ACTIVE_SESSION_KEY);
      }
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  // Save/update existing profile
  saveProfile(input: ProfileInput): UserProfile {
    const active = this.getProfile();
    const users = this.getAllUsers();
    const now = new Date().toISOString();
    const cleanEmail = normalizeEmail(input.email);

    if (active) {
      const updatedUsers = users.map(u => {
        if (u.id === active.id) {
          return {
            ...u,
            ...input,
            email: cleanEmail,
            avatarUrl: input.avatarUrl || u.avatarUrl,
            updatedAt: now,
          };
        }
        return u;
      });
      this.saveAllUsers(updatedUsers);
      return {
        ...active,
        ...input,
        email: cleanEmail,
        avatarUrl: input.avatarUrl || active.avatarUrl,
        updatedAt: now,
      };
    } else {
      // Create guest profile if registering via legacy form
      const regRes = this.register({
        ...input,
        password: 'gia_user_default_pass',
      });
      if (regRes.profile) return regRes.profile;
      throw new Error(regRes.error || 'No se pudo guardar el perfil');
    }
  },

  // Update avatar specifically
  updateAvatar(avatarUrl: string): UserProfile | null {
    const active = this.getProfile();
    if (!active) return null;
    const users = this.getAllUsers();
    const now = new Date().toISOString();
    const updatedUsers = users.map(u => {
      if (u.id === active.id) {
        return {
          ...u,
          avatarUrl: avatarUrl.trim() || undefined,
          updatedAt: now,
        };
      }
      return u;
    });
    this.saveAllUsers(updatedUsers);
    return {
      ...active,
      avatarUrl: avatarUrl.trim() || undefined,
      updatedAt: now,
    };
  },

  removeProfile(): void {
    this.logout();
  },

  bookingBelongsToProfile(booking: Booking, profile: UserProfile | null): boolean {
    return Boolean(profile && normalizeEmail(booking.email) === normalizeEmail(profile.email));
  },
};
