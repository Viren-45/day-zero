// app/components/home/BackgroundDots.tsx
// Decorative dot-grid background - purely visual, no interactivity

export default function BackgroundDots() {
  return (
    <div
      className="absolute inset-0 -z-10"
      aria-hidden="true"
      style={{
        backgroundImage: `radial-gradient(circle, #c4b5fd 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: 0.35,
      }}
    />
  );
}
