export function GetStartedForm() {
  return (
    <div
      className="
        w-full max-w-[572px]
        rounded-[12px]
        border border-white/15
        bg-white/[0.07]
        backdrop-blur-xl
        p-6 sm:p-10
      "
    >
      {/* HEADING */}
      <h2 className="mb-6 font-sans text-[40px] font-normal leading-[1.05] text-white">
        LETS GET

        <span className="block text-[clamp(36px,5vw,56px)] font-semibold text-brand-primary">
          STARTED!
        </span>
      </h2>

      {/* FORM */}
      <form className="flex flex-col gap-3">
        {/* NAME */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[18px] text-white">
            Name
          </label>

          <input
            id="name"
            type="text"
            className="
              h-[52px] w-full
              rounded-[7px]
              border border-white/70
              bg-transparent
              px-4 text-white
              outline-none
              focus:border-brand-primary
            "
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[18px] text-white">
            Email
          </label>

          <input
            id="email"
            type="email"
            className="
              h-[52px] w-full
              rounded-[7px]
              border border-white/70
              bg-transparent
              px-4 text-white
              outline-none
              focus:border-brand-primary
            "
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-[18px] text-white">
            Phone Number
          </label>

          <input
            id="phone"
            type="tel"
            className="
              h-[52px] w-full
              rounded-[7px]
              border border-white/70
              bg-transparent
              px-4 text-white
              outline-none
              focus:border-brand-primary
            "
          />
        </div>

        {/* BUTTON */}
        <button
          type="button"
          className="
            mt-3 h-[64px] w-full
            cursor-pointer
            rounded-[8px]
            bg-white
            text-[18px] font-normal text-black
            transition-colors duration-300
            hover:bg-brand-primary
            hover:text-white
          "
        >
          Send
        </button>
      </form>
    </div>
  );
}