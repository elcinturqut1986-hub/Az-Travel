import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { destinations } from '../../data/destinations';
import { REGIONS, TAGS } from '../../data/dictionaries';
import { getTravelTime } from '../../utils/format';
import { useBooking } from '../../context/BookingContext';
import { useDestinationReviews, type DestinationReview } from '../../context/DestinationReviewsContext';
import { useToast } from '../common/ToastProvider';
import type { Destination } from '../../types';

interface ReviewFormProps {
  destination: Destination;
  reviews: DestinationReview[];
  onSubmit: (review: Pick<DestinationReview, 'name' | 'rating' | 'comment'>) => void;
}

function ReviewForm({ destination, reviews, onSubmit }: ReviewFormProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    const numericRating = Number(rating);
    if (!trimmedName || !trimmedComment || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      showToast(t.review_invalid);
      return;
    }

    onSubmit({ name: trimmedName, rating: numericRating, comment: trimmedComment });
    setName('');
    setRating('');
    setComment('');
    showToast(t.review_success);
  }

  return (
    <section className="destination-reviews">
      <h3>{t.review_list_title} ({reviews.length})</h3>
      {reviews.length === 0 ? (
        <p className="review-empty">{t.review_empty}</p>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <article className="review-item" key={review.id}>
              <div className="review-item-head">
                <strong>{review.name}</strong>
                <span className="review-stars" aria-label={`${review.rating} / 5`}>{'★'.repeat(review.rating)}</span>
              </div>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      )}

      <form className="review-form" onSubmit={handleSubmit}>
        <h3>{t.review_title}</h3>
        <div className="review-form-row">
          <div className="form-group">
            <label htmlFor={`review-name-${destination.id}`}>{t.review_name}</label>
            <input
              id={`review-name-${destination.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={`review-rating-${destination.id}`}>{t.review_rating}</label>
            <select
              id={`review-rating-${destination.id}`}
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
            >
              <option value="">{t.review_rating_placeholder}</option>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>{'★'.repeat(value)} ({value}/5)</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={`review-comment-${destination.id}`}>{t.review_comment}</label>
          <textarea
            id={`review-comment-${destination.id}`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={3}
            maxLength={1000}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{t.review_submit}</button>
      </form>
    </section>
  );
}

export function DestinationModal() {
  const { t, lang } = useLanguage();
  const { openDestinationId, closeDestinationModal, selectDestination } = useBooking();
  const { reviews, addReview, getSummary } = useDestinationReviews();
  const destination = destinations.find((d) => d.id === openDestinationId) ?? null;
  const destinationReviews = destination ? reviews.filter((review) => review.destinationId === destination.id) : [];
  const reviewSummary = destination ? getSummary(destination) : null;

  useEffect(() => {
    document.body.style.overflow = destination ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [destination]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeDestinationModal();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDestinationModal]);

  if (!destination) return null;

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeDestinationModal();
      }}
    >
      <div className="modal">
        <div className="modal-img">
          <img
            src={destination.img}
            alt={destination.name[lang]}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = destination.fallbackImg;
            }}
          />
          <button className="modal-close" onClick={closeDestinationModal} aria-label="Bağla">✕</button>
        </div>
        <div className="modal-body">
          <h2>{destination.name[lang]}</h2>
          <div className="modal-meta">
            <span>📍 {REGIONS[destination.regionKey][lang]} {t.card_region_suffix}</span>
            <span>⭐ {reviewSummary?.rating} ({reviewSummary?.count} {t.card_reviews})</span>
            <span>🕒 {destination.duration[lang]}</span>
            <span>🚗 {t.card_arrival}: {getTravelTime(destination.cityKey, lang)}</span>
          </div>
          <p>{destination.desc[lang]}</p>
          <div className="modal-tags">
            {destination.tags.map((tag) => (
              <span key={tag}>{TAGS[tag][lang]}</span>
            ))}
          </div>
          <ReviewForm
            key={destination.id}
            destination={destination}
            reviews={destinationReviews}
            onSubmit={(review) => addReview(destination.id, review)}
          />
          <div className="modal-foot">
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>
              {destination.price}₼ / {t.card_day}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                selectDestination(destination.id);
                closeDestinationModal();
                document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.modal_book}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
