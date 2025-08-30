const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNotifications() {
  const response = await fetch(`${API_URL}/notification`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}

export async function markNotificationAsRead(id) {
  const response = await fetch(`${API_URL}/notification/${id}/read`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isRead: true }),
  });
  if (!response.ok) throw new Error('Failed to mark notification as read');
  return response.json();
}

export async function acceptApplication(id) {
  const response = await fetch(`${API_URL}/raket-application/${id}/accept`, {
    method: 'PATCH',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to accept application');
  return response.json();
}

export async function rejectApplication(id) {
  const response = await fetch(`${API_URL}/raket-application/${id}/reject`, {
    method: 'PATCH',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to reject application');
  return response.json();
}
