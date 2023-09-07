// import create from "zustand";
// import { persist } from "zustand/middleware";
// export const useStore = create(
//   persist(
//     (set) => ({
//       userInformation: null,
//       registration: null,
//       Dishes: [],
//       Venues: [],
//       Menus: [],
//       dates: {},
//       lunchDinner: {},
//       // setLunchDinner: (data) => set((state) => ({ lunchDinner: data })),
//       bookedDates: [],
//       addRegistration: (userData) => {
//         console.log(userData, "Registration");
//         set({ registration: userData });
//       },

//       addUser: (userData) => {
//         console.log(userData, "Registration");
//         set({ userInformation: userData });
//         // set({ userInformation: { userId: userData } })
//       },
//       addBookedDates: (dishData) => {
//         set({ bookedDates: dishData });
//       },
//       addDishes: (dishData) => {
//         set({ Dishes: dishData });
//       },
//       addVenues: (venueData) => {
//         set({ Venues: venueData });
//       },
//       addMenus: (menuData) => {
//         console.log(menuData, "menuData444");
//         set({ Menus: menuData });
//       },
//       addDate: (dateData, key) => {
//         set((state) => ({
//           dates: {
//             ...state.dates,
//             [key]: dateData,
//           },
//         }));
//       },
//       addDateKey: (key, lunchType, data) => {
//         set((state) => ({
//          lunchDinner: {
//             ...state.lunchDinner,
//             [key]: {
//               ...state.lunchDinner[key],
//               [lunchType]:data
//             },
//           },
//         }));
//       },
//     }),
//     {
//       name: "userStore",
//       getStorage: () => localStorage,
//     }
//   )
// );

// import create from "zustand";
// import { persist } from "zustand/middleware";
// export const useStore = create(
//   persist(
//     (set) => ({
//       userInformation: null,
//       registration: null,
//       Dishes: [],
//       Venues: [],
//       Menus: [],
//       dates: {},
//       lunchDinner: {},
//       // setLunchDinner: (data) => set((state) => ({ lunchDinner: data })),
//       bookedDates: [],
//       addRegistration: (userData) => {
//         console.log(userData, "Registration");
//         set({ registration: userData });
//       },

//       addUser: (userData) => {
//         console.log(userData, "Registration");
//         set({ userInformation: userData });
//         // set({ userInformation: { userId: userData } })
//       },
//       addBookedDates: (dishData) => {
//         set({ bookedDates: dishData });
//       },
//       addDishes: (dishData) => {
//         set({ Dishes: dishData });
//       },
//       addVenues: (venueData) => {
//         set({ Venues: venueData });
//       },
//       addMenus: (menuData) => {
//         set({ Menus: menuData });
//       },
//       addDate: (dateData) => {
//         set({ dates: dateData });
//       },
//       addDateKey: (key, lunchType, data) => {
//         set((state) => ({
//           lunchDinner: {
//             ...state.lunchDinner,
//             [key]: {
//               ...state.lunchDinner[key],
//               [lunchType]: data,
//             },
//           },
//         }));
//       },

//       getDates: async () => {
//         try {
//           const docRef = doc(db, "bookDate", userInformation.userId);
//           console.log(userInformation.userId ,"abcded");
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             set((state) => ({
//               lunchDinner: data,
//             }));
//           } else {
//             console.log("No such document!");
//           }
//         } catch (error) {
//           console.error("Error fetching document:", error);
//         }
//       },
//     }),
//     {
//       name: "userStore",
//       getStorage: () => localStorage,
//     }
//   )
// );

import create from "zustand";
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
      hallInformation: {},
      hallIndex: null,
      userInformation: {},
      addUserInformation: (data) => {
        set({ userInformation: data });
      },
      addHallInformation: (data, item) => {
        set({ hallInformation: data, hallIndex: item });
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
      addDates:(dates)=>{
        set({lunchDinner:dates?.dates})
      },
      deleteDates:() => {
        set((state) => ({
          lunchDinner: {
          },
        }));
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
    }),
    {
      name: "userStore",
      getStorage: () => localStorage,
    }
  )
);
