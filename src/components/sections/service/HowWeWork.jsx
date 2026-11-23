import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

import { HOW_WE_WORK, IMAGES } from "@/config/service/service";

/* =========================
   STEP POSITIONS
========================= */

const STEP_STYLES = [
  {
    wrapper: "left-[5%] top-[8%]",
    label: "absolute left-[15%] top-[35%]",
  },
  {
    wrapper: "left-[37%] top-[34%]",
    label: "absolute -left-[75%] top-[-5%]",
  },
  {
    wrapper: "left-[50%] top-[62%]",
    label: "absolute left-[-15%] top-[-50%]",
  },
  {
    wrapper: "left-[60%] top-[63%]",
    label: "",
  },
];

/* =========================
   WORK STEP
========================= */

const WorkStep = ({ title, text, wrapperClass = "", labelClass = "" }) => {
  return (
    <div className={`absolute ${wrapperClass}`}>
      {title && (
        <h2
          className="
    whitespace-nowrap
    font-sans
    text-[clamp(45px,10vw,150px)]
    lg:text-[220px]
    font-normal
    leading-[0.85]
    tracking-[-0.06em]
    text-brand-primary
  "
        >
          {title}
        </h2>
      )}

      <div
        className={`
          service-glass
          z-20
          w-fit
          whitespace-nowrap
          rounded-xl
          px-3 py-2
          sm:px-4
          lg:px-5 lg:py-3
          ${labelClass}
        `}
      >
        <Paragraph
          className="
            text-[25px]
            !leading-[1.3]
          "
        >
          {text}
        </Paragraph>
      </div>
    </div>
  );
};

/* =========================
   HOW WE WORK SECTION
========================= */

export const HowWeWork = () => {
  const { steps, button, sideLabel } = HOW_WE_WORK;

  return (
    <section
      className="
        relative
        mx-auto
        w-full
        max-w-[1440px]
        overflow-hidden
        rounded-[20px]
        bg-background
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: `url(${IMAGES.howWeWork})`,
      }}
    >
      <div
        className="
          relative
          h-[340px]
          w-full
          sm:h-[430px]
          md:h-[500px]
          lg:h-[550px]
          xl:h-[620px]
        "
      >
        {/* Side label */}
        <span
          className="
            absolute
            right-4 top-5
            z-30
            text-[10px]
            tracking-widest
            text-foreground
            [writing-mode:vertical-rl]
            rotate-180
          "
        >
          {sideLabel}
        </span>

        {/* Diagonal Work Steps */}
        {steps.map((step, index) => (
          <WorkStep
            key={step.id}
            title={step.title}
            text={step.text}
            wrapperClass={STEP_STYLES[index]?.wrapper ?? ""}
            labelClass={STEP_STYLES[index]?.label ?? ""}
          />
        ))}

        {/* Contact Button */}
        <div
          className="
            absolute
            bottom-[12%]
            left-[7%]
            z-30
          "
        >
          <Button href={button.href} variant="primary">
            {button.label}
          </Button>
        </div>
      </div>
    </section>
  );
};
