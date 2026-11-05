import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStorage } from '../utils/storage';
import { initialRooms } from '../data/initialData';
import RoomCard from '../components/RoomCard';

export default function Rooms() {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setRooms(getStorage('rooms', initialRooms));
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesType = filter === 'All' || room.type === filter;
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Rooms & Accommodation</h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search rooms..." 
          className="form-control" 
          style={{ maxWidth: '300px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-control" style={{ maxWidth: '200px' }} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Executive">Executive</option>
          <option value="Presidential">Presidential</option>
        </select>
      </div>

      <div className="rooms-grid">
        {filteredRooms.map(room => (
          <RoomCard key={room.id} room={room} onBook={(r) => navigate('/booking', { state: { roomId: r.id } })} />
        ))}
      </div>
      {filteredRooms.length === 0 && <p style={{ textAlign: 'center', color: 'var(--gray-600)' }}>No rooms found matching your criteria.</p>}
    </div>
  );
}