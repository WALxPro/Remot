import { Button } from "@/components/ui/Button";
import { Paragraph } from "@/components/ui/Paragraph";

import { HOW_WE_WORK, IMAGES } from "@/config/service/service";

const STEP_POSITIONS = [
  "left-[3%] top-[10%]",
  "left-[35%] top-[-2%]",
  "left-[45%] top-[-5%]",
  "right-[3%] bottom-[18%]",
];

const LABEL_POSITIONS = [
  "-mt-[70px] ml-[15px]",
  "-mt-[55px] -ml-[110px]",
  "-mt-[45px] -ml-[20px]",
  "",
];

export const HowWeWork = () => {
  const { steps, button, sideLabel } = HOW_WE_WORK;

  return (
    <section
      className="
        relative
        min-h-[550px]
        overflow-hidden
        rounded-[20px]
        bg-background
        bg-cover
        bg-center
        bg-no-repeat
        sm:min-h-[650px]
        w-full
        max-w-[1440px]
        
        mx-auto
      "
      style={{
        backgroundImage: `url(${IMAGES.howWeWork})`,
      }}
    >
      {/* Side label */}
      <span className="absolute right-5 top-6 z-20 text-xs tracking-widest text-white [writing-mode:vertical-rl] rotate-180">
        {sideLabel}
      </span>

      {/* Work steps */}
      <div className="relative mx-auto  w-full max-w-[1440px] ">
        {steps.map((step, index) => (
          <WorkStep
            key={step.id}
            title={step.title}
            text={step.text}
            className={`absolute ${STEP_POSITIONS[index]}`}
            labelClassName={LABEL_POSITIONS[index]}
          />
        ))}

        {/* Contact button */}
        <div className="absolute bottom-[10%] left-[7%] z-20">
          <Button
            href={button.href}
            variant="primary"
            className="
              min-h-[44px]
              min-w-[140px]
              rounded-md
              text-sm
            "
          >
            {button.label}
          </Button>
        </div>
      </div>
    </section>
  );
};

const WorkStep = ({ title, text, className = "", labelClassName = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {title && (
    
<h2
  className="
    font-sans
    text-[clamp(60px,10vw,180px)]
    lg:text-[clamp(140px,16vw,230px)]
    2xl:text-[250px]
    font-normal
    leading-[0.9]
    tracking-[-0.06em]
    text-brand-primary
    whitespace-nowrap
  "
>
  {title}
</h2>

      )}

      <div
        className={`
          service-glass
          relative
          z-10
          w-fit
          rounded-xl
          px-4
          py-2
          sm:px-5
          sm:py-3
          ${labelClassName}
        `}
      >
        <Paragraph className="whitespace-nowrap !text-[clamp(12px,1.5vw,20px)] !leading-normal">
          {text}
        </Paragraph>
      </div>
    </div>
  );
};
