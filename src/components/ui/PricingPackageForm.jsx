
import { SPECIFIC_SERVICES } from "@/config/pricing/pricing";

const FIELD_STYLES =
  "h-[48px] w-full rounded-[5px] border border-gray-300 bg-white px-4 text-sm text-black outline-none focus:border-brand-primary";

function PackageField({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

export function PricingPackageForm() {
  const { packageTitle, services } = SPECIFIC_SERVICES;

  return (
    <div className="flex flex-col">
      <h3 className="mb-8 font-sans text-[20px] font-semibold sm:text-[24px]">
        {packageTitle}
      </h3>

      <PackageField label="Select Service" htmlFor="pricing-service">
        <select
          id="pricing-service"
          name="service"
          defaultValue=""
          className={FIELD_STYLES}
        >
          <option value="" disabled>
            Value
          </option>

          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </PackageField>

      <div className="mt-8">
        <PackageField label="Select Date" htmlFor="pricing-date">
          <input
            id="pricing-date"
            name="date"
            type="date"
            className={FIELD_STYLES}
          />
        </PackageField>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <button
          type="button"
          className="flex min-h-[50px] w-full items-center justify-center rounded-[5px] bg-black px-4 text-sm font-medium text-foreground"
        >
          Total Amount
        </button>

        <button
          type="button"
          className="flex min-h-[50px] w-full items-center justify-center rounded-[5px] bg-black px-4 text-sm font-medium text-foreground"
        >
          Payment Method
        </button>
      </div>
    </div>
  );
}
