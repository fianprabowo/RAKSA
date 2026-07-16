import { PhoneNumber } from "../value-objects/phone-number";

export interface EmergencyContactProps {
  id: string;
  wristbandId: string;
  name: string;
  relationship: string;
  phone: PhoneNumber;
  isPrimary: boolean;
  showNameOnPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class EmergencyContact {
  readonly id: string;
  readonly wristbandId: string;
  readonly name: string;
  readonly relationship: string;
  readonly phone: PhoneNumber;
  readonly isPrimary: boolean;
  readonly showNameOnPublic: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: EmergencyContactProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.name = props.name;
    this.relationship = props.relationship;
    this.phone = props.phone;
    this.isPrimary = props.isPrimary;
    this.showNameOnPublic = props.showNameOnPublic;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: EmergencyContactProps): EmergencyContact {
    return new EmergencyContact(props);
  }
}
