import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/users';
import { fetchUsersByRole } from '../../api/users';

function Users() {
    const [Users, setUsers] = useState([])
    const [Clients, setClients] = useState([])
    const [Raketistas, setRaketistas] = useState([])
    const [Organizations, setOrganizations] = useState([])

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
        fetchUsersByRole('client').then(setClients).catch(console.error);
        fetchUsersByRole('raketista').then(setRaketistas).catch(console.error);
        fetchUsersByRole('organization').then(setOrganizations).catch(console.error);
        
    }, [])

    return (
        <div style={{ border: '3px solid black', margin: '10px'}}>
            <div>
                <h2 style={{ marginTop: '10px', fontWeight: 'bold' }}>All Users</h2>
                <ul>
                    {Users.map(user => (<li key={user.uid}>{user.name} ({user.email})</li>))}
                </ul>
            </div>
            <div>
                <h2  style={{ marginTop: '10px', fontWeight: 'bold' }}>Clients</h2>
                <ul>
                    {Clients.map(client => (<li key={client.uid}>{client.name} ({client.email})</li>))}
                </ul>
            </div>
            <div>
                <h2  style={{ marginTop: '10px', fontWeight: 'bold' }}>Raketistas</h2>
                <ul>
                    {Raketistas.map(raketista => (<li key={raketista.uid}>{raketista.name} ({raketista.email})</li>))}
                </ul>
            </div>
            <div>
                <h2  style={{ marginTop: '10px', fontWeight: 'bold' }}>Organizations</h2>
                <ul>
                    {Organizations.map(organization => (<li key={organization.uid}>{organization.name} ({organization.email})</li>))}
                </ul>
            </div>
        </div>
    );
}

export default Users;