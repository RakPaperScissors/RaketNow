export async function fetchNotifications() {
  const response = await fetch('http://localhost:3000/notification', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
}

export async function acceptApplication(id) {
  const response = await fetch(`http://localhost:3000/raket-application/${id}/accept`, {
    method: 'PATCH',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to accept application');
  return response.json();
}

export async function rejectApplication(id) {
  const response = await fetch(`http://localhost:3000/raket-application/${id}/reject`, {
    method: 'PATCH',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to reject application');
  return response.json();
}
