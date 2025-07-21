export async function fetchNotifications(accessToken) {
  const response = await fetch('http://localhost:3000/notifications', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}