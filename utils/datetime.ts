export const formatDatetime = (datetime: string): string => {
  const date = new Date(datetime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const formatRange = (
  startDatetime: string,
  endDatetime: string
): string => {
  const startDate = new Date(startDatetime);
  const endDate = new Date(endDatetime);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = startDate.toLocaleString('default', { month: 'long' });
  const endMonth = endDate.toLocaleString('default', { month: 'long' });

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  if (startYear !== endYear) {
    return `${startMonth} ${startDay}${getOrdinalSuffix(
      startDay
    )}, ${startYear} - ${endMonth} ${endDay}${getOrdinalSuffix(
      endDay
    )}, ${endYear}`;
  } else if (startMonth !== endMonth) {
    return `${startMonth} ${startDay}${getOrdinalSuffix(
      startDay
    )} - ${endMonth} ${endDay}${getOrdinalSuffix(endDay)}`;
  } else {
    return `${startMonth} ${startDay}${getOrdinalSuffix(
      startDay
    )} - ${endDay}${getOrdinalSuffix(endDay)}`;
  }
};

export const calculateDaysLeftUntil7Days = (datetime: string): number => {
  const date = new Date(datetime);
  const futureDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  return Math.ceil(
    (futureDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
};
