import create from 'zustand';

export const useStore = create((set) => ({
  photos: [],
  setPhotos: (data) => set(() => ({ photos: data })),
  deletePhoto: (id) =>
    set((state) => ({ photos: state.photos.filter((photo) => photo.id !== id) })),
  updatePhotos: () =>
    set((state) => ({
      photos: state.photos.map((photo) => ({
        ...photo,
        id: Math.floor(Math.random() * 1000000),
        albumId: Math.floor(Math.random() * 1000000),
      })),
    })),
}));
