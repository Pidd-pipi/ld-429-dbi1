import { ExhibitionCard } from '../components/common/ExhibitionCard';
import { EmptyState } from '../components/common/EmptyState';
import { useExhibitionEntry } from '../hooks/useExhibitionEntry';
import { useExhibitionStore } from '../stores/exhibitionStore';

export function ExhibitionList() {
  const exhibitions = useExhibitionStore((state) => state.exhibitions);
  const { enterExhibition, notice, dismissNotice } = useExhibitionEntry();

  if (exhibitions.length === 0) {
    return <EmptyState title="暂无展览" description="创建展厅和作品后，展览会在这里展示。" />;
  }
  return (
    <div>
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-accent)]">Exhibitions</p>
        <h1 className="mt-3 text-5xl font-semibold">展览列表</h1>
      </div>
      {notice ? (
        <div role="status" className="mb-6 flex items-center justify-between gap-4 border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm">
          <p>{notice}</p>
          <button type="button" className="focus-ring border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.2em]" onClick={dismissNotice}>
            知道了
          </button>
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-2">
        {exhibitions.map((exhibition) => (
          <ExhibitionCard key={exhibition.id} exhibition={exhibition} onEnter={enterExhibition} />
        ))}
      </div>
    </div>
  );
}
