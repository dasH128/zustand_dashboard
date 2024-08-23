import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl =
  "https://stotppub-default-rtdb.europe-west1.firebasedatabase.app/zustand";

const sessionStorageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const res = await fetch(`${firebaseUrl}/${name}.json`);
      const data = await res.json();
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      console.error(`error => ${error}`);
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<unknown> {
    const res = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    });
    const data = await res.json();
    console.log("setItem", data);
    return;
  },
  removeItem: function (name: string): void | Promise<unknown> {
    console.log("removeItem", name);
  },
};

export const customFirebaseStorage = createJSONStorage(() => sessionStorageApi);
