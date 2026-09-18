import { useNavigate } from 'react-router-dom';
import type { Exhibition } from '../../types';
import { ExhibitionStatus } from '../../types/enums';
import { useExhibitionEntry } from '../../hooks/useExhibitionEntry';
import { StatusBadge } from './StatusBadge';

export function ExhibitionCard({ exhibition }: { exhibition: Exhibition }) {
  const navigate = useNavigate();
  const enterExhibition = useExhibitionEntry();
  const visitable = exhibition.status === ExhibitionStatus.Active;

  const handleEnter = () => {
    if (enterExhibition(exhibition.id)) {
      navigate('/gallery');
    }
  };

  return (
    <article className={`group border border-[var(--color-line)] bg-[var(--color-panel)] ${visitable ? '' : 'opacity-80'}`}>
      <button type="button" onClick={handleEnter} className="focus-ring block w-full text-left">
        <img
          src={exhibition.coverUrl}
          alt={exhibition.title}
          className={`aspect-[16/9] w-full object-cover transition ${
            visitable ? 'grayscale-[20%] group-hover:grayscale-0' : 'grayscale-[70%]'
          }`}
        />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">策展人：{exhibition.curator}</p>
            <StatusBadge status={exhibition.status} />
          </div>
          <h3 className="mt-4 text-3xl font-semibold">{exhibition.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{exhibition.description}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {visitable ? '进入首个展厅 →' : '暂未开放参观'}
          </p>
        </div>
      </button>
    </article>
  );
}
