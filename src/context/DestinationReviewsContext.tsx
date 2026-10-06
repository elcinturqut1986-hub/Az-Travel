import React, { createContext, useCallback, useContext, useState } from 'react';
import type { Destination } from '../types';

export interface DestinationReview {
  id: string;
  destinationId: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface DestinationReviewsContextValue {
  reviews: DestinationReview[];
  addReview: (destinationId: number, review: Pick<DestinationReview, 'name' | 'rating' | 'comment'>) => void;
  getSummary: (destination: Destination) => { rating: string; count: number };
}

const STORAGE_KEY = 'aztravel_destination_reviews';
const DestinationReviewsContext = createContext<DestinationReviewsContextValue | undefined>(undefined);

function isDestinationReview(value: unknown): value is DestinationReview {
  if (!value || typeof value !== 'object') return false;
  const review = value as Record<string, unknown>;
  return typeof review.id === 'string'
    && typeof review.destinationId === 'number'
    && typeof review.name === 'string'
    && typeof review.rating === 'number'
    && Number.isInteger(review.rating)
    && review.rating >= 1
    && review.rating <= 5
    && typeof review.comment === 'string'
    && typeof review.createdAt === 'string';
}

function readStoredReviews(): DestinationReview[] {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isDestinationReview)) {
    throw new Error('Stored destination reviews have an invalid format.');
  }
  return parsed;
}

export function DestinationReviewsProvider({ children }: { children: React.ReactNode }) {
  const [reviews, setReviews] = useState<DestinationReview[]>(readStoredReviews);

  const addReview = useCallback<DestinationReviewsContextValue['addReview']>((destinationId, review) => {
    const nextReview: DestinationReview = {
      ...review,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      destinationId,
      createdAt: new Date().toISOString(),
    };
    const nextReviews = [...reviews, nextReview];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReviews));
    setReviews(nextReviews);
  }, [reviews]);

  const getSummary = useCallback((destination: Destination) => {
    const destinationReviews = reviews.filter((review) => review.destinationId === destination.id);
    const count = destination.reviews + destinationReviews.length;
    const addedRatingTotal = destinationReviews.reduce((total, review) => total + review.rating, 0);
    const rating = (destination.rating * destination.reviews + addedRatingTotal) / count;
    return { rating: rating.toFixed(1), count };
  }, [reviews]);

  return (
    <DestinationReviewsContext.Provider value={{ reviews, addReview, getSummary }}>
      {children}
    </DestinationReviewsContext.Provider>
  );
}

export function useDestinationReviews(): DestinationReviewsContextValue {
  const context = useContext(DestinationReviewsContext);
  if (!context) throw new Error('useDestinationReviews must be used within a DestinationReviewsProvider');
  return context;
}
