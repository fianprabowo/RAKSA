import type { SupabaseClient } from "@supabase/supabase-js";
import { ScanNotificationRepository } from "@/core/domain/repositories/scan-notification-repository";
import { ScanNotification } from "@/core/domain/entities/scan-notification";
import {
  scanNotificationToDomain,
  scanNotificationToRow,
} from "../mappers/scan-notification.mapper";

export class SupabaseScanNotificationRepository implements ScanNotificationRepository {
  constructor(private readonly client: SupabaseClient) {}

  async findByAccountHolderId(accountHolderId: string): Promise<ScanNotification[]> {
    const { data, error } = await this.client
      .from("scan_notifications")
      .select("*")
      .eq("account_holder_id", accountHolderId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(scanNotificationToDomain);
  }

  async save(notification: ScanNotification): Promise<void> {
    const { error } = await this.client
      .from("scan_notifications")
      .upsert(scanNotificationToRow(notification));

    if (error) throw error;
  }

  async markAsRead(id: string): Promise<void> {
    const { error } = await this.client
      .from("scan_notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
  }
}
