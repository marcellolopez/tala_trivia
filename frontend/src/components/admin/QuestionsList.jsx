// frontend/src/components/admin/QuestionsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Badge } from 'react-bootstrap';

export default function QuestionsList({ setAlert }) {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const limit = 10;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchQuestions = (page) => {
        const offset = (page - 1) * limit;
        axios
            .get(`/api/questions/?skip=${offset}&limit=${limit}`, { headers })
            .then(res => {
                setQuestions(res.data);
                // Si llegaron tantas como el límite, hay más
                setHasMore(res.data.length === limit);
            })
            .catch(() => {
                setAlert({ variant: 'danger', message: 'Error al listar preguntas' });
            });
    };

    useEffect(() => {
        fetchQuestions(page);
    }, [page]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => hasMore && setPage(page + 1);

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Texto</th>
                        <th>Dificultad</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, idx) => (
                        <tr key={q.id}>
                            <td>{(page - 1) * limit + idx + 1}</td>
                            <td>{q.text}</td>
                            <td>
                                <Badge bg={
                                    q.difficulty === 'easy' ? 'success' :
                                        q.difficulty === 'medium' ? 'warning' : 'danger'
                                }>
                                    {q.difficulty}
                                </Badge>
                            </td>
                            <td>
                                {['option_a', 'option_b', 'option_c', 'option_d'].map((opt, i) => (
                                    <div
                                        key={opt}
                                        className={q.correct_option === i + 1
                                            ? 'fw-bold text-primary'
                                            : ''}
                                    >
                                        <strong>{String.fromCharCode(65 + i)}:</strong> {q[opt]}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={handlePrev} disabled={page === 1} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={handleNext} disabled={!hasMore} />
            </Pagination>
        </>
    );
}
