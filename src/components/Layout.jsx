import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-navbar">
          <h2 style={{ color: 'var(--deep-red)', fontWeight: 'bold' }}>NUEL LEE Hotel Management</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>Admin Portal</span>
          </div>
        </div>
        <main className="page-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}