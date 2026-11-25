"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";

const SERVICES = [
  { title: "ILLUSTRATION", rotate: 8, x: 10 },
  { title: "MOBILE APP", rotate: -5, x: 0 },
  { title: "SEO OPTIMIZATION", rotate: 5, x: 5 },
  { title: "ANIMATION", rotate: 3, x: 15 },
  { title: "SOCIAL MEDIA", rotate: -6, x: 10 },
  { title: "GRAPHIC DESIGN", rotate: 5, x: -5 },
  { title: "WEB DEVELOPMENT", rotate: -5, x: 10 },
];

const FIELDS = [
  { label: "Name", type: "text", name: "name" },
  { label: "Email", type: "email", name: "email" },
  { label: "Phone Number", type: "tel", name: "phone" },
];

// ANIMATED SERVICE TAGS
function ServiceTags() {
  return (
    <div className="relative mt-8 flex flex-col items-center">
      {SERVICES.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{
            opacity: 0,
            y: -80,
            rotate: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: service.x,
            rotate: service.rotate,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.3 + index * 0.12,
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            zIndex: 20,
          }}
          className="
            relative -mt-2
            flex w-full max-w-[340px]
            items-center justify-center
            rounded-full
            border border-white/10
            bg-gradient-to-r
            from-[#20091d]
            via-[#49203d]
            to-[#20091d]
            px-5 py-3
            text-center
            font-sans text-[20px]
            font-normal text-white
            shadow-lg
            lg:text-[24px]
          "
        >
          {service.title}
        </motion.div>
      ))}
    </div>
  );
}

// POPUP FORM — UI ONLY
function PopupForm() {
  return (
    <div
      className="
        w-full rounded-[12px]
        bg-white p-6 text-black
        md:p-8
      "
    >
      <h2 className="mb-5 font-sans text-[30px] font-normal leading-none">
        LETS GET

        <span className="mt-1 block text-[40px] font-semibold text-brand-primary">
          STARTED!
        </span>
      </h2>

      <form className="flex flex-col gap-3">
        {FIELDS.map((field) => (
          <div
            key={field.name}
            className="flex flex-col gap-1.5"
          >
            <label
              htmlFor={`popup-${field.name}`}
              className="text-sm text-black"
            >
              {field.label}
            </label>

            <input
              id={`popup-${field.name}`}
              type={field.type}
              className="
                h-[44px] w-full
                rounded-[5px]
                border border-black/20
                bg-transparent
                px-3 text-black
                outline-none
                transition-colors
                focus:border-brand-primary
              "
            />
          </div>
        ))}

        <button
          type="button"
          className="
            mt-2 h-[50px] w-full
            cursor-pointer
            rounded-[5px]
            bg-black text-sm text-white
            transition-colors duration-300
            hover:bg-brand-primary
          "
        >
          Send
        </button>
      </form>
    </div>
  );
}

// MAIN POPUP
export function ContactPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            overflow-y-auto
            bg-black/70
            p-4
            backdrop-blur-sm
          "
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
            }}
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              grid w-full max-w-[900px]
              max-h-[90dvh] overflow-y-auto
              grid-cols-1
              gap-6
              rounded-[24px]
              border border-white/25
              bg-black p-4
              shadow-[0_20px_100px_rgba(236,0,174,0.25)]
              md:grid-cols-2
            "
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close popup"
              className="
                absolute right-6 top-6 z-50
                cursor-pointer text-xl
                text-black hover:text-brand-primary
              "
            >
              <HiX />
            </button>

            {/* LEFT CONTENT */}
            <div className="hidden flex-col justify-center px-6 py-5 md:flex">
              <h2
                className="
                  font-sans
                  text-[clamp(30px,3vw,46px)]
                  font-normal
                  uppercase leading-[1.05]
                  tracking-tight text-white
                "
              >
                HAVE AN IDEA?
                <span className="block">IN MIND?</span>
              </h2>

              <ServiceTags />
            </div>

            {/* RIGHT CONTENT */}
            <PopupForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}