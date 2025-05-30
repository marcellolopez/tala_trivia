// frontend/src/components/admin/CreateQuestion.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

export default function CreateQuestion({ setAlert }) {
    const [form, setForm] = useState({
        text: '',
        difficulty: 'medium',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_option: '1',
    });
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert correct_option to number
        const payload = {
            ...form,
            correct_option: parseInt(form.correct_option, 10),
        };

        axios.post('/api/questions/', payload, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setAlert({ variant: 'success', message: 'Pregunta creada correctamente' });
                setForm({ text: '', difficulty: 'medium', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '1' });
            })
            .catch((err) => {
                setAlert({ variant: 'danger', message: err.response?.data?.detail || 'Error al crear pregunta' });
            });
    };

    return (
        <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '600px' }}>
            <Form.Group className="mb-3">
                <Form.Label>Texto de la Pregunta</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Dificultad</Form.Label>
                <Form.Select name="difficulty" value={form.difficulty} onChange={handleChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Opción A</Form.Label>
                <Form.Control
                    name="option_a"
                    value={form.option_a}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Opción B</Form.Label>
                <Form.Control
                    name="option_b"
                    value={form.option_b}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Opción C</Form.Label>
                <Form.Control
                    name="option_c"
                    value={form.option_c}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Opción D</Form.Label>
                <Form.Control
                    name="option_d"
                    value={form.option_d}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Opción Correcta</Form.Label>
                <Form.Select name="correct_option" value={form.correct_option} onChange={handleChange}>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                </Form.Select>
            </Form.Group>

            <Button type="submit">Crear Pregunta</Button>
        </Form>
    );
}