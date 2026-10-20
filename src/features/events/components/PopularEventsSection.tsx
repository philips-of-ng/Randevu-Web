import React, { useState } from "react";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import { PartyEvent } from "../types";

// Mock event list mirroring the screenshot
const MOCK_EVENTS: PartyEvent[] = [
  {
    id: "1",
    title: "Carti Picnic",
    image: "/assets/events/carti-picnic.jpg",
    date: "Sat, December 25",
    isoDate: "2026-12-25",
    location: "Atlanta, Georgia",
    status: "SOLD OUT",
  },
  {
    id: "2",
    title: "Black n' White",
    image: "/assets/events/black-n-white.jpg",
    date: "Sat, December 25",
    isoDate: "2026-12-25",
    location: "Atlanta, Georgia",
    status: "LIVE",
  },
  {
    id: "3",
    title: "New Jersey Greek Picnic",
    image: "/assets/events/nj-greek.jpg",
    date: "Sat, December 25",
    isoDate: "2026-12-25",
    location: "Atlanta, Georgia",
    status: "SOLD OUT",
  },
  {
    id: "4",
    title: "Back In The Yard",
    image: "/assets/events/yard.jpg",
    date: "Sat, December 25",
    isoDate: "2026-12-25",
    location: "Atlanta, Georgia",
    status: "LIVE",
  },
];

export const PopularEventsSection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState("Atlanta, Georgia");
  const [selectedDate, setSelectedDate] = useState("25/12/2026");

  // Simple client-side filtering logic
  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesLoc = selectedLocation
      ? event.location.toLowerCase().includes(selectedLocation.toLowerCase())
      : true;
    return matchesLoc;
  });

  return (
    <section className="w-full bg-black px-4 py-16 sm:px-8 sm:py-24 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <h2 className="text-center font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight">
          Popular Events near you.
        </h2>

        {/* Filter Pills */}
        <div className="mt-8 sm:mt-10">
          <EventFilters
            locationValue={selectedLocation}
            onClearLocation={() => setSelectedLocation("")}
            dateValue={selectedDate}
            onDateChange={(val) => setSelectedDate(val)}
          />
        </div>

        {/* Events Grid (1 col on mobile, 2 col on tablet, 4 col on desktop) */}
        {/* 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <div className="mt-8 sm:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => console.log("Selected event:", event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularEventsSection;
