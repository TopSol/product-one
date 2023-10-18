import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useStore = create(
  persist(
    (set) => ({
      userInformation: null,
      registration: null,
      Dishes: [],
      Venues: [],
      Menus: [],
      dates: {},
      lunchDinner: {},
      bookedDates: [],
      marqueeVenueNames: [],
      marqueeVenueDates: [],
      marqueeData: {},
      hallInformation: {},
      hallIndex: null,
      userInformation: {},
      marqueeImage: "",
      addUserInformation: (data) => {
        set({ userInformation: data });
      },
      addHallInformation: (data) => {
        set({ hallInformation: data });
      },
      addMarqueeVenueNames: (data) => {
        set({ marqueeVenueNames: data });
      },
      addMarqueeVenueDates: (data) => {
        set({ marqueeVenueDates: data });
      },

      addRegistration: (userData) => {
        set({ registration: userData });
      },

      addUser: (userData) => {
        set({ userInformation: userData });
      },
      addBookedDates: (dishData) => {
        set({ bookedDates: dishData });
      },
      addDishes: (dishData) => {
        set({ Dishes: dishData });
      },
      addVenues: (venueData) => {
        set({ Venues: venueData });
      },
      addMenus: (menuData) => {
        set({ Menus: menuData });
      },
      addDate: (dateData) => {
        set({ dates: dateData });
      },
      addMarqueeData: (item) => {
        set({ marqueeData: item });
      },
      addDateKey: (key, lunchType, data) => {
        set((state) => ({
          lunchDinner: {
            ...state.lunchDinner,
            [key]: {
              ...state.lunchDinner[key],
              [lunchType]: data,
            },
          },
        }));
      },
      addDates: (dates) => {
        set({ lunchDinner: dates?.dates });
      },
      deleteDates: () => {
        set((state) => ({
          lunchDinner: {},
        }));
      },
      deletAdminMarqueeData: () => {
        set({
          Dishes: [],
          Venues: [],
          Menus: [],
        });
      },
      getDates: async () => {
        try {
          const docRef = doc(db, "bookDate", userInformation.userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            set((state) => ({
              lunchDinner: data,
            }));
          } else {
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      },
      getMarqueeImage: (image) => {
        set({ marqueeImage: image });
      },
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  )
);
