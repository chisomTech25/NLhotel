export const initialRooms = [
  { id: 1, name: 'Standard Room', type: 'Standard', price: 25000, capacity: 2, status: 'Available', description: 'Comfortable room with a queen bed, ensuite bathroom, and free Wi-Fi.', facilities: ['Wi-Fi', 'TV', 'AC', 'Private Bathroom'], image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Deluxe Room', type: 'Deluxe', price: 40000, capacity: 2, status: 'Available', description: 'Spacious room with a king bed, city view, and mini-fridge.', facilities: ['Wi-Fi', 'TV', 'AC', 'Mini-fridge', 'City View'], image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Executive Suite', type: 'Executive', price: 65000, capacity: 3, status: 'Occupied', description: 'Luxurious suite with separate living area, king bed, and premium amenities.', facilities: ['Wi-Fi', 'Smart TV', 'AC', 'Mini-bar', 'Living Area', 'Bathtub'], image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Presidential Suite', type: 'Presidential', price: 120000, capacity: 4, status: 'Available', description: 'The ultimate luxury experience with panoramic views, jacuzzi, and dedicated concierge.', facilities: ['Wi-Fi', 'Smart TV', 'AC', 'Full Kitchen', 'Jacuzzi', 'Panoramic View'], image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80' }
];

export const initialGuests = [
  { id: 1, name: 'Chisom Okonkwo', email: 'chisom@example.com', phone: '08012345678', address: '123 Zik Ave, Awka' },
  { id: 2, name: 'Emeka Nwosu', email: 'emeka@example.com', phone: '08098765432', address: '45 Unizik Road, Awka' },
  { id: 3, name: 'Amina Yusuf', email: 'amina@example.com', phone: '07011112222', address: '10 Lagos St, Awka' }
];

export const initialBookings = [
  { id: 1, reference: 'NL-2026-001', guestName: 'Chisom Okonkwo', roomId: 3, roomName: 'Executive Suite', checkIn: '2026-10-20', checkOut: '2026-10-25', guests: 2, nights: 5, totalCost: 325000, status: 'Confirmed' },
  { id: 2, reference: 'NL-2026-002', guestName: 'Emeka Nwosu', roomId: 1, roomName: 'Standard Room', checkIn: '2026-10-18', checkOut: '2026-10-19', guests: 1, nights: 1, totalCost: 25000, status: 'Checked In' }
];