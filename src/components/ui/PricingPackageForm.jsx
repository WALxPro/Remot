
import { SPECIFIC_SERVICES } from "@/config/pricing/pricing";

const FIELD_STYLES =
  "h-12 w-full rounded-[5px] border border-gray-300 bg-white px-4 text-sm text-black outline-none transition-colors focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/20";

const BUTTON_STYLES =
  "flex min-h-[50px] w-full items-center justify-center rounded-[5px] bg-black px-4 text-sm font-medium text-white transition-opacity hover:opacity-90";

const PackageField = ({ id, label, children }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium">
      {label}
    </label>
    {children}
  </div>
);

const ServiceSelect = ({ services }) => (
  <PackageField id="pricing-service" label="Select Service">
    <select
      id="pricing-service"
      name="service"
      defaultValue=""
      required
      className={FIELD_STYLES}
    >
      <option value="" disabled>
        Select a service
      </option>

      {services.map((service) => (
        <option key={service} value={service}>
          {service}
        </option>
      ))}
    </select>
  </PackageField>
);

const DateSelect = () => (
  <PackageField id="pricing-date" label="Select Date">
    <input
      id="pricing-date"
      name="date"
      type="date"
      required
      className={FIELD_STYLES}
    />
  </PackageField>
);

const PackageActions = () => (
  <div className="flex flex-col gap-4">
    <button type="button" className={BUTTON_STYLES}>
      Total Amount
    </button>

    <button type="button" className={BUTTON_STYLES}>
      Payment Method
    </button>
  </div>
);

export function PricingPackageForm() {
  const { packageTitle, services } = SPECIFIC_SERVICES;

  return (
    <form className="flex flex-col gap-8">
      <h3 className="font-sans text-[20px] font-semibold sm:text-[24px]">
        {packageTitle}
      </h3>

      <ServiceSelect services={services} />

      <DateSelect />

      <PackageActions />
    </form>
  );
}
