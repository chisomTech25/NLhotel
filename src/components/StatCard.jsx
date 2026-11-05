export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ background: `${color}20`, padding: '1rem', borderRadius: '50%', color: color }}>
        <Icon size={28} />
      </div>
      <div>
        <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--dark-charcoal)' }}>{value}</h3>
      </div>
    </div>
  );
}