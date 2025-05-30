// frontend/src/components/admin/ViewRanking.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Table } from 'react-bootstrap';

export default function ViewRanking() {
    const [trivias, setTrivias] = useState([]);
    const [ranking, setRanking] = useState([]);
    const token = localStorage.getItem('token');

    // Carga la lista de trivias al montar el componente
    useEffect(() => {
        axios
            .get('/api/trivias/', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setTrivias(res.data))
            .catch(err => console.error('Error al cargar trivias:', err));
    }, []);

    // Cuando el usuario selecciona una trivia, pide su ranking
    const handleSelect = e => {
        const id = e.target.value;
        if (!id) return;
        axios
            .get(`/api/ranking/trivia/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setRanking(res.data))
            .catch(err => console.error('Error al cargar ranking:', err));
    };

    return (
        <>
        <Form.Group className= "mb-3" style = {{ maxWidth: '300px' }
}>
    <Form.Label>Seleccionar Trivia </Form.Label>
        < Form.Select onChange = { handleSelect } defaultValue = "" >
            <option value="" disabled > --Elige una trivia-- </option>
{
    trivias.map(t => (
        <option key= { t.id } value = { t.id } >
        { t.title ?? `Trivia #${t.id}` }
        </option>
    ))
}
</Form.Select>
    </Form.Group>

{
    ranking.length > 0 && (
        <Table striped bordered hover >
            <thead>
            <tr>
            <th>Posición </th>
            < th > Usuario </th>
            < th > Puntos </th>
            </tr>
            </thead>
            <tbody>
    {
        ranking.map((r, idx) => (
            <tr key= { r.user_id } >
            <td>{ idx + 1} </td>
                < td > { r.user_name } </td>
                < td > { r.score } </td>
                </tr>
            ))
}
</tbody>
    </Table>
      )}
</>
  );
}
