import { ScanNotification } from "../entities/scan-notification";

/** Port — in-app scan alerts for account holders. */
export interface ScanNotificationRepository {
  findByAccountHolderId(accountHolderId: string): Promise<ScanNotification[]>;
  save(notification: ScanNotification): Promise<void>;
  markAsRead(id: string): Promise<void>;
}
