import { ScanLog } from "../entities/scan-log";

export interface CreateScanLogInput {
  wristbandId: string;
  accessMethod: ScanLog["accessMethod"];
  userAgent?: string;
  ipHash?: string;
}

/** Port — public access audit trail. */
export interface ScanLogRepository {
  findByWristbandId(wristbandId: string, limit?: number): Promise<ScanLog[]>;
  /** Recent scans across several wristbands (e.g. a family's tags). */
  findByWristbandIds(wristbandIds: string[], limit?: number): Promise<ScanLog[]>;
  create(input: CreateScanLogInput): Promise<ScanLog>;
  attachLocation(
    scanLogId: string,
    location: {
      latitude: number;
      longitude: number;
      accuracyM?: number;
      approximateLocation?: string;
    },
  ): Promise<ScanLog>;
}
