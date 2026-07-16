import { Wristband } from "../entities/wristband";
import { EmergencyId } from "../value-objects/emergency-id";
import { PublicToken } from "../value-objects/public-token";
import { WristbandStatus } from "../enums";

export interface WristbandListFilter {
  status?: WristbandStatus;
  /** Case-insensitive match against the visible Emergency ID or wearer label. */
  search?: string;
  limit: number;
  offset: number;
}

export interface WristbandListResult {
  items: Wristband[];
  total: number;
}

/** Port — wristband aggregate persistence. */
export interface WristbandRepository {
  findById(id: string): Promise<Wristband | null>;
  findByOwnerId(ownerId: string): Promise<Wristband[]>;
  findByPublicToken(token: PublicToken): Promise<Wristband | null>;
  findByEmergencyId(emergencyId: EmergencyId): Promise<Wristband | null>;
  save(wristband: Wristband): Promise<void>;
  /** Admin — paginated, filterable listing across all owners. */
  findAll(filter: WristbandListFilter): Promise<WristbandListResult>;
  /** Admin — counts grouped by status for dashboard stats. */
  countByStatus(): Promise<Record<string, number>>;
  /** Admin — count of wristbands activated on/after the given instant. */
  countActivatedSince(since: Date): Promise<number>;
  /** Admin — hard delete (only used for unclaimed tags). */
  delete(id: string): Promise<void>;
}
