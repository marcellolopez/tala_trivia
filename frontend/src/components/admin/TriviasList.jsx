// frontend/src/components/admin/TriviasList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';

export default function TriviasList({ setAlert }) {
    const [trivias, setTrivias] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const limit = 10;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchTrivias = (page) => {
        const offset = (page - 1) * limit;
        axios
            .get(`/api/trivias/?skip=${offset}&limit=${limit}`, { headers })
            .then(res => {
                setTrivias(res.data);
                setHasMore(res.data.length === limit);
            })
            .catch(() => {
                setAlert({ variant: 'danger', message: 'Error al listar trivias' });
            });
    };

    useEffect(() => {
        fetchTrivias(page);
    }, [page]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => hasMore && setPage(page + 1);

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {trivias.map((t, idx) => (
                        <tr key={t.id}>
                            <td>{(page - 1) * limit + idx + 1}</td>
                            <td>{t.name}</td>
                            <td>{t.description ?? 'Sin descripción'}</td>
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
