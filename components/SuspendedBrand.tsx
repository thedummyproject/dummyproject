import Image from "next/image";

export function SuspendedBrand() {
  return (
    <div className="crane-rig" aria-label="the dumb project">
      <div className="crane-drop-wrap">
        <div className="crane-sway-wrap">
          {/* Crane Hook */}
          <div className="crane-hook-box">
            <Image
              className="crane-hook-img"
              src="/assets/crane-hook.png"
              alt="Crane Hook"
              width={140}
              height={210}
              priority
            />
          </div>

          {/* Suspended Logo with Wire Rigging */}
          <div className="crane-logo-box">
            <Image
              className="crane-logo-img"
              src="/assets/suspended-logo.png"
              alt="the dumb project"
              width={220}
              height={176}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
