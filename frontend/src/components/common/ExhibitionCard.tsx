import type { Exhibition } from '../../types';
import { ExhibitionStatus } from '../../types/enums';
import { StatusBadge } from './StatusBadge';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onEnter: (exhibition: Exhibition) => void;
}

export function ExhibitionCard({ exhibition, onEnter }: ExhibitionCardProps) {
  const visitable = exhibition.status === ExhibitionStatus.Active;
  return (
    <article className="group border border-[var(--color-line)] bg-[var(--color-panel)]">
      <button type="button" onClick={() => onEnter(exhibition)} className="focus-ring block w-full text-left">
        <img src={exhibition.coverUrl} alt={exhibition.title} className="aspect-[16/9] w-full object-cover grayscale-[20%] transition group-hover:grayscale-0" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--color-muted)]">策展人：{exhibition.curator}</p>
            <StatusBadge status={exhibition.status} />
          </div>
          <h3 className="mt-4 text-3xl font-semibold">{exhibition.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{exhibition.description}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {visitable ? '进入漫游 →' : '查看开放状态'}
          </p>
        </div>
      </button>
    </article>
  );
}
