import { useForm } from "react-hook-form";
import { salvarUs } from "../../firebase/firestore";
import { cadastrar } from "../../firebase/authentication";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

function Signup() {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  async function salvarUsuario({ email, senha, nome }) {
    try {
      const usuario = await cadastrar(email, senha);
      await salvarUs({ email, senha, nome, authId: usuario.uid });
      reset(); 
      navigate("/login");
    } catch (erro) {
      window.alert("Algo deu errado.");
      console.error(erro);
    }
  }

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1 className="text-center mb-4">Cadastre-se</h1>
          <Form onSubmit={handleSubmit(salvarUsuario)} className="p-4 border rounded bg-light shadow">
            <Form.Group className="mb-3" controlId="formBasicNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                id="nome"
                {...register("nome", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSenha">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                id="senha"
                {...register("senha", { required: true })}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary">
                Criar Conta
              </Button>
              <Link to="/login" className="btn btn-dark">
                Fazer Login
              </Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
