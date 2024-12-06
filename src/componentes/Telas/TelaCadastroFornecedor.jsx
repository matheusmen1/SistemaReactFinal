import { Alert } from "react-bootstrap";
import FormCadFornecedor from "./Formularios/FormCadFornecedor";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaFornecedor from "./Tabelas/TabelaFornecedor";
export default function TelaCadastroFornecedor(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        codigo: 0,
        nome: "",
        cidade: "",
        cnpj: "",
        cep: "",
        endereco: "",
        telefone: ""
    });

    return (
        <div>
            <Pagina>
                |<Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Fornecedor
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedor 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setFornecedorSelecionado={setFornecedorSelecionado} /> :
                        <FormCadFornecedor
                                         setExibirTabela={setExibirTabela}
                                         fornecedorSelecionado={fornecedorSelecionado}
                                         setFornecedorSelecionado={setFornecedorSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}