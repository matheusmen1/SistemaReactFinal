import { Alert } from "react-bootstrap";
import FormCadPrivilegio from "./Formularios/FormCadPrivilegio";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaPrivilegio from "./Tabelas/TabelaPrivilegio";

export default function TelaCadastroPrivilegio(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [privilegioSelecionado, setPrivilegioSelecionado] = useState({
        codigo:0,
        descricao:""
    });
    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Privilegio
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaPrivilegio 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setPrivilegioSelecionado={setPrivilegioSelecionado} /> :
                        <FormCadPrivilegio
                                         setExibirTabela={setExibirTabela}
                                         privilegioSelecionado={privilegioSelecionado}
                                         setPrivilegioSelecionado={setPrivilegioSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}
                                         />
                }
            </Pagina>
        </div>
    );

}