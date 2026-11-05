import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Contact & About Us</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--deep-red)', marginBottom: '1.5rem' }}>Get in Touch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <MapPin color="var(--luxury-gold)" />
              <span>Awka, Anambra State, Nigeria</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Phone color="var(--luxury-gold)" />
              <span>09134222588</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Mail color="var(--luxury-gold)" />
              <span>chisomtech25@gmail.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Clock color="var(--luxury-gold)" />
              <span>24/7 Front Desk & Support</span>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', height: '250px', background: 'var(--gray-200)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <iframe 
              title="NUEL LEE Hotel Location"
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: 'var(--radius)' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63414.0688488815!2d7.0398!3d6.2107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10438b6c0a0a0a0a%3A0x0!2sAwka%2C%20Anambra!5e0!3m2!1sen!2sng!4v1600000000000" 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--deep-red)', marginBottom: '1.5rem' }}>Send us a Message</h3>
          {submitted ? (
            <div className="card" style={{ padding: '1rem', background: '#dcfce7', color: '#166534', textAlign: 'center' }}>
              Message sent successfully! (Demo: Requires backend integration for actual email delivery).
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-control" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          )}
        </div>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ color: 'var(--dark-charcoal)', marginBottom: '1rem' }}>About NUEL LEE Hotel</h3>
        <p style={{ color: 'var(--gray-600)', lineHeight: '1.8' }}>
          NUEL LEE Hotel is a premier hospitality destination located in the heart of Awka, Anambra State, Nigeria. 
          We are committed to providing luxurious, comfortable, and secure accommodation for both business and leisure travelers. 
          Our facilities include a 24-hour restaurant, conference halls, high-speed Wi-Fi, and premium room services, all delivered 
          with the hallmark Nigerian hospitality. Our red and gold brand identity reflects our passion for excellence and the premium 
          value we place on every guest's experience.
        </p>
      </div>
    </div>
  );
}