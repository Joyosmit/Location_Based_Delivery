import { create } from 'zustand';

interface ChoiceDetails {
    maxDistance: number;
    setMaxDistance: (distance: number) => void;
}

export const useStore = create<ChoiceDetails>((set) => ({
    maxDistance: 5,
    setMaxDistance: (distance: number) => set({maxDistance: distance})
}))