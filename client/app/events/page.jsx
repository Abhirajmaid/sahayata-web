"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/src/components/common/HeroSection";
import FeaturedEvent from "@/src/components/events/FeaturedEvent";
import EventList from "@/src/components/events/EventList";
import Pagination from "@/src/components/events/Pagination";
import { events } from "@/src/data/eventsData";

const ITEMS_PER_PAGE = 3;

const EventsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const regularEvents = React.useMemo(() => events.slice(0, -1), []);
  const featuredEvent = React.useMemo(() => events[events.length - 1], []);
  const totalPages = Math.ceil(regularEvents.length / ITEMS_PER_PAGE);

  const currentEvents = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return regularEvents.slice(startIndex, endIndex);
  }, [currentPage, regularEvents]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  const handleBookSlot = (event) => {
    router.push(`/events/${event.id}`);
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection title="Events" breadcrumb="Events" />
      <FeaturedEvent event={featuredEvent} />
      <EventList events={currentEvents} onBookSlot={handleBookSlot} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EventsPage;
