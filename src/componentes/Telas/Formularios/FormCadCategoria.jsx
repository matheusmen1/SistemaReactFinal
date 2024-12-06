import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarCategoriaReducer, inserirCategoriaReducer, buscarCategorias } from '../../../redux/categoriaReducer';


export default function FormCadCategoria(props) {
    const [categoria, setCategoria] = useState(props.categoriaSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarCategorias());
    },[despachante]);

    
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(inserirCategoriaReducer(categoria));
                toast.success("Categoria Cadastrado!")
            }
            else {
            
                despachante(editarCategoriaReducer(categoria));
                props.setModoEdicao(false);
                toast.success("Categoria Alterado!")
            }
            props.setModoEdicao(false);
                props.setCategoriaSelecionado({
                codigo: 0,
                descricao: "",
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
        setCategoria({ ...categoria, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={categoria.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código da categoria!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="descricao"
                        name="descricao"
                        value={categoria.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição da categoria!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setCategoriaSelecionado({
                            codigo: 0,
                            descricao: "",
                            });
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
        
    );
}