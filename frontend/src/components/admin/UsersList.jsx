// frontend/src/components/admin/UsersList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Alert } from 'react-bootstrap';

export default function UsersList({ setAlert }) {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const limit = 10;
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchUsers = (pageNum) => {
        setLoading(true);
        const offset = (pageNum - 1) * limit;
        axios
            .get(`/api/users/?skip=${offset}&limit=${limit}`, { headers })
            .then(res => {
                setUsers(res.data);
                setHasMore(res.data.length === limit);
                setError('');
            })
            .catch(() => {
                setError('Error al listar usuarios');
                setAlert({ variant: 'danger', message: 'Error al listar usuarios' });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => hasMore && setPage(page + 1);

    return (
        <>
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, idx) => (
                        <tr key={u.id}>
                            <td>{(page - 1) * limit + idx + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td><em>{u.role}</em></td>
                        </tr>
                    ))}
                    {loading && (
                        <tr>
                            <td colSpan={4} className="text-center">Cargando...</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination>
                <Pagination.Prev onClick={handlePrev} disabled={page === 1 || loading} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={handleNext} disabled={!hasMore || loading} />
            </Pagination>
        </>
    );
}
