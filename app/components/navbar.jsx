'use client';
import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Briefcase, Settings, Book, Award, Trophy, Code , Binary , Terminal } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "/#about", icon: <User size={22} /> },
    { name: "Experience", href: "/#experience", icon: <Briefcase size={22} /> },
    { name: "Skills", href: "/#skills", icon: <Settings size={22} /> },
    { name: "Education", href: "/#education", icon: <Book size={22} /> },
    { name: "Projects", href: "/#projects", icon: <Code size={22} /> },
    { name: "Certifications", href: "/#certifications", icon: <Award size={22} /> },
    { name: "Achievements", href: "/#achievements", icon: <Trophy size={22} /> },
  ];

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5 px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="text-[#16f2b3] text-3xl font-light italic ">
          Strike
        </Link>

        {/* Hamburger for sm and md (visible < lg) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Items for lg+ */}
        <ul
          className={`${
            isOpen
              ? "flex flex-col items-start absolute top-16 left-0 w-full bg-black bg-opacity-60 px-6 py-4 space-y-4 z-50 transition-all"
              : "hidden"
          } lg:flex lg:flex-row lg:items-center lg:space-x-1 lg:static lg:bg-transparent lg:p-0`}
        >

          <li className="hidden text-3xl lg:inline text-pink-600 mx-0.5"><Terminal size={22}/></li>

          {navItems.map((item, index) => (
            <li key={index} className="relative group flex items-center">
              <Link
                href={item.href}
                className="block text-white text-sm px-1 py-1 transition-colors duration-300 hover:text-[#16f2b3]"
              >
                <span className="inline-flex items-center gap-1">
                  {/* Icon only shown on lg and up */}
                  <span className="hidden lg:inline">{item.icon}</span>

                  {/* Slow expanding text on hover (500ms), only on lg+ */}
                  <span className="inline-block overflow-hidden whitespace-nowrap lg:max-w-[0ch] lg:group-hover:max-w-full transition-all duration-500 ease-in-out">
                    {item.name}
                  </span>
                </span>
              </Link>

              {/* Dot between items */}
              {index < navItems.length - 1 && (
                <span className="hidden lg:inline text-pink-600 mx-0.5"></span>
              )}
            </li>
          ))}

          {/* End Dot */}
          <li className="hidden text-3xl lg:inline text-pink-600 mx-0.5"><Binary size={22}/></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
