// frontend/src/components/player/PendingTrivias.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PendingTrivias({ trivias }) {
    const [completedSummaries, setCompletedSummaries] = useState([]);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('/api/participations/me/summary', { headers })
            .then(res => setCompletedSummaries(res.data))
            .catch(err => console.error('Error cargando resumen:', err));
    }, []);

    const answeredIds = new Set(completedSummaries.map(s => s.trivia_id));
    const pending = trivias.filter(t => !answeredIds.has(t.id));

    return (
        <ListGroup>
            {pending.map(t => (
                <ListGroup.Item
                    key={t.id}
                    className="d-flex justify-content-between align-items-center"
                >
                    {t.name || `Trivia #${t.id}`}
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/player/play/${t.id}`)}
                    >
                        Jugar
                    </Button>
                </ListGroup.Item>
            ))}
            {pending.length === 0 && (
                <ListGroup.Item>No hay trivias pendientes.</ListGroup.Item>
            )}
        </ListGroup>
    );
}
