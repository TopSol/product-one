export const getFormatDates = (arr = []) => {
    const format = arr.map((v, i) => {
      console.log("asdasdas", v);
      return v?.toDate() || v
    });
    return format;
  };
  
