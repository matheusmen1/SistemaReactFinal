import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import toast, {Toaster} from 'react-hot-toast';
// redux
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { editarUsuarioReducer, inserirUsuarioReducer, buscarUsuarios } from '../../../redux/usuarioReducer';
import { consultarPrivilegio } from '../../../servicos/servicoPrivilegio';


export default function FormCadUsuario(props) {
    const [usuario, setUsuario] = useState(props.usuarioSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [privilegio, setPrivilegio] = useState([]);
    const [temPrivilegio, setTemPrivilegio] = useState(false);
    const despachante = useDispatch();
    
    useEffect(()=>{
        despachante(buscarUsuarios());
    },[despachante]);

    useEffect(()=>{
        consultarPrivilegio().then((resultado)=>{
            if (Array.isArray(resultado)){
                setPrivilegio(resultado);
                setTemPrivilegio(true);
                toast.success("Privilegios Carregados com Sucesso!");
            }
            else{
                toast.error("Não foi possível carregar os privilegios");
            }
        }).catch((erro)=>{
            setTemPrivilegio(false);
            toast.error("Não foi possível carregar os privilegios");
        });
        
    },[]); //didMount
    function selecionarPrivilegio(evento){
        setUsuario({...usuario, privilegio:{codigo:evento.currentTarget.value}})

    }
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                despachante(inserirUsuarioReducer(usuario));
                toast.success("Usuario Inserido!")
            }
            else {

                despachante(editarUsuarioReducer(usuario));
                props.setModoEdicao(false);
                toast.success("Usuario Alterado!")
            }
            props.setModoEdicao(false);
                props.setUsuarioSelecionado({
                codigo: 0,
                nickname: "",
                senha: "",
                urlAvatar: "",
                privilegio: {}
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
        setUsuario({ ...usuario, [elemento]: valor });
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
                        value={usuario.codigo}
                        disabled
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Nickname:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={usuario.nickname}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe o nickname!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Senha:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            id="senha"
                            name="senha"
                            aria-describedby="senha"
                            value={usuario.senha}
                            onChange={manipularMudanca}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe a senha!
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12">
                    <Form.Label>Url do Avatar:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="urlAvatar"
                        name="urlAvatar"
                        value={usuario.urlAvatar}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe a url!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={7}>
                    <Form.Label>Privilegio:</Form.Label>
                    <Form.Select id='privilegio' name='privilegio' onChange={selecionarPrivilegio}>
                        {// criar em tempo de execução as categorias existentes no banco de dados
                            privilegio.map((privilegio) =>{
                                return <option value={privilegio.codigo}>
                                            {privilegio.descricao}
                                       </option>
                            })
                        }
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={1}>
                    {
                      !temPrivilegio ? <Spinner className='mt-4' animation="border" variant="success" />
                      : ""
                    }
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit" disabled={!temPrivilegio}> {props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => {
                        props.setUsuarioSelecionado({
                            codigo: 0,
                            nickname: "",
                            senha: "",
                            urlAvatar: "",
                            privilegio: {}
                            });
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>
        
    );
}