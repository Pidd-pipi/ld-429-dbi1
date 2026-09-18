import { useExhibitionStore } from '../../stores/exhibitionStore';
import { useRoomStore } from '../../stores/roomStore';

export function ExhibitionRouteProgress() {
  const exhibition = useExhibitionStore((state) =>
    state.exhibitions.find((item) => item.id === state.activeExhibitionId),
  );
  const rooms = useRoomStore((state) => state.rooms);
  const selectedRoomId = useRoomStore((state) => state.selectedRoomId);
  const selectRoom = useRoomStore((state) => state.selectRoom);

  if (!exhibition) {
    return (
      <div className="border border-white/30 bg-black/50 px-3 py-2 text-sm text-white">
        自由参观 · 未跟随展览路线
      </div>
    );
  }

  const currentIndex = exhibition.roomIds.indexOf(selectedRoomId);

  return (
    <div className="border border-white/30 bg-black/50 px-3 py-2 text-sm text-white">
      <p className="text-[10px] uppercase tracking-[0.24em] text-white/60">当前展览</p>
      <p className="mt-1 font-semibold">{exhibition.title}</p>
      <p className="mt-1 text-xs text-white/80">
        {currentIndex >= 0
          ? `路线进度：第 ${currentIndex + 1} 厅 / 共 ${exhibition.roomIds.length} 厅`
          : `路线进度：当前展厅不在路线内（共 ${exhibition.roomIds.length} 厅）`}
      </p>
      <div className="mt-2 flex gap-1">
        {exhibition.roomIds.map((roomId, index) => {
          const room = rooms.find((item) => item.id === roomId);
          const isCurrent = roomId === selectedRoomId;
          return (
            <button
              key={roomId}
              type="button"
              disabled={!room}
              onClick={() => selectRoom(roomId)}
              title={room ? room.name : '展厅不可用'}
              className={`focus-ring h-6 min-w-6 border px-1 text-xs ${
                isCurrent ? 'border-white bg-white text-black' : 'border-white/40 text-white/80 hover:bg-white/10'
              } ${room ? '' : 'cursor-not-allowed opacity-40'}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
