import { Link } from "react-router-dom";
import { logout } from "../../firebase/authentication";
import { useAuth } from "../../context/Auth";
import { Button, Container, Nav, Navbar } from "react-bootstrap";



function Header() {

  const { autenticado } = useAuth();

  return (
    <Navbar className="mb-4" bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="nav-link" style={{ fontSize: '20px' }}>Criar Tarefa</Link>
          <Link to="/Tasks" className="nav-link" style={{ fontSize: '20px' }}>Minhas Tarefas</Link>
        </Nav>
        <Button variant="outline-light" onClick={() => logout()}>Sair</Button>
      </Container>
    </Navbar>
  );
}

export default Header;