import { useMemo } from 'react';
import type { Exhibition, GalleryRoom } from '../types';
import { useExhibitionStore } from '../stores/exhibitionStore';
import { useRoomStore } from '../stores/roomStore';

interface ExhibitionRoute {
  exhibition: Exhibition | null;
  routeRooms: GalleryRoom[];
  currentRoomIndex: number;
}

export const useExhibitionRoute = (): ExhibitionRoute => {
  const exhibitions = useExhibitionStore((state) => state.exhibitions);
  const activeExhibitionId = useExhibitionStore((state) => state.activeExhibitionId);
  const rooms = useRoomStore((state) => state.rooms);
  const selectedRoomId = useRoomStore((state) => state.selectedRoomId);

  return useMemo(() => {
    const exhibition = exhibitions.find((item) => item.id === activeExhibitionId) ?? null;
    if (!exhibition) {
      return { exhibition: null, routeRooms: [], currentRoomIndex: -1 };
    }
    const routeRooms = exhibition.roomIds
      .map((roomId) => rooms.find((room) => room.id === roomId))
      .filter((room): room is GalleryRoom => Boolean(room));
    return {
      exhibition,
      routeRooms,
      currentRoomIndex: routeRooms.findIndex((room) => room.id === selectedRoomId),
    };
  }, [exhibitions, activeExhibitionId, rooms, selectedRoomId]);
};
