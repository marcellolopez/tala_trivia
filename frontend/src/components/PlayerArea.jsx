import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PendingTrivias from './player/PendingTrivias';
import HistoryTrivias from './player/HistoryTrivias';
import GeneralRanking from './player/GeneralRanking';

export default function PlayerArea() {
    const [user, setUser] = useState(null);
    const [trivias, setTrivias] = useState([]);
    const [activeTab, setActiveTab] = useState('inicio');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    // Carga usuario y lista de trivias
    useEffect(() => {
        axios.get('localhost:8000/api/users/me', { headers })
            .then(res => setUser(res.data))
            .catch(() => { });
        axios.get('localhost:8000/api/trivias/', { headers })
            .then(res => setTrivias(res.data))
            .catch(() => { });
    }, []);

    // Recarga trivias al cambiar de pestaña (para reflejar nuevos participaciones)
    useEffect(() => {
        if (activeTab === 'inicio') {
            axios.get('/api/trivias/', { headers })
                .then(res => setTrivias(res.data))
                .catch(() => { });
        }
    }, [activeTab]);

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Bienvenido, {user?.name}</h1>
                <Button variant="secondary" onClick={logout}>Cerrar sesión</Button>
            </div>

            <Tabs
                id="player-tabs"
                activeKey={activeTab}
                onSelect={k => setActiveTab(k)}
                className="mb-4"
            >
                <Tab eventKey="inicio" title="Inicio">
                    <PendingTrivias trivias={trivias} />
                </Tab>
                <Tab eventKey="historial" title="Historial">
                    <HistoryTrivias />
                </Tab>
                <Tab eventKey="ranking" title="Ranking">
                    <GeneralRanking currentUserId={user?.id} />
                </Tab>
            </Tabs>
        </Container>
    );
}
