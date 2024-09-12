import { defineStore } from 'pinia';

export const useStore = defineStore({
  persist: true,
  id: 'storeIndex',
  state: () => ({
    isDarkMode: 'light',
  }),
  actions: {
    setDarkMode() {
      this.isDarkMode = this.isDarkMode === 'dark' ? 'light' : 'dark';
    }
  },
  getters: {
    hasDarkMode() {
      return this.isDarkMode;
    }
  },
});
export default useStore;