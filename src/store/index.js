import create from 'zustand';

export const useStore = create((set) => ({
  photos: 0,
  setPhotos: (data) => set(() => ({ photos: data })),
  deletePhoto: (id) =>
    set((state) => ({ photos: state.photos.filter((photo) => photo.id !== id) })),
}));
