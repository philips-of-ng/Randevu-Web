import React, { useState } from 'react';
import BrandPill from './BrandPill';
import DarkOutlineButton from './DarkOutlineButton';
import GlowRedButton from './GlowRedButton';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-black px-4 py-3 sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Left: Brand Pill with Hamburger Toggle */}
        <BrandPill
          brandName="Randevu"
          onMenuToggle={() => setIsOpen((prev) => !prev)}
        />

        {/* Right Desktop Actions (>= 768px) */}
        <div className="hidden md:flex items-center gap-3">
          <DarkOutlineButton
            label="Get App"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            }
            onClick={() => console.log('Get App clicked')}
          />

          <DarkOutlineButton
            label="Sign Up"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            }
            onClick={() => navigate('/onboarding')}
          />

          <GlowRedButton
            label="Host an Event"
            onClick={() => console.log('Host an Event clicked')}
          />
        </div>

        {/* Right Mobile Quick CTA (< 768px) */}
        <div className="flex md:hidden items-center">
          <GlowRedButton
            label="Host"
            className="!px-3 !py-1.5 !text-xs"
            onClick={() => navigate('/onboarding')}
          />
        </div>
      </nav>

      {/* Mobile Drawer (Renders inside header flow when toggled) */}
      {isOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-neutral-800 flex flex-col gap-2.5">
          <DarkOutlineButton
            label="Get App"
            className="w-full justify-center py-2.5"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            }
            onClick={() => {
              console.log('Get App clicked');
              setIsOpen(false);
            }}
          />

          <DarkOutlineButton
            label="Sign Up"
            className="w-full justify-center py-2.5"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            }
            onClick={() => {
              navigate('/onboarding')
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;