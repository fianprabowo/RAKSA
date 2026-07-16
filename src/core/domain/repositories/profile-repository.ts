import { Profile } from "../entities/profile";

/** Port — account holder profile persistence (Dependency Inversion). */
export interface ProfileRepository {
  findById(id: string): Promise<Profile | null>;
  save(profile: Profile): Promise<void>;
}
