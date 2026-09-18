import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Exhibition, GalleryRoom } from '../types';
import { ExhibitionStatus } from '../types/enums';
import { useExhibitionStore } from '../stores/exhibitionStore';
import { useRoomStore } from '../stores/roomStore';

const statusHints: Record<ExhibitionStatus, string> = {
  [ExhibitionStatus.Active]: '',
  [ExhibitionStatus.Upcoming]: '尚未开放，敬请期待',
  [ExhibitionStatus.Past]: '已结束，仅保留展览档案',
};

export const useExhibitionEntry = () => {
  const navigate = useNavigate();
  const rooms = useRoomStore((state) => state.rooms);
  const selectRoom = useRoomStore((state) => state.selectRoom);
  const setActiveExhibition = useExhibitionStore((state) => state.setActiveExhibition);
  const [notice, setNotice] = useState<string | null>(null);

  const enterExhibition = useCallback(
    (exhibition: Exhibition) => {
      if (exhibition.status !== ExhibitionStatus.Active) {
        setNotice(`「${exhibition.title}」${statusHints[exhibition.status]}，无法进入漫游，当前展览保持不变。`);
        return;
      }
      const firstRoom = exhibition.roomIds
        .map((roomId) => rooms.find((room) => room.id === roomId))
        .find((room): room is GalleryRoom => Boolean(room));
      if (!firstRoom) {
        setNotice(`「${exhibition.title}」暂无可用展厅，已保留当前场景。`);
        return;
      }
      setNotice(null);
      setActiveExhibition(exhibition.id);
      selectRoom(firstRoom.id);
      navigate('/gallery');
    },
    [navigate, rooms, selectRoom, setActiveExhibition],
  );

  return { enterExhibition, notice, dismissNotice: () => setNotice(null) };
};
