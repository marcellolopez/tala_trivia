// frontend/src/components/admin/CreateUser.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function CreateUser({ setAlert }) {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'player' });
    const token = localStorage.getItem('token');

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/api/register', form, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setAlert({ variant: 'success', message: 'Usuario creado correctamente' });
                setForm({ name: '', email: '', password: '', role: 'player' });
            })
            .catch(err => setAlert({ variant: 'danger', message: err.response?.data?.detail || 'Error al crear usuario' }));
    };

    return (
        <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                    <option value="player">Player</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </Form.Group>
            <Button type="submit">Crear Usuario</Button>
        </Form>
    );
}