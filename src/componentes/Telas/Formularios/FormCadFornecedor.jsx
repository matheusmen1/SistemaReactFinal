import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarFornecedorReducer, inserirFornecedorReducer, buscarFornecedores } from '../../../redux/fornecedorReducer';


export default function FormCadFornecedores(props) {
    const [fornecedor, setFornecedor] = useState(props.fornecedorSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarFornecedores());
    },[despachante]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                despachante(inserirFornecedorReducer(fornecedor));
                toast.success("Fornecedor Inserido!")
            }
            else {

                despachante(editarFornecedorReducer(fornecedor));
                props.setModoEdicao(false);
                toast.success("Fornecador Alterado!")
            }
            props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                codigo: 0,
                nome: "",
                cidade: "",
                cnpj: "",
                cep: "",
                endereco: "",
                telefone: ""
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
        setFornecedor({ ...fornecedor, [elemento]: valor });
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
                        value={fornecedor.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nome do Fornecedor:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={fornecedor.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nome do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CEP:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cep"
                            name="cep"
                            aria-describedby="cep"
                            value={fornecedor.cep}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o cep!
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
                            value={fornecedor.cidade}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a cidade!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="4">
                    <Form.Label>CNPJ:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            id="cnpj"
                            name="cnpj"
                            aria-describedby="cnpj"
                            value={fornecedor.cnpj}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o cnpj!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Endereco:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={fornecedor.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o endereco!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={fornecedor.telefone}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o telefone!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setFornecedorSelecionado({
                            codigo: 0,
                            nome: "",
                            cidade: "",
                            cnpj: "",
                            cep: "",
                            endereco: "",
                            telefone: ""
                            });
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
        
    );
}