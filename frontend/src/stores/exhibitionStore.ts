import { create } from 'zustand';
import type { Exhibition } from '../types';
import { ExhibitionStatus } from '../types/enums';
import { exhibitions } from '../api/mockGallery';

interface ExhibitionState {
  exhibitions: Exhibition[];
  activeExhibitionId: string;
  notice: string | null;
  setActiveExhibition: (id: string) => void;
  setNotice: (message: string | null) => void;
}

export const useExhibitionStore = create<ExhibitionState>((set) => ({
  exhibitions,
  activeExhibitionId: exhibitions.find((item) => item.status === ExhibitionStatus.Active)?.id ?? '',
  notice: null,
  setActiveExhibition: (id) => set({ activeExhibitionId: id }),
  setNotice: (message) => set({ notice: message }),
}));
