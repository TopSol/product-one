// export const getFormatDates = (arr = []) => {
//     const format = arr.map((v, i) => {
//       console.log("asdasdas", v);
//       return v?.toDate() || v
//     });
//     return format;
//   };
  
import { Timestamp } from 'firebase/firestore'; // Import the appropriate package for Firestore Timestamp

export const getFormatDates = (arr = []) => {
  const format = arr.map((v, i) => {
    if (typeof v === 'object' && v.seconds !== undefined) {
      // Convert timestamp with seconds to Firestore Timestamp
      const timestampWithNanoseconds = new Timestamp(v.seconds, v.nanoseconds || 0);
      return timestampWithNanoseconds.toDate();
    } else if (v instanceof Date) {
      // Do nothing if v is already a Date object
      return v;
    } else {
      // Treat other cases as-is
      return v;
    }
  });
  return format;
};