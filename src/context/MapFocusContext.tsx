import React, { createContext, useContext, useRef } from 'react';
import type { CityKey } from '../types';

type FocusFn = (city: CityKey) => void;

interface MapFocusContextValue {
  /** MapSection registers its "fly to this city" function here once Leaflet is ready. */
  registerFocusHandler: (fn: FocusFn | null) => void;
  /** Other components (e.g. hotel cards) call this to focus the map on a city. */
  focusCity: (city: CityKey) => void;
}

const MapFocusContext = createContext<MapFocusContextValue | undefined>(undefined);

export function MapFocusProvider({ children }: { children: React.ReactNode }) {
  const handlerRef = useRef<FocusFn | null>(null);

  const value: MapFocusContextValue = {
    registerFocusHandler: (fn) => {
      handlerRef.current = fn;
    },
    focusCity: (city) => {
      handlerRef.current?.(city);
    },
  };

  return <MapFocusContext.Provider value={value}>{children}</MapFocusContext.Provider>;
}

export function useMapFocus(): MapFocusContextValue {
  const ctx = useContext(MapFocusContext);
  if (!ctx) throw new Error('useMapFocus must be used within a MapFocusProvider');
  return ctx;
}
