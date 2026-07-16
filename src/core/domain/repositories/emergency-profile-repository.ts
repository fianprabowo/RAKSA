import { EmergencyProfile } from "../entities/emergency-profile";

/** Port — emergency profile persistence (one per wristband). */
export interface EmergencyProfileRepository {
  findByWristbandId(wristbandId: string): Promise<EmergencyProfile | null>;
  save(profile: EmergencyProfile): Promise<void>;
}
