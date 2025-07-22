export async function fetchNotifications(accessToken) {
  const response = await fetch('http://localhost:3000/notification', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}

export async function acceptApplication(id, accessToken) {
  const response = await fetch(`http://localhost:3000/raket-application/${id}/accept`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('Failed to accept application');
  return response.json();
}

export async function rejectApplication(id, accessToken) {
  const response = await fetch(`http://localhost:3000/raket-application/${id}/reject`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error('Failed to reject application');
  return response.json();
}