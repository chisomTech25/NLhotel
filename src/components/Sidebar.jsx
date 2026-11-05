import { NavLink } from 'react-router-dom';
import { Home, Bed, Calendar, Users, Settings, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/rooms', icon: Bed, label: 'Rooms' },
    { to: '/booking', icon: Calendar, label: 'Book a Room' },
    { to: '/bookings', icon: Calendar, label: 'Booking Management' },
    { to: '/guests', icon: Users, label: 'Guest Management' },
    { to: '/room-management', icon: Settings, label: 'Room Management' },
    { to: '/contact', icon: Phone, label: 'Contact & About' },
  ];

  return (
    <>
      <button className="btn btn-primary" style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 60 }} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span style={{ color: 'var(--luxury-gold)' }}>NUEL LEE</span>
        </div>
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <link.icon size={20} />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}