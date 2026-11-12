import { CreateEventFormData } from "../create/types";

export const formatEventPayload = (formData: CreateEventFormData & { tiers?: any[] }) => {
  const startDateTime = formData.startDate && formData.startTime
     ? new Date(`${formData.startDate}T${formData.startTime}`).toISOString()
     : formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString();
     
  const endDateTime = formData.endDate && formData.endTime
     ? new Date(`${formData.endDate}T${formData.endTime}`).toISOString()
     : formData.endDate ? new Date(formData.endDate).toISOString() : new Date(Date.now() + 86400000 * 7).toISOString();

  // Ensure salesEnd is strictly after salesStart to pass backend validation
  const salesStartIso = new Date().toISOString(); // Tickets go on sale immediately
  const salesEndIso = endDateTime > salesStartIso 
    ? endDateTime 
    : new Date(new Date(salesStartIso).getTime() + 86400000 * 7).toISOString();

  const formattedTiers = formData.ticketType === "multiple" && formData.tiers && formData.tiers.length > 0
    ? formData.tiers.map((t) => ({
        name: t.name || "General Admission",
        price: parseFloat(t.price) || 0,
        totalCapacity: parseInt(t.quantity) || 100,
        orderLimit: parseInt(t.orderLimit) || 5,
        benefits: t.benefits || [],
        salesStart: salesStartIso,
        salesEnd: salesEndIso,
      }))
    : [
        {
          name: formData.ticketTitle || "General Admission",
          price: parseFloat(formData.ticketPrice) || 0,
          totalCapacity: parseInt(formData.ticketQuantity) || 100,
          orderLimit: parseInt(formData.orderLimit) || 5,
          benefits: formData.benefits || ["Standard Entry"],
          salesStart: salesStartIso,
          salesEnd: salesEndIso,
        },
      ];

  const firstTier = formattedTiers[0];

  return {
    title: formData.title.trim(),
    description: formData.description.trim(),
    eventType: formData.eventType,
    location: {
      streetAddress: formData.streetAddress,
      city: formData.city,
      stateCountry: formData.stateCountry,
      isVirtual: formData.isVirtual,
    },
    schedule: {
      type: formData.scheduleType,
      startDate: startDateTime,
      endDate: endDateTime,
    },
    flyerUrl: formData.flyerUrl,

    ticketTitle: firstTier.name,
    ticketPrice: firstTier.price,
    ticketQuantity: firstTier.totalCapacity,
    ticketTiers: formattedTiers,

    ticketing: {
      type: formData.ticketType,
      ticketTiers: formattedTiers,
      tiers: formattedTiers,
    },

    administration: {
      collaborators: formData.collaborators || [],
      isPrivate: formData.isPrivate || false,
      requireApproval: formData.requireApproval || false,
    },
  };
};