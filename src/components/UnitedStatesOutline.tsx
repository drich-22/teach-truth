type UnitedStatesOutlineProps = {
  className?: string;
  /** Invert to white for dark backgrounds */
  tone?: "ink" | "paper";
};

export function UnitedStatesOutline({
  className = "",
  tone = "ink",
}: UnitedStatesOutlineProps) {
  const toneClass =
    tone === "paper" ? "brightness-0 invert opacity-90" : "opacity-90";

  return (
    <img
      src="/images/usa-outline.svg"
      alt="Outline of the United States"
      width={959}
      height={593}
      className={`h-auto w-full select-none ${toneClass} ${className}`.trim()}
      decoding="async"
    />
  );
}
