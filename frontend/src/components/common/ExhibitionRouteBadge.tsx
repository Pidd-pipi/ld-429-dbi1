import { useExhibitionRoute } from '../../hooks/useExhibitionRoute';

export function ExhibitionRouteBadge() {
  const { exhibition, routeRooms, currentRoomIndex } = useExhibitionRoute();
  if (!exhibition) return null;

  const onRoute = currentRoomIndex >= 0;
  const progress = onRoute && routeRooms.length > 0 ? ((currentRoomIndex + 1) / routeRooms.length) * 100 : 0;

  return (
    <div className="pointer-events-none absolute right-4 top-4 w-64 border border-white/30 bg-black/50 px-3 py-2 text-sm text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">当前展览</p>
      <p className="mt-1 font-semibold">{exhibition.title}</p>
      {routeRooms.length > 0 ? (
        <>
          <p className="mt-2 text-xs">
            {onRoute ? `路线进度 ${currentRoomIndex + 1} / ${routeRooms.length} · ${routeRooms[currentRoomIndex].name}` : '当前展厅不在本展路线中'}
          </p>
          <div className="mt-2 h-1 w-full bg-white/20">
            <div className="h-1 bg-[var(--color-accent)]" style={{ width: `${progress}%` }} />
          </div>
          <ol className="mt-2 space-y-1 text-xs text-white/70">
            {routeRooms.map((room, index) => (
              <li key={room.id} className={index === currentRoomIndex ? 'font-semibold text-white' : undefined}>
                {index + 1}. {room.name}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="mt-2 text-xs">本展暂无可用展厅</p>
      )}
    </div>
  );
}
