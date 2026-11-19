
import Image from "next/image";
import { IMAGES } from "@/config/home/home";



const CREATIVE_IMAGES = [
//   {
//     src: IMAGES.creative.creative4,
//     z: 10,
//     scale: 0.82,
//     x: -15,
//     y: 15,
//   },
  {
    src: IMAGES.creative.creative3,
    z: 20,
    scale: 0.88,
    x: 20,
    y: -10,
  },
  {
    src: IMAGES.creative.creative2,
    z: 30,
    scale: 0.94,
    x: -10,
    y: 5,
  },
  {
    src: IMAGES.creative.creative1,
    z: 40,
    scale: 1,
    x: 0,
    y: 0,
  },
];



export function CreativeSection() {
  return (
    <div className="relative h-[500px] lg:h-[120vh]">
      <section className="relative flex h-full w-full items-center overflow-hidden bg-transparent px-2 sm:px-3 lg:px-[1.5vw]">
        <div className="mx-auto grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_380px_minmax(0,1fr)] lg:gap-0">

          {/* Left Text */}
          <div className="relative z-10 text-center lg:-translate-y-[30vh] lg:text-left">
            <h2 className="font-sans text-[36px] font-light uppercase leading-[0.95] tracking-tight text-white sm:text-[46px] lg:text-[8vw]">
              <span className="block whitespace-nowrap lg:text-[6.5vw]">
                NOT JUST
              </span>
              <span className="block whitespace-nowrap font-semibold">
                CREATIVE
              </span>
            </h2>
          </div>

          

{/* Center Artwork */}
<div className="relative z-20 mx-auto h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] lg:h-[380px] lg:w-[380px] lg:-translate-y-[10vh]">
  {CREATIVE_IMAGES.map((image, index) => (
    <div
      key={image.src}
      className="absolute inset-0"
      style={{
        zIndex: image.z,
        transform: `translate(${image.x}px, ${image.y}px) scale(${image.scale})`,
      }}
    >
      <Image
        src={image.src}
        alt={`Creative artwork ${index + 1}`}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 260px, 220px"
        className="object-contain"
      />
    </div>
  ))}
</div>



          {/* Right Text */}
          <div className="relative z-10 text-center lg:-ml-[2vw] lg:translate-y-0 lg:text-right">
            <h2 className="font-sans text-[36px] font-light uppercase leading-[0.95] tracking-tight text-white sm:text-[46px] lg:text-[6.5vw]">
              <span className="block whitespace-nowrap lg:text-[6vw]">
                CREATIVELY
              </span>
              <span className="block whitespace-nowrap font-bold">
                DIFFERENT!
              </span>
            </h2>
          </div>

        </div>
      </section>
    </div>
  );
}
