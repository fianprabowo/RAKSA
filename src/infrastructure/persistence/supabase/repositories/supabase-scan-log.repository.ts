import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ScanLogRepository,
  CreateScanLogInput,
} from "@/core/domain/repositories/scan-log-repository";
import { ScanLog } from "@/core/domain/entities/scan-log";
import { scanLogToDomain } from "../mappers/scan-log.mapper";

const DEFAULT_LIMIT = 20;

export class SupabaseScanLogRepository implements ScanLogRepository {
  constructor(private readonly client: SupabaseClient) {}

  async findByWristbandId(wristbandId: string, limit = DEFAULT_LIMIT): Promise<ScanLog[]> {
    const { data, error } = await this.client
      .from("scan_logs")
      .select("*")
      .eq("wristband_id", wristbandId)
      .order("scanned_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map(scanLogToDomain);
  }

  async findByWristbandIds(wristbandIds: string[], limit = DEFAULT_LIMIT): Promise<ScanLog[]> {
    if (wristbandIds.length === 0) return [];

    const { data, error } = await this.client
      .from("scan_logs")
      .select("*")
      .in("wristband_id", wristbandIds)
      .order("scanned_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map(scanLogToDomain);
  }

  async create(input: CreateScanLogInput): Promise<ScanLog> {
    const { data, error } = await this.client
      .from("scan_logs")
      .insert({
        wristband_id: input.wristbandId,
        access_method: input.accessMethod,
        user_agent: input.userAgent ?? null,
        ip_hash: input.ipHash ?? null,
      })
      .select("*")
      .single();

    if (error) throw error;
    return scanLogToDomain(data);
  }

  async attachLocation(
    scanLogId: string,
    location: {
      latitude: number;
      longitude: number;
      accuracyM?: number;
      approximateLocation?: string;
    },
  ): Promise<ScanLog> {
    const { data, error } = await this.client
      .from("scan_logs")
      .update({
        location_shared: true,
        shared_latitude: location.latitude,
        shared_longitude: location.longitude,
        location_accuracy_m: location.accuracyM ?? null,
        approximate_location: location.approximateLocation ?? null,
        location_shared_at: new Date().toISOString(),
      })
      .eq("id", scanLogId)
      .select("*")
      .single();

    if (error) throw error;
    return scanLogToDomain(data);
  }
}
