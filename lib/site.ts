export type SocialIcon = "facebook" | "instagram" | "linkedin" | "substack";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

/* Profile handles are placeholders until the client supplies the real ones. */
export const socials: SocialLink[] = [
  { label: "Substack", href: "https://dumbproject.substack.com/", icon: "substack" },
  { label: "Instagram", href: "https://www.instagram.com/the.dumbproject", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dumb-project/", icon: "linkedin" },
];

export const copy = {
  name: "the dumb project",
  accent: "All Good Things",
  rest: "Come To Those Who Wait",
  prompt: "Get notified when we launch",
  placeholder: "Enter your Email ID",
  action: "Submit",
  sent: "Added",
  success: "We'll be in touch with you soon!",
  pageTitle: "The Dumb Project",
  pageDescription:
    "All good things come to those who wait. Leave your email and we'll tell you the moment the dumb project goes live.",
} as const;
