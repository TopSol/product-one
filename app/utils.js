import { Timestamp } from 'firebase/firestore';

export const getFormatDates = (arr = []) => {
  const format = arr.map((v, i) => {
    if (typeof v === 'object' && v?.seconds !== undefined) {
      const timestampWithNanoseconds = new Timestamp(v.seconds, v.nanoseconds || 0);
      return timestampWithNanoseconds.toDate();
    } else if (v instanceof Date) {
      return v;
    } else {
      return v;
    }
  });
  return format;
};