import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarPrivilegioReducer, inserirPrivilegioReducer, buscarPrivilegio } from '../../../redux/privilegioReducer';


export default function FormCadPrivilegio(props) {
    const [privilegio, setPrivilegio] = useState(props.privilegioSelecionado);
    const [formValidado, setFormValidado] = useState(false);

    const despachante = useDispatch();

    useEffect(()=>{
        despachante(buscarPrivilegio());
    },[despachante]);

    
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                despachante(inserirPrivilegioReducer(privilegio));
                toast.success("privilegio Cadastrado!")
            }
            else {
            
                despachante(editarPrivilegioReducer(privilegio));
                props.setModoEdicao(false);
                toast.success("privilegio Alterado!")
            }
            props.setModoEdicao(false);
                props.setPrivilegioSelecionado({
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
        setPrivilegio({ ...privilegio, [elemento]: valor });
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
                        value={privilegio.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do privilegio!</Form.Control.Feedback>
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
                        value={privilegio.descricao}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a descrição do privilegio!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setPrivilegioSelecionado({
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