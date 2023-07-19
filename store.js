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
  Dishes: [],
  Venues: [],
  Menus: [],
  addUser: (userData) => {
    console.log(userData,"Registration")
    set({ userInformation: { userId: userData } })
  },
  addDishes: (dishData) => {
    set({ Dishes: dishData })
  },
  addVenues: (venueData) => {
    set({ Venues: venueData })
  },
  addMenus: (menuData) => {
    console.log(menuData,"menuData444")
    set({ Menus: menuData })
  }
  // addDishes: (dishData) => {set((state) => ({ Dishes: [...state.Dishes, dishData] }))},
}), {
  name: 'userStore',
  getStorage: () => localStorage,
  
}))