export const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 0;
};

export const calculateTotal = (pricePerNight, nights) => pricePerNight * nights;

export const generateReference = () => {
  return 'NL-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
};

export const formatCurrency = (amount) => {
  return '₦' + amount.toLocaleString();
};