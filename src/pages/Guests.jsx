import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { initialGuests } from '../data/initialData';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    setGuests(getStorage('guests', initialGuests));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedGuests;
    if (editingGuest) {
      updatedGuests = guests.map(g => g.id === editingGuest.id ? { ...formData, id: g.id } : g);
    } else {
      updatedGuests = [...guests, { ...formData, id: Date.now() }];
    }
    setGuests(updatedGuests);
    setStorage('guests', updatedGuests);
    setIsModalOpen(false);
    setEditingGuest(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  const handleEdit = (guest) => {
    setEditingGuest(guest);
    setFormData(guest);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this guest record?')) {
      const updated = guests.filter(g => g.id !== id);
      setGuests(updated);
      setStorage('guests', updated);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Guest Management</h2>
        <button className="btn btn-primary" onClick={() => { setEditingGuest(null); setFormData({ name: '', email: '', phone: '', address: '' }); setIsModalOpen(true); }}>
          <Plus size={18} /> Add Guest
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.id}>
                <td>{g.name}</td>
                <td>{g.email}</td>
                <td>{g.phone}</td>
                <td>{g.address}</td>
                <td>
                  <button className="btn btn-sm btn-secondary" style={{ marginRight: '0.5rem' }} onClick={() => handleEdit(g)}><Edit size={16} /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(g.id)}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingGuest ? 'Edit Guest' : 'Add New Guest'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{editingGuest ? 'Update Guest' : 'Save Guest'}</button>
        </form>
      </Modal>
    </div>
  );
}