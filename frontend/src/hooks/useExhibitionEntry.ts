import { useCallback } from 'react';
import { ExhibitionStatus } from '../types/enums';
import { useExhibitionStore } from '../stores/exhibitionStore';
import { useRoomStore } from '../stores/roomStore';

const statusText: Record<ExhibitionStatus, string> = {
  [ExhibitionStatus.Active]: '开放中',
  [ExhibitionStatus.Upcoming]: '即将开放',
  [ExhibitionStatus.Past]: '已结束',
};

/**
 * 尝试进入一场展览：
 * - 未开放（Upcoming/Past）：仅提示开放状态，不进入漫游、不替换当前展览；
 * - 缺少可用展厅：保留原场景并说明原因；
 * - 可参观：激活该展览并按其展厅顺序选中首个展厅。
 *
 * 返回是否允许导航到画廊漫游。
 */
export const useExhibitionEntry = () => {
  const exhibitions = useExhibitionStore((state) => state.exhibitions);
  const setActiveExhibition = useExhibitionStore((state) => state.setActiveExhibition);
  const setNotice = useExhibitionStore((state) => state.setNotice);
  const rooms = useRoomStore((state) => state.rooms);
  const selectRoom = useRoomStore((state) => state.selectRoom);

  return useCallback(
    (exhibitionId: string): boolean => {
      const exhibition = exhibitions.find((item) => item.id === exhibitionId);
      if (!exhibition) {
        setNotice('未找到该展览，已保留当前场景。');
        return false;
      }
      if (exhibition.status !== ExhibitionStatus.Active) {
        setNotice(`「${exhibition.title}」暂未开放参观（${statusText[exhibition.status]}），仅可查看开放状态。`);
        return false;
      }
      const firstRoomId = exhibition.roomIds.find((roomId) => rooms.some((room) => room.id === roomId));
      if (!firstRoomId) {
        setNotice(`「${exhibition.title}」暂无可用展厅，已保留当前场景。`);
        return false;
      }
      setActiveExhibition(exhibition.id);
      selectRoom(firstRoomId);
      setNotice(null);
      return true;
    },
    [exhibitions, rooms, selectRoom, setActiveExhibition, setNotice],
  );
};
