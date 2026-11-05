import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Guests from './pages/Guests';
import RoomManagement from './pages/RoomManagement';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="booking" element={<Booking />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="guests" element={<Guests />} />
          <Route path="room-management" element={<RoomManagement />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;