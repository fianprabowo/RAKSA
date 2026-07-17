import { ScanNotification } from "@/core/domain/entities/scan-notification";

export interface ScanNotificationRow {
  id: string;
  account_holder_id: string;
  wristband_id: string;
  scan_log_id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function scanNotificationToDomain(row: ScanNotificationRow): ScanNotification {
  return ScanNotification.reconstitute({
    id: row.id,
    accountHolderId: row.account_holder_id,
    wristbandId: row.wristband_id,
    scanLogId: row.scan_log_id,
    message: row.message,
    isRead: row.is_read,
    createdAt: new Date(row.created_at),
  });
}

export function scanNotificationToRow(notification: ScanNotification): ScanNotificationRow {
  return {
    id: notification.id,
    account_holder_id: notification.accountHolderId,
    wristband_id: notification.wristbandId,
    scan_log_id: notification.scanLogId,
    message: notification.message,
    is_read: notification.isRead,
    created_at: notification.createdAt.toISOString(),
  };
}
