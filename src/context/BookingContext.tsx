import React, { createContext, useContext, useMemo, useState } from 'react';
import type { BookingSnapshot } from '../types';

interface BookingContextValue {
  /** Destination currently selected in the search bar / booking form select. */
  selectedDestinationId: number | null;
  selectDestination: (id: number) => void;

  /** Values the search bar / hotel "Book" button hand off to the booking form. */
  prefillDate: string;
  setPrefillDate: (v: string) => void;
  prefillGuests: string;
  setPrefillGuests: (v: string) => void;
  prefillNotes: string;
  setPrefillNotes: (v: string) => void;

  /** Destination detail modal. */
  openDestinationId: number | null;
  openDestinationModal: (id: number) => void;
  closeDestinationModal: () => void;

  /** Payment modal, opened once the booking form validates successfully. */
  bookingSnapshot: BookingSnapshot | null;
  isPaymentOpen: boolean;
  startPayment: (snapshot: BookingSnapshot) => void;
  closePaymentModal: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [prefillDate, setPrefillDate] = useState('');
  const [prefillGuests, setPrefillGuests] = useState('');
  const [prefillNotes, setPrefillNotes] = useState('');
  const [openDestinationId, setOpenDestinationId] = useState<number | null>(null);
  const [bookingSnapshot, setBookingSnapshot] = useState<BookingSnapshot | null>(null);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const value = useMemo<BookingContextValue>(
    () => ({
      selectedDestinationId,
      selectDestination: setSelectedDestinationId,
      prefillDate,
      setPrefillDate,
      prefillGuests,
      setPrefillGuests,
      prefillNotes,
      setPrefillNotes,
      openDestinationId,
      openDestinationModal: (id) => setOpenDestinationId(id),
      closeDestinationModal: () => setOpenDestinationId(null),
      bookingSnapshot,
      isPaymentOpen,
      startPayment: (snapshot) => {
        setBookingSnapshot(snapshot);
        setPaymentOpen(true);
      },
      closePaymentModal: () => setPaymentOpen(false),
    }),
    [selectedDestinationId, prefillDate, prefillGuests, prefillNotes, openDestinationId, bookingSnapshot, isPaymentOpen],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
}
