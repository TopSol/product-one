// import create from 'zustand'
// import { persist } from 'zustand/middleware'

// export const useStore = create(persist((set) => ({
//   userInformation: [],
//   addUser: (userData) => set((state) => ({ userInformation: [state.userInformation, {userId:userData}] })),

//   // addUser: (userData) => set((state) => ({ userInformation: [...state.userInformation, userData] })),
// }), {
//   name: 'userStore', // Specify a name for the persisted store
//   getStorage: () => localStorage, // Specify the storage mechanism (localStorage in this example)
// }))


import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist((set) => ({
  userInformation: null, 
  addUser: (userData) => set({ userInformation: { userId: userData } }),
}), {
  name: 'userStore',
  getStorage: () => localStorage,
  
}))