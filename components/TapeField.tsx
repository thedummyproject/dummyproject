import Image from "next/image";

export function TapeField() {
  return (
    <div className="tape-field" aria-hidden="true">
      <Image
        className="tape-image"
        src="/assets/caution-tape.png"
        alt="Under Construction"
        width={2880}
        height={1677}
        priority
      />
    </div>
  );
}
