import create from 'zustand'
import { persist } from 'zustand/middleware'
export const useStore = create(persist((set) => ({
  userInformation: null, 
  Dishes: [],
  Venues: [],
  Menus: [],
  dates:{
//     ewqe: [
//       new Date(),
//       new Date(),
//       new Date(),
//       new Date(),
//       new Date(),
//       new Date(),
//   ],
//   Marquee: [
//     new Date(),
//     new Date(),
//     new Date(),
//     new Date(),
//     new Date(),
//     new Date(),
// ],
  },
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
  },

  addDate: (dateData, key) => {
    set((state) => ({
      dates: {
        ...state.dates,
        [key]: dateData,
      },
    }));
  },
  addDateKey: (key)=>{
    set({ dates: {
      ...state.dates,
      [key]: []
    } })
  },
}), {
  name: 'userStore',
  getStorage: () => localStorage,
  
}))