import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { buscarPst } from "../../firebase/firestore";
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";
import Create from "../../components/Create/Create";
import Header from "../../components/Header/Header";

function Tasks() {
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
        <h1 className="text-center mb-4">Minhas Tarefas</h1>
        {tasks.length == 0 ? (
          <h3 className="text-center">Você ainda não criou tarefas</h3>
        ) : (
          <div className="row gy-4"> 
            {tasks.map((task) => (
              <div className="col-md-6 col-lg-4" key={task.id}>
                <Create {...task} buscarTasks={buscarTasks} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Tasks;
