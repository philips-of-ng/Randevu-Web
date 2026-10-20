import React from 'react';
import { motion, type Variants } from 'framer-motion';

const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-900 bg-black font-sans text-neutral-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Top Row: Brand & Multi-column Links */}
        <motion.div
          variants={footerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={columnVariants} className="col-span-2">
            <span className="select-none font-serif text-2xl font-medium tracking-tight text-white">
              Randevu
            </span>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-neutral-400 sm:text-sm">
              The premier social ticketing and event discovery platform. Built for hosts who demand vibe and attendees who demand unforgettable nights.
            </p>

            {/* Platform Operational Status */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-6 inline-flex cursor-default items-center gap-2 rounded-full border border-neutral-800 bg-[#121214] px-3 py-1 text-[11px] text-neutral-300 transition-colors hover:border-neutral-700"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Systems operational</span>
            </motion.div>
          </motion.div>

          {/* Column 1: Discover */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Discover
            </p>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li>
                <a href="#events" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Upcoming Parties
                </a>
              </li>
              <li>
                <a href="#explore" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Popular Venues
                </a>
              </li>
              <li>
                <a href="#festivals" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Nightlife &amp; Festivals
                </a>
              </li>
              <li>
                <a href="#mobile-app" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Get the App
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: Hosts */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Hosting
            </p>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li>
                <a href="#create" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Create an Event
                </a>
              </li>
              <li>
                <a href="#ticketing" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Ticketing &amp; Payouts
                </a>
              </li>
              <li>
                <a href="#door-scanner" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Door Entry Scanner
                </a>
              </li>
              <li>
                <a href="#pricing" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Pricing &amp; Fees
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Company */}
          <motion.div variants={columnVariants} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Company
            </p>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              <li>
                <a href="#about" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#support" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Help &amp; Support
                </a>
              </li>
              <li>
                <a href="#terms" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 text-xs text-neutral-500 sm:flex-row"
        >
          <p>© {currentYear} Randevu Technologies Inc. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <motion.a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="text-neutral-500 transition-colors hover:text-white"
              aria-label="X (formerly Twitter)"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>

            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="text-neutral-500 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="text-neutral-500 transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;