const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-transparent flex items-center justify-between px-8">
      <div className="flex items-center">
        {/* Logo relocated to the center hero section */}
      </div>
      <div className="flex items-center gap-8">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
