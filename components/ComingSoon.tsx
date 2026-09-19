import { copy, socials } from "@/lib/site";
import { SuspendedBrand } from "./SuspendedBrand";
import { NotifyAsk } from "./NotifyAsk";
import { SocialLinks } from "./SocialLinks";
import { TapeField } from "./TapeField";

export function ComingSoon() {
  return (
    <main className="stage">
      <div className="card-wrap">
        {/* Suspended Crane Rig — outside card so it isn't clipped */}
        <SuspendedBrand />

        <div className="card">
          <div className="card__inner">
            {/* Main Headline */}
            <h1 className="headline">
              <em className="headline__accent">{copy.accent}</em>{" "}
              <span className="headline__regular">Come</span>
              <br />
              <span className="headline__regular">To Those Who Wait</span>
            </h1>

            {/* Interactive Form & Socials (Reveals in Phase 2) */}
            <div className="card__interactive">
              <div className="ask">
                <NotifyAsk />
              </div>
              <SocialLinks items={socials} />
            </div>
          </div>

        </div>

        {/* Caution Tape Ribbons — outside the card so it can extend past the edges */}
        <TapeField />
      </div>
    </main>
  );
}
