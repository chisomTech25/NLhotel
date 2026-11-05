import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { initialRooms } from '../data/initialData';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/bookingUtils';

export default function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'Standard', price: '', capacity: 1, status: 'Available', description: '', facilities: '', image: '' });

  useEffect(() => {
    setRooms(getStorage('rooms', initialRooms));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      ...formData,
      price: parseInt(formData.price),
      capacity: parseInt(formData.capacity),
      facilities: formData.facilities.split(',').map(f => f.trim()),
      id: editingRoom ? editingRoom.id : Date.now(),
      image: formData.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80'
    };

    let updatedRooms;
    if (editingRoom) {
      updatedRooms = rooms.map(r => r.id === editingRoom.id ? roomData : r);
    } else {
      updatedRooms = [...rooms, roomData];
    }
    setRooms(updatedRooms);
    setStorage('rooms', updatedRooms);
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this room?')) {
      const updated = rooms.filter(r => r.id !== id);
      setRooms(updated);
      setStorage('rooms', updated);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Room Management</h2>
        <button className="btn btn-primary" onClick={() => { setEditingRoom(null); setFormData({ name: '', type: 'Standard', price: '', capacity: 1, status: 'Available', description: '', facilities: '', image: '' }); setIsModalOpen(true); }}>
          <Plus size={18} /> Add Room
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Room</th><th>Type</th><th>Price</th><th>Capacity</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r.id}>
                <td><strong>{r.name}</strong></td>
                <td>{r.type}</td>
                <td>{formatCurrency(r.price)}</td>
                <td>{r.capacity} Guests</td>
                <td>
                  <select className="form-control btn-sm" value={r.status} onChange={e => {
                    const updated = rooms.map(room => room.id === r.id ? {...room, status: e.target.value} : room);
                    setRooms(updated);
                    setStorage('rooms', updated);
                  }} style={{ width: 'auto' }}>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }} onClick={() => { setEditingRoom(r); setFormData({...r, facilities: r.facilities.join(', ')}); setIsModalOpen(true); }}><Edit size={16} /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingRoom ? 'Edit Room' : 'Add New Room'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Room Name</label>
            <input className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-control" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option>Standard</option><option>Deluxe</option><option>Executive</option><option>Presidential</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price per Night (₦)</label>
              <input type="number" className="form-control" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Facilities (comma separated)</label>
            <input className="form-control" value={formData.facilities} onChange={e => setFormData({...formData, facilities: e.target.value})} placeholder="Wi-Fi, TV, AC" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{editingRoom ? 'Update Room' : 'Save Room'}</button>
        </form>
      </Modal>
    </div>
  );
}