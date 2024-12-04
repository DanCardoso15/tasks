import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { editarPst, removerPst } from "../../firebase/firestore";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

function Create(props) {
  const [status, setStatus] = useState(props.status || "Pendente"); // Inicializa com o valor de props.status

  async function removerTask() {
    await removerPst(props.id);
    props.buscarTasks();
  }

  async function editarTask() {
    const titulo = window.prompt("Editar o título", props.titulo);
    const conteudo = window.prompt("Editar a descrição", props.conteudo);
    const data = window.prompt("Editar a data de conclusão", props.data);
    if (titulo) {
      await editarPst(props.id, { titulo });
      props.buscarTasks();
    }
    if (conteudo) {
      await editarPst(props.id, { conteudo });
      props.buscarTasks();
    }
    if (data) {
      await editarPst(props.id, { data });
      props.buscarTasks();
    }
  }

  async function handleSelect(selectedKey) {
    setStatus(selectedKey);
    await editarPst(props.id, { status: selectedKey }); 
  };

  useEffect(() => {
    setStatus(props.status || "Pendente");
  }, [props.status]);

  return (
    <div className="task mb-3">
      <Card style={{ width: "100%" }} className="mb-4">
        <Card.Header as="h5">{props.titulo}</Card.Header>
        <Card.Body>
          <Card.Text>{props.conteudo}</Card.Text>
          <Card.Text>{props.data ? `Conclusão: ${props.data}` : ""}</Card.Text>
          <Card.Text>Status: {status}</Card.Text>

          <ButtonGroup>
            <Button variant="secondary" size="sm" onClick={removerTask}>
              Excluir
            </Button>

            <Button variant="secondary" size="sm" onClick={editarTask}>
              Editar
            </Button>

            <DropdownButton
              variant="secondary"
              as={ButtonGroup}
              title="Status"
              id="bg-nested-dropdown"
              onSelect={handleSelect}
            >
              <Dropdown.Item eventKey="Concluído">Concluído</Dropdown.Item>
              <Dropdown.Item eventKey="Pendente">Pendente</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Create;
