import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../../i18n/LanguageContext';
import { destinations } from '../../data/destinations';
import { REGIONS, MAP_COORDS } from '../../data/dictionaries';
import { useMapFocus } from '../../context/MapFocusContext';
import type { CityKey } from '../../types';

// Vite bundles marker icons oddly with Leaflet by default — point at the CDN copies instead.
const DEFAULT_ICON = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MapSection() {
  const { t, lang } = useLanguage();
  const { registerFocusHandler } = useMapFocus();
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<number, L.Marker>>({});

  // Init Leaflet map once.
  useEffect(() => {
    if (!mapElRef.current || mapInstanceRef.current) return;

    const map = L.map(mapElRef.current).setView([40.4093, 49.8671], 6.3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    destinations.forEach((d) => {
      const coord = MAP_COORDS[d.cityKey];
      if (!coord) return;
      const marker = L.marker(coord, { icon: DEFAULT_ICON }).addTo(map).bindPopup(popupHtml(d.id));
      markersRef.current[d.id] = marker;
    });

    mapInstanceRef.current = map;

    registerFocusHandler((city: CityKey) => {
      const coord = MAP_COORDS[city];
      const destination = destinations.find((d) => d.cityKey === city);
      if (coord) map.flyTo(coord, 11, { duration: 1 });
      if (destination) markersRef.current[destination.id]?.openPopup();
    });

    return () => {
      registerFocusHandler(null);
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep popup content translated when the language changes.
  useEffect(() => {
    destinations.forEach((d) => {
      markersRef.current[d.id]?.setPopupContent(popupHtml(d.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function popupHtml(destinationId: number): string {
    const d = destinations.find((x) => x.id === destinationId);
    if (!d) return '';
    return `
      <div style="min-width:180px;max-width:220px;">
        <img src="${d.img}" alt="${d.name[lang]}" style="width:100%;height:110px;object-fit:cover;border-radius:10px;margin-bottom:8px;display:block;" />
        <div><b>${d.name[lang]}</b></div>
        <div>${REGIONS[d.regionKey][lang]}</div>
        <div style="margin-top:4px;font-weight:600;">${d.price}₼</div>
      </div>
    `;
  }

  function handleListClick(destinationId: number, cityKey: CityKey) {
    const coord = MAP_COORDS[cityKey];
    if (coord && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coord, 10, { duration: 1 });
      markersRef.current[destinationId]?.openPopup();
    }
  }

  return (
    <section id="map">
      <div className="container">
        <div className="section-head reveal show">
          <span className="badge">{t.map_badge}</span>
          <h2>{t.map_title}</h2>
          <p>{t.map_subtitle}</p>
        </div>
        <div className="map-wrap reveal show">
          <div className="map-list">
            {destinations.map((d) => (
              <div
                key={d.id}
                className="map-list-item"
                onClick={() => handleListClick(d.id, d.cityKey)}
              >
                <img
                  src={d.img}
                  alt={d.name[lang]}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = d.fallbackImg;
                  }}
                />
                <div>
                  <h5>{d.name[lang]}</h5>
                  <span>📍 {REGIONS[d.regionKey][lang]} {t.card_region_suffix}</span>
                </div>
              </div>
            ))}
          </div>
          <div id="leafletMap" ref={mapElRef} />
        </div>
      </div>
    </section>
  );
}
