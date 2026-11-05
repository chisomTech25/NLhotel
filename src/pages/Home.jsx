import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../utils/storage';
import { initialRooms, initialBookings, initialGuests } from '../data/initialData';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';
import { Bed, Calendar, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/bookingUtils';

export default function Home() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    setRooms(getStorage('rooms', initialRooms));
    setBookings(getStorage('bookings', initialBookings));
    setGuests(getStorage('guests', initialGuests));
  }, []);

  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'Cancelled' ? sum + b.totalCost : sum, 0);

  const featuredRooms = rooms.slice(0, 3);

  return (
    <div>
      <div className="hero">
        <h1>Welcome to NUEL LEE Hotel</h1>
        <p>Experience unparalleled luxury, comfort, and professionalism in the heart of Awka, Anambra State.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/booking')}>Book a Room</button>
          <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }} onClick={() => navigate('/rooms')}>Explore Rooms</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Rooms" value={rooms.length} icon={Bed} color="var(--deep-red)" />
        <StatCard title="Available Rooms" value={availableRooms} icon={Bed} color="green" />
        <StatCard title="Total Bookings" value={bookings.length} icon={Calendar} color="var(--luxury-gold)" />
        <StatCard title="Registered Guests" value={guests.length} icon={Users} color="blue" />
      </div>

      <h2 style={{ marginBottom: '1.5rem', color: 'var(--dark-charcoal)' }}>Featured Accommodations</h2>
      <div className="rooms-grid">
        {featuredRooms.map(room => (
          <RoomCard key={room.id} room={room} onBook={() => navigate('/booking', { state: { roomId: room.id } })} />
        ))}
      </div>

      <div className="card" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--deep-red)', marginBottom: '1rem' }}>Guest Testimonial</h3>
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          "The Presidential Suite was absolutely breathtaking. The staff at NUEL LEE Hotel provided world-class service, making our stay in Awka truly memorable."
        </p>
        <p style={{ marginTop: '1rem', fontWeight: 'bold', color: 'var(--luxury-gold)' }}>— Mrs. Adebayo, Lagos</p>
      </div>
    </div>
  );
}