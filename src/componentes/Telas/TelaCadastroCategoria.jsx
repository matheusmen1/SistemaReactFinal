import { Alert } from "react-bootstrap";
import FormCadCategoria from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState({
        codigo:0,
        descricao:""
    });
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Categoria
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaCategorias 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionado={setCategoriaSelecionado} /> :
                        <FormCadCategoria
                                         setExibirTabela={setExibirTabela}
                                         categoriaSelecionado={categoriaSelecionado}
                                         setCategoriaSelecionado={setCategoriaSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}
                                         />
                }
            </Pagina>
        </div>
    );

}