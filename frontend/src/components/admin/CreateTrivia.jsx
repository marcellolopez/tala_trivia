// frontend/src/components/admin/CreateTrivia.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

export default function CreateTrivia({ setAlert }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [availableQuestions, setAvailableQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [checkedQ, setCheckedQ] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [checkedU, setCheckedU] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        axios.get('/api/questions/', { headers })
            .then(res => setAvailableQuestions(res.data))
            .catch(() => setAlert({ variant: 'danger', message: 'Error al cargar preguntas' }));
        axios.get('/api/users/', { headers })
            .then(res => setAvailableUsers(res.data))
            .catch(() => setAlert({ variant: 'danger', message: 'Error al cargar usuarios' }));
    }, []);

    const toggleCheckQ = id => {
        setCheckedQ(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const addQuestions = () => {
        const toAdd = availableQuestions.filter(q => checkedQ.includes(q.id));
        setSelectedQuestions(prev => [...prev, ...toAdd]);
        setAvailableQuestions(prev => prev.filter(q => !checkedQ.includes(q.id)));
        setCheckedQ([]);
    };
    const removeQuestions = () => {
        const toRemove = selectedQuestions.filter(q => checkedQ.includes(q.id));
        setAvailableQuestions(prev => [...prev, ...toRemove]);
        setSelectedQuestions(prev => prev.filter(q => !checkedQ.includes(q.id)));
        setCheckedQ([]);
    };

    const toggleCheckU = id => {
        setCheckedU(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };
    const addUsers = () => {
        const toAdd = availableUsers.filter(u => checkedU.includes(u.id));
        setSelectedUsers(prev => [...prev, ...toAdd]);
        setAvailableUsers(prev => prev.filter(u => !checkedU.includes(u.id)));
        setCheckedU([]);
    };
    const removeUsers = () => {
        const toRemove = selectedUsers.filter(u => checkedU.includes(u.id));
        setAvailableUsers(prev => [...prev, ...toRemove]);
        setSelectedUsers(prev => prev.filter(u => !checkedU.includes(u.id)));
        setCheckedU([]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name: title,
            description,
            question_ids: selectedQuestions.map(q => q.id),
            user_ids: selectedUsers.map(u => u.id)
        };
        axios.post('/api/trivias/', payload, { headers })
            .then(() => {
                setAlert({ variant: 'success', message: 'Trivia creada exitosamente' });
                setTitle(''); setDescription('');
                setAvailableQuestions([]); setSelectedQuestions([]);
                setAvailableUsers([]); setSelectedUsers([]);
            })
            .catch(err => setAlert({ variant: 'danger', message: err.response?.data?.detail || 'Error al crear trivia' }))
            .finally(() => setLoading(false));
    };

    return (
        <Container>
            <h3 className="mb-4">Crear Nueva Trivia</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control value={title} onChange={e => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={2} value={description} onChange={e => setDescription(e.target.value)} />
                </Form.Group>

                {/* Dual list for questions */}
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Header>Preguntas Disponibles</Card.Header>
                            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {availableQuestions.map(q => (
                                    <Form.Check key={q.id} type="checkbox" id={`q-avail-${q.id}`} label={q.text}
                                        checked={checkedQ.includes(q.id)} onChange={() => toggleCheckQ(q.id)} />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="auto" className="d-flex flex-column justify-content-center">
                        <Button size="sm" className="mb-2" onClick={addQuestions} disabled={!checkedQ.length}>Agregar ➔</Button>
                        <Button size="sm" onClick={removeQuestions} disabled={!checkedQ.length}>⇦ Quitar</Button>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>Preguntas Seleccionadas</Card.Header>
                            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {selectedQuestions.map(q => (
                                    <Form.Check key={q.id} type="checkbox" id={`q-sel-${q.id}`} label={q.text}
                                        checked={checkedQ.includes(q.id)} onChange={() => toggleCheckQ(q.id)} />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Dual list for users */}
                <Row className="mb-4">
                    <Col>
                        <Card>
                            <Card.Header>Usuarios Disponibles</Card.Header>
                            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {availableUsers.map(u => (
                                    <Form.Check key={u.id} type="checkbox" id={`u-avail-${u.id}`} label={`${u.name} (${u.email})`}
                                        checked={checkedU.includes(u.id)} onChange={() => toggleCheckU(u.id)} />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs="auto" className="d-flex flex-column justify-content-center">
                        <Button size="sm" className="mb-2" onClick={addUsers} disabled={!checkedU.length}>Agregar ➔</Button>
                        <Button size="sm" onClick={removeUsers} disabled={!checkedU.length}>⇦ Quitar</Button>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>Usuarios Seleccionados</Card.Header>
                            <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {selectedUsers.map(u => (
                                    <Form.Check key={u.id} type="checkbox" id={`u-sel-${u.id}`} label={`${u.name} (${u.email})`}
                                        checked={checkedU.includes(u.id)} onChange={() => toggleCheckU(u.id)} />
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Button type="submit" disabled={loading || !selectedQuestions.length || !selectedUsers.length}>
                    {loading ? 'Creando...' : 'Crear Trivia'}
                </Button>
            </Form>
        </Container>
    );
}
