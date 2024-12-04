import { useEffect, useState } from "react";
import { buscarPst, salvarPst } from "../../firebase/firestore";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";

function FormPost({ buscarTasks }) {
  const { handleSubmit, register, reset } = useForm();

  async function salvarTask(dados) {
    await salvarPst(dados);
    buscarTasks();
    reset();
    window.alert("A sua tarefa foi criada!");
  }

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "700px" }}>
        <h1 className="text-center mb-4">Criar Tarefa</h1>
  
        <Form onSubmit={handleSubmit(salvarTask)} className="p-4 border rounded bg-light shadow">
          <Form.Group className="mb-3" controlId="titulo">
            <Form.Label>Título:</Form.Label>
            <Form.Control type="text" {...register("titulo", { required: true })} />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="conteudo">
            <Form.Label>Descrição:</Form.Label>
            <Form.Control type="text" {...register("conteudo", { required: true })} />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="data">
            <Form.Label>Dia de conclusão:</Form.Label>
            <Form.Control type="date" {...register("data")} />
          </Form.Group>

          <Button type="submit" className="w-100" variant="secondary">
            Adicionar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

function Home() {
  const [tasks, setTasks] = useState([]);
  const { autenticado } = useAuth();

  async function buscarTasks() {
    const tasks = await buscarPst();
    setTasks(tasks);
  }

  useEffect(() => {
    buscarTasks();
  }, []);

  if (!autenticado) return <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <Container>
        <FormPost buscarTasks={buscarTasks} />
      </Container>
    </div>
  );
}

export default Home;
