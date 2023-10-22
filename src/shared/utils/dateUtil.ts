import moment from "moment";

export const convert = (date: Date): string => {
  return moment(date.toString().slice(0, -5)).format(
    "ddd Do MMMM yyyy, h:mm:ss a"
  );
};
