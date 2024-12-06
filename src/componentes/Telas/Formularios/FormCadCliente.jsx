import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarClienteReducer, inserirClienteReducer, buscarCliente } from '../../../redux/clienteReducer';


export default function FormCadCliente(props) {
    const [cliente, setCliente] = useState(props.clienteSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarCliente());
    },[despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(inserirClienteReducer(cliente));
                toast.success("Cliente Inserido!")
            }
            else {

                despachante(editarClienteReducer(cliente));
                props.setModoEdicao(false);
                toast.success("Cliente Alterado!")
            }
            props.setModoEdicao(false);
                props.setClienteSelecionado({
                codigo: 0,
                nome: "",
                endereco: "",
                cidade: "",
                cep: ""
                });
                props.setExibirTabela(true);
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setCliente({ ...cliente, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={cliente.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do cliente!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome do Cliente:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={cliente.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do cliente!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Endereco:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="endereco"
                            name="endereco"
                            aria-describedby="endereco"
                            value={cliente.endereco}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o endereco!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>Cidade:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cidade"
                            name="cidade"
                            aria-describedby="cidade"
                            value={cliente.cidade}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a cidade!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>CEP:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cep"
                            name="cep"
                            aria-describedby="cnpj"
                            value={cliente.cep}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o cep!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setClienteSelecionado({
                            codigo: 0,
                            nome: "",
                            endereco: "",
                            cidade: "",
                            cep: ""
                            });
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
        
    );
}