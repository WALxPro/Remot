import { ChevronDown } from "lucide-react";

const BASE =
    "w-full rounded-[4px] bg-white h-[53px] px-7 text-base text-black placeholder:text-black outline-none transition focus:ring-2 focus:ring-brand-primary mb-2";

export function FormField({ name, label, type = "text", options, autoComplete }) {
    if (type === "textarea") {
        return (
            <textarea
                name={name}
                placeholder={label}
                aria-label={label}
                required
                rows={5}
                className={`${BASE} h-[180px] resize-none py-3 rounded-[6px] `}
            />
        );
    }

    if (type === "select") {
        return (
            <div className="relative">
                <select
                    name={name}
                    aria-label={label}
                    defaultValue=""
                    required
                    className={`${BASE} h-10 cursor-pointer appearance-none py-0 invalid:text-black/80`}
                >
                    <option value="" disabled>
                        {label}
                    </option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black"
                />
            </div>
        );
    }

    return (
        <input
            name={name}
            type={type}
            placeholder={label}
            aria-label={label}
            autoComplete={autoComplete}
            required
            className={`${BASE} `}
        />
    );
}