import { initialRooms, initialGuests, initialBookings } from '../data/initialData';

export const getStorage = (key, initialData) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : initialData;
};

export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};