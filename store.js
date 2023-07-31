import create from 'zustand'
import { persist } from 'zustand/middleware'
export const useStore = create(persist((set) => ({
  userInformation: null, 
  registration: null,
  Dishes: [],
  Venues: [],
  Menus: [],
  dates:{},
  bookedDates:[],
  addRegistration: (userData) => {
    console.log(userData,"Registration")
    set({ registration: userData })
  },
  
  addUser: (userData) => {
    console.log(userData,"Registration")
    set({ userInformation: userData })
    // set({ userInformation: { userId: userData } })
  },
  addBookedDates: (dishData) => {
    set({ bookedDates: dishData })
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
  // addDate: (dateData, key) => {
  //   set((state) => ({
  //     dates: {
  //       ...state.dates,
  //       [key]: dateData,
  //     },
  //   }));
  // },
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
