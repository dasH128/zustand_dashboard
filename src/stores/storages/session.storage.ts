import { createJSONStorage, StateStorage } from "zustand/middleware";

const sessionStorageApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name);
    console.log("getItem", data);
    return data;
  },
  setItem: function (name: string, value: string): void | Promise<unknown> {
    console.log("setItem", { name, value });
    sessionStorage.setItem(name, value);
  },
  removeItem: function (name: string): void | Promise<unknown> {
    console.log("removeItem", name);
  },
};

export const customSessionStorage = createJSONStorage(() => sessionStorageApi);
