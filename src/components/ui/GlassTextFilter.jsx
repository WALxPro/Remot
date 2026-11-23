export function GlassTextFilter({
  id = "glass-text",
  blur = 2,
  depth = 3,
  strength = 0.6,   // rim ki brightness (specularConstant)
  opacity = 0.7,    // rim ki opacity
  bounce = 0,       // bottom-right ki halki light (0 = off)
}) {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <filter id={id} x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 20 0" result="solid" />
          <feGaussianBlur in="solid" stdDeviation={blur} result="bump" />

          {/* top-left shine */}
          <feSpecularLighting in="bump" surfaceScale={depth} specularConstant={strength}
            specularExponent="30" lightingColor="#ffffff" result="spec">
            <feDistantLight azimuth="225" elevation="40" />
          </feSpecularLighting>
          <feComposite in="spec" in2="solid" operator="in" result="rim" />
          <feComponentTransfer in="rim" result="softRim">
            <feFuncA type="linear" slope={opacity} />
          </feComponentTransfer>

          {/* bottom-right ki halki bounce light */}
          <feSpecularLighting in="bump" surfaceScale={depth} specularConstant={bounce}
            specularExponent="25" lightingColor="#ffffff" result="spec2">
            <feDistantLight azimuth="45" elevation="40" />
          </feSpecularLighting>
          <feComposite in="spec2" in2="solid" operator="in" result="rim2" />

          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="rim2" />
            <feMergeNode in="softRim" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}