// Represents a logged-in user
export interface AppUser {
  id: string; // The unique ID from Supabase Auth
  email?: string; // The user's email address
  created_at: string; // ISO 8601 timestamp
}
