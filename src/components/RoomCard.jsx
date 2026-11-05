import { formatCurrency } from '../utils/bookingUtils';
import { Users, Wifi, Tv, Wind } from 'lucide-react';

export default function RoomCard({ room, onBook }) {
  return (
    <div className="card">
      <img src={room.image} alt={room.name} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{room.name}</h3>
        <p className="card-text">{room.description.substring(0, 80)}...</p>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--gray-600)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={16} /> {room.capacity} Guests</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Wifi size={16} /> Wi-Fi</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Wind size={16} /> AC</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="price-tag">{formatCurrency(room.price)} / night</span>
          <span className={`badge badge-${room.status.toLowerCase()}`}>{room.status}</span>
        </div>
        {room.status === 'Available' && (
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => onBook(room)}>
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}