import { UseCase } from "../../use-case";
import { PublicEmergencyPageDto } from "../../dto";
import { WristbandRepository } from "@/core/domain/repositories/wristband-repository";
import { EmergencyProfileRepository } from "@/core/domain/repositories/emergency-profile-repository";
import { EmergencyContactRepository } from "@/core/domain/repositories/emergency-contact-repository";
import { PublicToken } from "@/core/domain/value-objects/public-token";
import {
  InactiveWristbandError,
  NotFoundError,
} from "@/core/domain/errors/domain-errors";
import { ProfileMode } from "@/core/domain/enums";

export interface GetPublicEmergencyPageDependencies {
  wristbandRepository: WristbandRepository;
  emergencyProfileRepository: EmergencyProfileRepository;
  emergencyContactRepository: EmergencyContactRepository;
}

const ALERT_MESSAGES: Record<ProfileMode, string> = {
  [ProfileMode.ADULT_EMERGENCY]:
    "This person may need emergency help — please contact their emergency contact.",
  [ProfileMode.CHILD_GUARDIAN]:
    "This child may be lost — please contact their guardian.",
  [ProfileMode.ELDERLY_DEPENDENT]:
    "This person may need help — please contact their family.",
};

/**
 * Builds the public emergency page view model — no authentication required.
 */
export class GetPublicEmergencyPageUseCase
  implements UseCase<string, PublicEmergencyPageDto>
{
  constructor(private readonly deps: GetPublicEmergencyPageDependencies) {}

  async execute(publicTokenRaw: string): Promise<PublicEmergencyPageDto> {
    const publicToken = PublicToken.create(publicTokenRaw);
    const wristband = await this.deps.wristbandRepository.findByPublicToken(publicToken);

    if (!wristband) {
      throw new NotFoundError("Emergency page not found");
    }

    if (!wristband.isPubliclyAccessible()) {
      throw new InactiveWristbandError("This wristband is not active");
    }

    const [profile, contacts] = await Promise.all([
      this.deps.emergencyProfileRepository.findByWristbandId(wristband.id),
      this.deps.emergencyContactRepository.findByWristbandId(wristband.id),
    ]);

    if (!profile || !profile.isPublicEnabled) {
      throw new NotFoundError("Emergency profile is not available");
    }

    return {
      profileMode: wristband.profileMode,
      preferredName: profile.preferredName,
      approximateAge: profile.approximateAge,
      bloodType: profile.bloodType,
      criticalAllergies: profile.criticalAllergies,
      medicalConditions: profile.medicalConditions,
      importantMedications: profile.importantMedications,
      emergencyNotes: profile.emergencyNotes,
      reunificationNote: profile.reunificationNote,
      disorientationNotes: profile.disorientationNotes,
      cognitiveConditionFlag: profile.cognitiveConditionFlag,
      languageHint: profile.languageHint,
      contacts: contacts.map((contact) => ({
        label: contact.showNameOnPublic ? contact.name : contact.relationship,
        telUri: contact.phone.toTelUri(),
        isPrimary: contact.isPrimary,
      })),
      alertMessage: ALERT_MESSAGES[wristband.profileMode],
      wristbandLabel: wristband.wearerLabel,
    };
  }
}
