import { useForm } from "react-hook-form";
import { login, loginGoogle } from "../../firebase/authentication";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Button, Container, Form } from "react-bootstrap";

function Login() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const { setAutenticado } = useAuth();

  async function enviarFormular({ email, senha }) {
    try {
      await login(email, senha);
      setAutenticado(true);
      navigate("/"); 
    } catch (erro) {
      if (erro.code == "auth/invalid-credential") {
        window.alert("Email ou Senha inválidos.");
      } else {
        window.alert("Algo deu errado.");
      }
      console.error({ ...erro });
    }
  }

  async function entrarComGoogle() {
    try {
      const usuario = await loginGoogle();
      console.log(usuario);
      setAutenticado(true);
      navigate("/");
    } catch (erro) {
      console.error(erro);
      window.alert("Algo deu errado.");
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Login</h1>
        <Form onSubmit={handleSubmit(enviarFormular)} className="p-4 border rounded bg-light shadow">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              {...register("email", {
                required: true,
                minLength: 10,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              id="senha"
              {...register("senha", { required: true, maxLength: 15 })}
            />
          </Form.Group>

          <Button type="submit" className="w-100 mb-2" variant="primary">
            Entrar
          </Button>
          <Button onClick={entrarComGoogle} className="w-100 mb-2" variant="secondary">
            Entrar com Google
          </Button>
          <Link to="/signup" className="btn btn-dark w-100">
            Cadastre-se
          </Link>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
