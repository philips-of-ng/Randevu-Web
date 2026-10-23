import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingContinueButton } from "../components/ContinueBtn";
import { useOnboarding } from "@/context/OnboardingContext";

interface CountryData {
  name: string;
  code: string;
  dial: string;
}

const getCountryFlag = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
};

const ALL_COUNTRIES: CountryData[] = [
  { name: "United States", code: "US", dial: "+1" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Afghanistan", code: "AF", dial: "+93" },
  { name: "Albania", code: "AL", dial: "+355" },
  { name: "Algeria", code: "DZ", dial: "+213" },
  { name: "Angola", code: "AO", dial: "+244" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Austria", code: "AT", dial: "+43" },
  { name: "Bahamas", code: "BS", dial: "+1-242" },
  { name: "Bahrain", code: "BH", dial: "+973" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Barbados", code: "BB", dial: "+1-246" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Benin", code: "BJ", dial: "+229" },
  { name: "Bermuda", code: "BM", dial: "+1-441" },
  { name: "Botswana", code: "BW", dial: "+267" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Chile", code: "CL", dial: "+56" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Congo", code: "CG", dial: "+242" },
  { name: "Costa Rica", code: "CR", dial: "+506" },
  { name: "Côte d'Ivoire", code: "CI", dial: "+225" },
  { name: "Cyprus", code: "CY", dial: "+357" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Dominican Republic", code: "DO", dial: "+1-809" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "Ethiopia", code: "ET", dial: "+251" },
  { name: "Finland", code: "FI", dial: "+358" },
  { name: "Gambia", code: "GM", dial: "+220" },
  { name: "Greece", code: "GR", dial: "+30" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Jamaica", code: "JM", dial: "+1-876" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Liberia", code: "LR", dial: "+231" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Morocco", code: "MA", dial: "+212" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Portugal", code: "PT", dial: "+351" },
  { name: "Qatar", code: "QA", dial: "+974" },
  { name: "Rwanda", code: "RW", dial: "+250" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Senegal", code: "SN", dial: "+221" },
  { name: "Sierra Leone", code: "SL", dial: "+232" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Togo", code: "TG", dial: "+228" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1-868" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "Zambia", code: "ZM", dial: "+260" },
  { name: "Zimbabwe", code: "ZW", dial: "+263" },
];

export const ContactStepPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const [email, setEmail] = useState((data.email as string) || "");

  // Parse existing phone if previously saved with country code or dial prefix
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(() => {
    if (data.countryCode) {
      const match = ALL_COUNTRIES.find((c) => c.code === data.countryCode);
      if (match) return match;
    }
    return ALL_COUNTRIES[0];
  });

  const [phoneNumber, setPhoneNumber] = useState((data.phoneNumber as string) || "");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_COUNTRIES;
    return ALL_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleContinue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!trimmedPhone) {
      setError("Please enter your phone number");
      return;
    }

    setError(null);

    // Persist full international phone and separate fields to onboarding context
    const fullPhone = `${selectedCountry.dial}${trimmedPhone.replace(/^0+/, "")}`;
    updateData({
      email: trimmedEmail,
      phoneNumber: trimmedPhone,
      phone: fullPhone,
      countryCode: selectedCountry.code,
      countryDial: selectedCountry.dial,
    });

    navigate("/onboarding/step-5");
  };

  const isComplete = email.trim().length > 0 && phoneNumber.trim().length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-1 flex-col justify-between lg:flex-initial lg:gap-8"
    >
      {/* Title & Contact Inputs */}
      <section className="flex flex-col pt-6 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          How do we contact you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-3 text-sm text-neutral-400"
        >
          We will use this for important updates and easy login next time.
        </motion.p>

        <form onSubmit={handleContinue} className="mt-8 space-y-4">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="relative flex items-center"
          >
            <span className="pointer-events-none absolute left-4 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Email address"
              autoComplete="email"
              className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-12 pr-5 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
            />
          </motion.div>

          {/* Phone Number Input with Flag Picker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="relative flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 transition-all focus-within:border-neutral-500 focus-within:ring-1 focus-within:ring-neutral-500"
          >
            {/* Country Flag & Dial Trigger */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowCountryPicker((prev) => !prev);
                setSearchQuery("");
              }}
              className="flex items-center gap-2 pr-3 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              <span className="text-xl leading-none">
                {getCountryFlag(selectedCountry.code)}
              </span>
              <span className="text-sm font-semibold text-neutral-200">
                {selectedCountry.dial}
              </span>
            </motion.button>

            {/* Separator */}
            <div className="h-5 w-[1px] bg-neutral-700" />

            {/* Phone Input */}
            <input
              id="phone"
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (error) setError(null);
              }}
              placeholder="(415) 555 - 0187"
              autoComplete="tel"
              className="w-full bg-transparent py-2 pl-3 pr-2 text-sm font-medium text-white placeholder-neutral-500 outline-none"
            />

            {/* Animated Country Picker Dropdown Modal */}
            <AnimatePresence>
              {showCountryPicker && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCountryPicker(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full z-50 mt-2 max-h-72 w-72 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl backdrop-blur-md"
                  >
                    {/* Live Search Filter */}
                    <div className="mb-2 px-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search country or code..."
                        autoFocus
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-neutral-600"
                      />
                    </div>

                    {/* Filtered Country List */}
                    <div className="max-h-52 overflow-y-auto pr-1">
                      {filteredCountries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryPicker(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-colors hover:bg-neutral-900 ${
                            selectedCountry.code === country.code
                              ? "bg-neutral-900/60 font-semibold text-white"
                              : "text-neutral-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="text-base leading-none">
                              {getCountryFlag(country.code)}
                            </span>
                            <span className="truncate">{country.name}</span>
                          </div>
                          <span className="font-mono text-neutral-500">
                            {country.dial}
                          </span>
                        </button>
                      ))}

                      {filteredCountries.length === 0 && (
                        <p className="py-4 text-center text-xs text-neutral-500">
                          No country found
                        </p>
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 text-xs font-medium text-rose-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>

      {/* Continue Action */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
        className="pt-6 pb-2 lg:pt-0 lg:pb-0"
      >
        <OnboardingContinueButton
          type="button"
          onClick={handleContinue}
          disabled={!isComplete}
        />
      </motion.footer>
    </motion.div>
  );
};

export default ContactStepPage;