import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getStorage, setStorage } from '../utils/storage';
import { initialRooms, initialBookings } from '../data/initialData';
import { calculateNights, calculateTotal, generateReference, formatCurrency } from '../utils/bookingUtils';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    guestName: '', email: '', phone: '', roomId: location.state?.roomId || '', checkIn: '', checkOut: '', guests: 1
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setRooms(getStorage('rooms', initialRooms).filter(r => r.status === 'Available'));
  }, []);

  const selectedRoom = rooms.find(r => r.id === parseInt(formData.roomId));
  const nights = formData.checkIn && formData.checkOut ? calculateNights(formData.checkIn, formData.checkOut) : 0;
  const totalCost = selectedRoom ? calculateTotal(selectedRoom.price, nights) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.guestName || !formData.email || !formData.roomId || !formData.checkIn || !formData.checkOut) {
      setMessage('Please fill in all required fields.');
      return;
    }
    if (nights <= 0) {
      setMessage('Check-out date must be after check-in date.');
      return;
    }

    const newBooking = {
      id: Date.now(),
      reference: generateReference(),
      guestName: formData.guestName,
      roomId: parseInt(formData.roomId),
      roomName: selectedRoom.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: parseInt(formData.guests),
      nights,
      totalCost,
      status: 'Pending'
    };

    const bookings = getStorage('bookings', initialBookings);
    setStorage('bookings', [...bookings, newBooking]);
    
    setMessage(`Booking successful! Reference: ${newBooking.reference}. (Demo: No real payment processed)`);
    setTimeout(() => navigate('/bookings'), 2000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Book a Room</h2>
      {message && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1rem', background: message.includes('successful') ? '#dcfce7' : '#fee2e2', color: message.includes('successful') ? '#166534' : '#991b1b' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-control" value={formData.guestName} onChange={e => setFormData({...formData, guestName: e.target.value})} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Select Room *</label>
          <select className="form-control" value={formData.roomId} onChange={e => setFormData({...formData, roomId: e.target.value})} required>
            <option value="">Choose a room...</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.name} - {formatCurrency(r.price)}/night</option>)}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Check-in Date *</label>
            <input type="date" className="form-control" value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Check-out Date *</label>
            <input type="date" className="form-control" value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Number of Guests</label>
          <input type="number" min="1" className="form-control" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} required />
        </div>
        
        {selectedRoom && nights > 0 && (
          <div className="card" style={{ background: 'var(--light-bg)', padding: '1rem', marginBottom: '1rem' }}>
            <p><strong>Room:</strong> {selectedRoom.name}</p>
            <p><strong>Price per night:</strong> {formatCurrency(selectedRoom.price)}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <p style={{ fontSize: '1.2rem', color: 'var(--deep-red)', fontWeight: 'bold' }}><strong>Total Cost:</strong> {formatCurrency(totalCost)}</p>
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
      </form>
    </div>
  );
}