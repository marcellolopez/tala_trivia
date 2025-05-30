// frontend/src/components/player/HistoryTrivias.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner } from 'react-bootstrap';

export default function HistoryTrivias() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        axios
            .get('/api/participations/me/summary', { headers })
            .then(res => {
                setHistory(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar historial:', err);
                setError('Error al cargar historial');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Trivia</th>
                    <th>Correctas</th>
                    <th>Total</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {history.map((h, idx) => (
                    <tr key={h.trivia_id}>
                        <td>{idx + 1}</td>
                        <td>{h.trivia_name}</td>
                        <td>{h.correct_answers}</td>
                        <td>{h.total_questions}</td>
                        <td>{new Date(h.finished_at).toLocaleString()}</td>
                    </tr>
                ))}
                {history.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center">
                            Aún no has completado ninguna trivia.
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
