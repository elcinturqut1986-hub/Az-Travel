import { useScrollProgress } from '../../hooks/useScrollProgress';

export function BackToTop() {
  const { showBackToTop } = useScrollProgress();
  return (
    <button
      type="button"
      className={`to-top${showBackToTop ? ' show' : ''}`}
      aria-label="Yuxarı qayıt"
      title="Yuxarı qayıt"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
