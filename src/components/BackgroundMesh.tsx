const BackgroundMesh = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-2)) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-1)) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-3)) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
