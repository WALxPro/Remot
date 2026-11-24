

export function StudioBanner() {
  const text =
    "STUDIO REMOT BRINGS THOSE SKILLS TOGETHER IN ONE REMOTE CREATIVE STUDIO";

  return (
    <section className="relative overflow-hidden bg-transparent">
     
        <div className="relative flex h-[100px] items-center overflow-hidden bg-transparent px-0 py-10 sm:min-h-[300px] sm:py-[150px]">
          <div className="w-full -rotate-[4deg]">
            <div
              className="studio-banner-scroll flex w-max items-center"
              aria-hidden="true"
            >
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center"
                >
                  {Array.from({ length: 3 }, (_, index) => (
                    <span
                      key={index}
                      className="shrink-0 whitespace-nowrap px-6 font-sans text-[30px] font-medium uppercase text-foreground sm:text-[54px]"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
