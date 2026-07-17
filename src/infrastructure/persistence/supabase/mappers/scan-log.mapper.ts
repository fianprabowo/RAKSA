import { ScanLog } from "@/core/domain/entities/scan-log";
import { AccessMethod } from "@/core/domain/enums";

export interface ScanLogRow {
  id: string;
  wristband_id: string;
  access_method: string;
  location_shared: boolean;
  shared_latitude: number | null;
  shared_longitude: number | null;
  location_accuracy_m: number | null;
  location_shared_at: string | null;
  scanned_at: string;
  user_agent: string | null;
  ip_hash: string | null;
  approximate_location: string | null;
  created_at: string;
}

export function scanLogToDomain(row: ScanLogRow): ScanLog {
  return ScanLog.reconstitute({
    id: row.id,
    wristbandId: row.wristband_id,
    accessMethod: row.access_method as AccessMethod,
    locationShared: row.location_shared,
    sharedLatitude: row.shared_latitude ?? undefined,
    sharedLongitude: row.shared_longitude ?? undefined,
    locationAccuracyM: row.location_accuracy_m ?? undefined,
    locationSharedAt: row.location_shared_at ? new Date(row.location_shared_at) : undefined,
    scannedAt: new Date(row.scanned_at),
    userAgent: row.user_agent ?? undefined,
    ipHash: row.ip_hash ?? undefined,
    approximateLocation: row.approximate_location ?? undefined,
    createdAt: new Date(row.created_at),
  });
}
