import { useLiveClock } from '../../hooks/useLiveClock';
import { useLanguage } from '../../i18n/LanguageContext';

export function LiveClock() {
  const { lang, t } = useLanguage();
  const clock = useLiveClock(lang, t);

  return (
    <div className="live-clock">
      <div className="lc-greeting">
        <span className="lc-dot" />
        <span>{clock.greeting}</span>
      </div>
      <div className="lc-time">
        {clock.hours}
        <span className="blink">:</span>
        {clock.minutes}
        <span className="blink">:</span>
        {clock.seconds}
      </div>
      <div className="lc-divider" />
      <div className="lc-weekday">{clock.weekday}</div>
      <div className="lc-date">{clock.date}</div>
    </div>
  );
}
