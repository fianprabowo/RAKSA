import { AccessMethod } from "../enums";

export interface ScanLogProps {
  id: string;
  wristbandId: string;
  accessMethod: AccessMethod;
  locationShared: boolean;
  sharedLatitude?: number;
  sharedLongitude?: number;
  locationAccuracyM?: number;
  locationSharedAt?: Date;
  scannedAt: Date;
  userAgent?: string;
  ipHash?: string;
  approximateLocation?: string;
  createdAt: Date;
}

export class ScanLog {
  readonly id: string;
  readonly wristbandId: string;
  readonly accessMethod: AccessMethod;
  readonly locationShared: boolean;
  readonly sharedLatitude?: number;
  readonly sharedLongitude?: number;
  readonly locationAccuracyM?: number;
  readonly locationSharedAt?: Date;
  readonly scannedAt: Date;
  readonly userAgent?: string;
  readonly ipHash?: string;
  readonly approximateLocation?: string;
  readonly createdAt: Date;

  private constructor(props: ScanLogProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.accessMethod = props.accessMethod;
    this.locationShared = props.locationShared;
    this.sharedLatitude = props.sharedLatitude;
    this.sharedLongitude = props.sharedLongitude;
    this.locationAccuracyM = props.locationAccuracyM;
    this.locationSharedAt = props.locationSharedAt;
    this.scannedAt = props.scannedAt;
    this.userAgent = props.userAgent;
    this.ipHash = props.ipHash;
    this.approximateLocation = props.approximateLocation;
    this.createdAt = props.createdAt;
  }

  static reconstitute(props: ScanLogProps): ScanLog {
    return new ScanLog(props);
  }
}
