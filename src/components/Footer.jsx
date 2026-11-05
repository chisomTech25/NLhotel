export default function Footer() {
  return (
    <footer className="footer">
      <p style={{ color: 'var(--luxury-gold)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>NUEL LEE Hotel</p>
      <p>Awka, Anambra State, Nigeria</p>
      <p>Phone: 09134222588 | Email: chisomtech25@gmail.com</p>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.7 }}>© {new Date().getFullYear()} NUEL LEE Hotel. All rights reserved.</p>
    </footer>
  );
}