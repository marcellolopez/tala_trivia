// frontend/src/components/player/GeneralRanking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function GeneralRanking({ currentUserId }) {
    const [ranking, setRanking] = useState([]);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        axios.get('/api/ranking/general', { headers })
            .then(res => setRanking(res.data))
            .catch(err => console.error('Error al cargar ranking general', err));
    }, []);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Usuario</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                {ranking.map((r, idx) => (
                    <tr key={r.user_id} className={r.user_id === currentUserId ? 'table-primary' : ''}>
                        <td>{idx + 1}</td>
                        <td>{r.user_name}</td>
                        <td>{r.score}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}