export interface AuthenticatedUser {
  id: string;
  email: string;
}

/** Port — authentication boundary (Supabase Auth adapter implements this). */
export interface AuthService {
  getCurrentUser(): Promise<AuthenticatedUser | null>;
  signOut(): Promise<void>;
}
