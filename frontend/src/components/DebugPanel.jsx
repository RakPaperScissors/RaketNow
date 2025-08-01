function DebugPanel({ user }) {
  if (!user) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: 9999,
    }}>
      <div><strong>Debug Info</strong></div>
      <div>Role: {user.role}</div>
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}

export default DebugPanel;
