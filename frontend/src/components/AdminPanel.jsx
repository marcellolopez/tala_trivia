// frontend/src/components/AdminPanel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Nav, NavDropdown, Alert } from 'react-bootstrap';
import UsersList from './admin/UsersList';
import CreateUser from './admin/CreateUser';
import QuestionsList from './admin/QuestionsList';
import CreateQuestion from './admin/CreateQuestion';
import TriviasList from './admin/TriviasList';
import CreateTrivia from './admin/CreateTrivia';
import ViewRanking from './admin/ViewRanking';

export default function AdminPanel() {
    const [view, setView] = useState('listUsers');
    const [alert, setAlert] = useState({ variant: '', message: '' });
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Panel de Administración</h1>
                <Button variant="secondary" onClick={logout}>Cerrar sesión</Button>
            </div>

            {alert.message && (
                <Alert variant={alert.variant} onClose={() => setAlert({ message: '' })} dismissible>
                    {alert.message}
                </Alert>
            )}

            <Nav variant="tabs" activeKey={view} onSelect={k => setView(k)} className="mb-4">
                <NavDropdown title="Usuarios" id="nav-users">
                    <NavDropdown.Item eventKey="listUsers">Listar Usuarios</NavDropdown.Item>
                    <NavDropdown.Item eventKey="createUser">Crear Usuario</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Preguntas" id="nav-questions">
                    <NavDropdown.Item eventKey="listQuestions">Listar Preguntas</NavDropdown.Item>
                    <NavDropdown.Item eventKey="createQuestion">Crear Pregunta</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Trivias" id="nav-trivias">
                    <NavDropdown.Item eventKey="listTrivias">Listar Trivias</NavDropdown.Item>
                    <NavDropdown.Item eventKey="createTrivia">Crear Trivia</NavDropdown.Item>
                </NavDropdown>

                <Nav.Item>
                    <Nav.Link eventKey="viewRanking">Ver Ranking</Nav.Link>
                </Nav.Item>
            </Nav>

            {view === 'listUsers' && <UsersList setAlert={setAlert} />}
            {view === 'createUser' && <CreateUser setAlert={setAlert} />}
            {view === 'listQuestions' && <QuestionsList setAlert={setAlert} />}
            {view === 'createQuestion' && <CreateQuestion setAlert={setAlert} />}
            {view === 'listTrivias' && <TriviasList setAlert={setAlert} />}
            {view === 'createTrivia' && <CreateTrivia setAlert={setAlert} />}
            {view === 'viewRanking' && <ViewRanking setAlert={setAlert} />}
        </Container>
    );
}
