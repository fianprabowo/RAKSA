export interface EmergencyProfileProps {
  id: string;
  wristbandId: string;
  preferredName: string;
  approximateAge?: number;
  bloodType?: string;
  criticalAllergies?: string;
  medicalConditions?: string;
  importantMedications?: string;
  emergencyNotes?: string;
  reunificationNote?: string;
  disorientationNotes?: string;
  cognitiveConditionFlag: boolean;
  languageHint?: string;
  isPublicEnabled: boolean;
  lastConfirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class EmergencyProfile {
  readonly id: string;
  readonly wristbandId: string;
  readonly preferredName: string;
  readonly approximateAge?: number;
  readonly bloodType?: string;
  readonly criticalAllergies?: string;
  readonly medicalConditions?: string;
  readonly importantMedications?: string;
  readonly emergencyNotes?: string;
  readonly reunificationNote?: string;
  readonly disorientationNotes?: string;
  readonly cognitiveConditionFlag: boolean;
  readonly languageHint?: string;
  readonly isPublicEnabled: boolean;
  readonly lastConfirmedAt?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: EmergencyProfileProps) {
    this.id = props.id;
    this.wristbandId = props.wristbandId;
    this.preferredName = props.preferredName;
    this.approximateAge = props.approximateAge;
    this.bloodType = props.bloodType;
    this.criticalAllergies = props.criticalAllergies;
    this.medicalConditions = props.medicalConditions;
    this.importantMedications = props.importantMedications;
    this.emergencyNotes = props.emergencyNotes;
    this.reunificationNote = props.reunificationNote;
    this.disorientationNotes = props.disorientationNotes;
    this.cognitiveConditionFlag = props.cognitiveConditionFlag;
    this.languageHint = props.languageHint;
    this.isPublicEnabled = props.isPublicEnabled;
    this.lastConfirmedAt = props.lastConfirmedAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: EmergencyProfileProps): EmergencyProfile {
    return new EmergencyProfile(props);
  }
}
