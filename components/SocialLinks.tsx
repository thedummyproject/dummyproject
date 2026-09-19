import type { SocialLink } from "@/lib/site";
import { BrandIcon } from "./BrandIcons";

export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <ul className="socials">
      {items.map((item) => (
        <li key={item.label}>
          <a
            className="social"
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.label}
          >
            <BrandIcon name={item.icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
