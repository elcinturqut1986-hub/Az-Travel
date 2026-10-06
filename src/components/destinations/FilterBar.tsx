import { useLanguage } from '../../i18n/LanguageContext';
import { REGIONS, REGION_KEYS, TAGS, TAG_FILTER_KEYS } from '../../data/dictionaries';
import type { RegionKey, TagKey } from '../../types';

export type FilterValue = 'all' | RegionKey | TagKey;

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function FilterBar({ value, onChange }: Props) {
  const { t, lang } = useLanguage();

  const options: { key: FilterValue; label: string }[] = [
    { key: 'all', label: t.all_option },
    ...REGION_KEYS.map((k) => ({ key: k as FilterValue, label: REGIONS[k][lang] })),
    ...TAG_FILTER_KEYS.map((k) => ({ key: k as FilterValue, label: TAGS[k][lang] })),
  ];

  return (
    <div className="filter-bar reveal show">
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          className={`filter-chip${opt.key === value ? ' active' : ''}`}
          onClick={() => onChange(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
