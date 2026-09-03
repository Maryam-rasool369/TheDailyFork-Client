import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, User, LogOut, NotebookText, Pencil, Menu } from "lucide-react";
import logo from "../assets/logos/LogoSmall.png";
import { BLOG_CATEGORIES } from "../common/enum";
import { useAuthStore } from "../store/authStore";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);

  const blogsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Read real auth state instead of a prop
  const user = useAuthStore((s) => s.user);
  const isLoggedIn = !!user;
  const { signOut } = useAuth();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (blogsRef.current && !blogsRef.current.contains(e.target as Node)) {
        setBlogsOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getStartedLink = isLoggedIn ? "/create-blog" : "/login";
  const getStartedLabel = isLoggedIn ? "Create Blog" : "Get Started";

  const handleLogout = () => {
    setProfileOpen(false);
    signOut();
  };

  return (
    <>
      <header className="relative z-50 w-full px-4 pt-4 tracking-wide">
        <nav className="mx-auto max-w-7xl bg-ink backdrop-blur-sm border shadow-sm rounded-2xl px-5 py-3 flex items-center justify-between">
          {/* Left: Logo (desktop) / Hamburger + Logo (mobile) */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="text-moss" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Our Web Logo" className="max-w-25" />
            </Link>
          </div>

          {/* Center: Nav links (desktop only) */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-cloud">
            <Link to="/" className="hover:text-purple transition-colors">
              Home
            </Link>

            <div className="relative" ref={blogsRef}>
              <button
                onClick={() => setBlogsOpen((v) => !v)}
                className="flex items-center gap-1 hover:text-purple transition-colors"
              >
                Blogs
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${blogsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {blogsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-ink shadow-lg rounded-xl py-2 flex flex-col">
                  {BLOG_CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to={cat === "All" ? "/blogs" : `/blogs?category=${cat.toLowerCase()}`}
                      onClick={() => setBlogsOpen(false)}
                      className="px-4 py-2 text-sm hover:bg-purple-soft hover:text-purple transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="hover:text-purple transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-purple transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Right: Get started button + profile */}
          <div className="flex items-center gap-4">
            <Link
              to={getStartedLink}
              className="hidden sm:inline-block bg-purple-soft hover:bg-purple text-ink font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
            >
              {getStartedLabel}
            </Link>

            {isLoggedIn && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="w-9 h-9 rounded-full overflow-hidden border-purple"
                >
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple/10 flex items-center justify-center text-cloud">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </button>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-3 w-48 bg-cloud border border-gray-100 shadow-lg rounded-xl py-2 flex flex-col">
                    <Link
                      to="/edit-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:text-purple transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit profile
                    </Link>
                    <Link
                      to="/my-blogs"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:text-purple transition-colors"
                    >
                      <NotebookText className="w-4 h-4" />
                      My blogs
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-left text-red-700 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-72 bg-cloud shadow-xl p-6 flex flex-col gap-1">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="Our Web Logo" className="max-w-25" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-ink text-xl leading-none"
              >
                &times;
              </button>
            </div>

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="py-3 font-body text-ink border-b border-gray-100"
            >
              Home
            </Link>

            <button
              onClick={() => setMobileBlogsOpen((v) => !v)}
              className="py-3 flex items-center justify-between font-body text-ink border-b border-gray-100"
            >
              Blogs
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileBlogsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileBlogsOpen && (
              <div className="pl-4 flex flex-col border-b border-gray-100 pb-2">
                {BLOG_CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={cat === "All" ? "/blogs" : `/blogs?category=${cat.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm text-muted"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="py-3 font-body text-ink border-b border-gray-100"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-3 font-body text-ink border-b border-gray-100"
            >
              Contact Us
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/edit-profile"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 flex items-center gap-2 font-body text-ink border-b border-gray-100"
                >
                  <Pencil className="w-4 h-4" />
                  Edit profile
                </Link>
                <Link
                  to="/my-blogs"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 flex items-center gap-2 font-body text-ink border-b border-gray-100"
                >
                  <NotebookText className="w-4 h-4" />
                  My blogs
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut();
                  }}
                  className="py-3 flex items-center gap-2 text-left text-red-700"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}

            <Link
              to={getStartedLink}
              onClick={() => setMobileOpen(false)}
              className="mt-4 bg-moss text-cloud text-center font-medium text-sm px-5 py-2.5 rounded-full"
            >
              {getStartedLabel}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;