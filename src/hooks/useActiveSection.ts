import { useEffect, useState } from 'react';

/** Returns the id of the section currently under the header line, for nav-link highlighting. */
export function useActiveSection(sectionIds: string[], headerOffset = 120): string {
  const [active, setActive] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    function onScroll() {
      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - headerOffset <= 0) current = id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(','), headerOffset]);

  return active;
}
