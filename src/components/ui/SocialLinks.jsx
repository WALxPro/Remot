
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const SOCIAL_ICONS = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  facebook: FaFacebookF,
};

export function SocialLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-base font-normal text-foreground">
        {title}
      </h3>

      <ul className="mt-4 flex items-center gap-5">
        {links.map(({ id, label, href }) => {
          const Icon = SOCIAL_ICONS[id];

          if (!Icon) return null;

          return (
            <li key={id}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-[49px] w-[49px] items-center justify-center rounded-full bg-brand-primary text-white transition-all duration-300 hover:scale-110 hover:bg-brand-purple focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
              >
                <Icon size={24} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
