import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { initialBookings } from '../data/initialData';
import { formatCurrency } from '../utils/bookingUtils';
import { Trash2, Eye } from 'lucide-react';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setBookings(getStorage('bookings', initialBookings));
  }, []);

  const filtered = bookings.filter(b => {
    const matchesSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) || b.reference.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    setStorage('bookings', updated);
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      setStorage('bookings', updated);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Booking Management</h2>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input className="form-control" placeholder="Search by name or reference..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: '300px' }} />
        <select className="form-control" style={{ maxWidth: '200px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Checked In">Checked In</option>
          <option value="Checked Out">Checked Out</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td><strong>{b.reference}</strong></td>
                <td>{b.guestName}</td>
                <td>{b.roomName}</td>
                <td>{b.checkIn} to {b.checkOut} <br/><small>({b.nights} nights)</small></td>
                <td>{formatCurrency(b.totalCost)}</td>
                <td><span className={`badge badge-${b.status.toLowerCase().replace(' ', '-')}`}>{b.status}</span></td>
                <td>
                  <select className="form-control btn-sm" value={b.status} onChange={e => updateStatus(b.id, e.target.value)} style={{ width: 'auto', marginBottom: '0.5rem' }}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Checked In">Checked In</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteBooking(b.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ padding: '1rem', textAlign: 'center' }}>No bookings found.</p>}
      </div>
    </div>
  );
}