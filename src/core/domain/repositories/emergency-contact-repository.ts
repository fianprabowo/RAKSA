import { EmergencyContact } from "../entities/emergency-contact";

/** Port — emergency contacts for a wristband. */
export interface EmergencyContactRepository {
  findByWristbandId(wristbandId: string): Promise<EmergencyContact[]>;
  save(contact: EmergencyContact): Promise<void>;
  delete(id: string): Promise<void>;
}
