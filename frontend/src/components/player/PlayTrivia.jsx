// frontend/src/components/player/PlayTrivia.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, ListGroup, Card, Alert } from 'react-bootstrap';

export default function PlayTrivia() {
    const { triviaId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        // Obtener usuario actual
        axios.get('/api/users/me', { headers })
            .then(res => setUser(res.data))
            .catch(() => setError('Error al obtener datos de usuario'));

        // Obtener preguntas de la trivia
        axios.get('/api/trivias/', { headers })
            .then(res => {
                const trivia = res.data.find(t => Number(t.id) === Number(triviaId));
                if (!trivia) setError('Trivia no encontrada');
                else setQuestions(trivia.questions || []);
            })
            .catch(() => setError('No se pudieron cargar las preguntas'));
    }, [triviaId]);

    const handleChange = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: parseInt(value, 10) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Usuario no autenticado');
            return;
        }

        // Calcular resultado
        const total = questions.length;
        let correctCount = 0;
        const review = questions.map(q => {
            const selected = answers[q.id] || 0;
            if (selected === q.correct_option) correctCount += 1;
            return {
                question: q.text,
                yourAnswer: q[`option_${['a', 'b', 'c', 'd'][selected - 1]}`] || 'Sin responder',
                correctAnswer: q[`option_${['a', 'b', 'c', 'd'][q.correct_option - 1]}`]
            };
        });
        const percent = total ? Math.round((correctCount / total) * 100) : 0;
        setResult({ total, correctCount, percent, review });

        // Registrar participaciones
        try {
            await Promise.all(questions.map(q => {
                const sel = answers[q.id] || 0;
                return axios.post('/api/participations/', {
                    user_id: user.id,
                    trivia_id: Number(triviaId),
                    question_id: q.id,
                    answer: sel
                }, { headers });
            }));
        } catch (e) {
            console.error('Error guardando participaciones', e);
        }
    };

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
                <Button onClick={() => navigate('/player')}>Volver</Button>
            </Container>
        );
    }

    return (
        <Container className="py-5" style={{ maxWidth: '700px' }}>
            <Button variant="link" onClick={() => navigate('/player')}>← Volver</Button>

            {!result ? (
                <Form onSubmit={handleSubmit}>
                    {questions.map((q, idx) => (
                        <Card className="mb-3" key={q.id}>
                            <Card.Header>{`Pregunta ${idx + 1}`}</Card.Header>
                            <Card.Body>
                                <Card.Text>{q.text}</Card.Text>
                                {['a', 'b', 'c', 'd'].map((opt, i) => (
                                    <Form.Check
                                        key={opt}
                                        type="radio"
                                        label={q[`option_${opt}`]}
                                        name={`q-${q.id}`}
                                        value={i + 1}
                                        onChange={() => handleChange(q.id, i + 1)}
                                    />
                                ))}
                            </Card.Body>
                        </Card>
                    ))}
                    <Button type="submit" disabled={!questions.length}>Terminar Trivia</Button>
                </Form>
            ) : (
                <>
                    <h3>Resultado</h3>
                    <p>{`Acertaste ${result.correctCount} de ${result.total} (${result.percent}%)`}</p>
                    <ListGroup>
                        {result.review.map((r, i) => (
                            <ListGroup.Item key={i}>
                                <strong>{r.question}</strong><br />
                                Tu respuesta: {r.yourAnswer}<br />
                                Correcta: {r.correctAnswer}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </>
            )}
        </Container>
    );
}
