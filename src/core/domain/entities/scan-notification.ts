export interface ScanNotificationProps {
  id: string;
  accountHolderId: string;
  wristbandId: string;
  scanLogId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export class ScanNotification {
  readonly id: string;
  readonly accountHolderId: string;
  readonly wristbandId: string;
  readonly scanLogId: string;
  readonly message: string;
  readonly isRead: boolean;
  readonly createdAt: Date;

  private constructor(props: ScanNotificationProps) {
    this.id = props.id;
    this.accountHolderId = props.accountHolderId;
    this.wristbandId = props.wristbandId;
    this.scanLogId = props.scanLogId;
    this.message = props.message;
    this.isRead = props.isRead;
    this.createdAt = props.createdAt;
  }

  static reconstitute(props: ScanNotificationProps): ScanNotification {
    return new ScanNotification(props);
  }

  markAsRead(): ScanNotification {
    return ScanNotification.reconstitute({
      id: this.id,
      accountHolderId: this.accountHolderId,
      wristbandId: this.wristbandId,
      scanLogId: this.scanLogId,
      message: this.message,
      isRead: true,
      createdAt: this.createdAt,
    });
  }
}
