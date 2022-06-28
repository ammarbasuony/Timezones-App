export const formatDate = (date) => {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getTime = (difference) => {
  const d = new Date();
  const offset = difference;
  const hours = d.getUTCHours() + offset;
  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour = hours % 12 || 12;
  const time = `${hour}:${minutes} ${ampm}`;
  return time;
};

export const getDifference = (difference) => {
  const d = new Date();
  const offset = difference;
  const hours = d.getUTCHours() + offset;
  const hour = hours % 12 || 12;
  const browserHours = d.getHours();
  return hour - browserHours;
};
