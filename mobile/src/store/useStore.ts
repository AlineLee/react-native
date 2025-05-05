import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type Store = {
  registered: string[];
  registerItems: (items: string[]) => void;
  isItemRegistered: (id: string) => boolean;
};

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      registered: [],
      registerItems: items => {
        const uniqueItems = Array.from(
          new Set([...get().registered, ...items]),
        );

        set({registered: uniqueItems});
      },
      isItemRegistered: id => get().registered.includes(id),
    }),
    {
      name: 'store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStore;
