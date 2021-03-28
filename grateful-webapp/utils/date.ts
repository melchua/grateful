// date utils
// eslint-disable-next-line
import { Temporal } from "proposal-temporal/lib/index.mjs";

const monthLookup = {
  month_names: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  month_names_short: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

export const getShortMonthString = (date: any) => monthLookup.month_names_short[date.month - 1];

export const getLongMonthString = (date: any) => monthLookup.month_names[date.month - 1];

// output: March 21, 2021
export const getHumanDateString = (date: any) => `${getLongMonthString(date)} ${date.day}, ${date.year}`;

export const currentDateString = () => {
  const currentDate = Temporal.now.plainDateISO(); // Gets the current date
  return getHumanDateString(currentDate);
};

export const convertLegacyToTemporal = (date: Date) => {
  const convertPlainDateTime = Temporal.PlainDate.from(date);
  return convertPlainDateTime;
};
