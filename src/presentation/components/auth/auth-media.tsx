import { Nfc, Phone, ShieldCheck, Users } from "lucide-react";

/**
 * Brand / illustration panel for the auth split layout.
 *
 * The scene is composed with plain markup + CSS (no Tailwind, since the auth
 * route only loads globals.css) so it stays crisp, themeable with the RAKSA
 * violet tokens, and free of external image assets. It depicts the core use
 * case: someone taps the band (NFC) or scans the QR, the emergency page opens,
 * and family gets notified.
 */
export function AuthMedia() {
  return (
    <aside className="auth-media" aria-hidden="true">
      <span className="auth-media__blob auth-media__blob--1" />
      <span className="auth-media__blob auth-media__blob--2" />
      <span className="auth-media__grid" />

      <div className="auth-media__scene">
        <div className="auth-chip auth-chip--tap">
          <span className="auth-chip__icon auth-chip__icon--tap">
            <Nfc size={15} strokeWidth={2.2} />
          </span>
          <span>
            <span className="auth-chip__title">Band tapped</span>
            <span className="auth-chip__sub">Opening emergency page…</span>
          </span>
        </div>

        <div className="auth-chip auth-chip--notify">
          <span className="auth-chip__icon auth-chip__icon--notify">
            <Users size={15} strokeWidth={2.2} />
          </span>
          <span>
            <span className="auth-chip__title">Family notified</span>
            <span className="auth-chip__sub">with live location</span>
          </span>
        </div>

        <div className="auth-phone">
          <div className="auth-phone__screen">
            <div className="auth-phone__head">
              <span className="auth-phone__eyebrow">
                <span className="auth-phone__pulse" />
                Emergency Page
              </span>
              <p className="auth-phone__name">Budi Santoso</p>
              <p className="auth-phone__id">Emergency ID · GS-7X2K9</p>
            </div>

            <div className="auth-phone__body">
              <div className="auth-phone__alert">
                <p className="auth-phone__alert-label">Critical allergies</p>
                <p className="auth-phone__alert-value">Penicillin · Peanuts</p>
              </div>
              <div className="auth-phone__cta">
                <Phone size={13} strokeWidth={2.4} />
                Call family
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-media__caption">
        <span className="auth-media__tag">
          <ShieldCheck size={12} strokeWidth={2.4} />
          RAKSA-TAG
        </span>
      </div>
    </aside>
  );
}
