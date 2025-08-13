const API_URL = import.meta.env.VITE_API_URL;

export async function fetchNotifications() {
  const response = await fetch(`${API_URL}/notification`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
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
