import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { alterarFornecedor, consultarFornecedor, excluirFornecedor, gravarFornecedor} from "../servicos/servicoFornecedor";

import ESTADO from "./estados";
import { act } from "react";

export const buscarFornecedores =  createAsyncThunk('consultarFornecedor', async() =>{
    //lista de produtos
    const resultado = await consultarFornecedor();
    //se for um array/lista a consulta funcionou
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Fornecedor recuperados com sucesso",
                "listaDeFornecedores":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar os fornecedores do Backend",
                "listaDeFornecedores":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDeFornecedores":[]
        }
    }
        
});
export const inserirFornecedorReducer = createAsyncThunk('gravarFornecedor', async(fornecedor)=>{
    //dar previsibilidade ao conteúdo do payload
        //lista de produtos
        console.log(fornecedor);
        const resultado = await gravarFornecedor(fornecedor);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    fornecedor,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const editarFornecedorReducer = createAsyncThunk('alterarFornecedor', async(fornecedor)=>{
    //dar previsibilidade ao conteúdo do payload
        //lista de produtos
        console.log(fornecedor);
        const resultado = await alterarFornecedor(fornecedor);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    fornecedor,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const apagarFornecedorReducer = createAsyncThunk('excluirFornecedor', async (fornecedor)=>{
    //dar previsibilidade ao conteúdo do payload
        //lista de produtos
        console.log(fornecedor);
        const resultado = await excluirFornecedor(fornecedor);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    fornecedor,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 
});

const fornecedorReducer = createSlice({
    name:'fornecedor',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeFornecedores:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarFornecedores.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando fornecedores)"
        })
        .addCase(buscarFornecedores.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
          } 
        })
        .addCase(buscarFornecedores.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeFornecedores=action.payload.listaDeFornecedores;
        })
        .addCase(apagarFornecedorReducer.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem= "Processando requisição (Excluindo Fornecedor)";
        })
        .addCase(apagarFornecedorReducer.fulfilled,(state,action) =>{
            if (action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                if (action.payload.fornecedor){
                    state.listaDeFornecedores = state.listaDeFornecedores.filter((fornecedor)=>
                        fornecedor.codigo !== action.payload.fornecedor.codigo
                    );
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
            
            //altera a lista de produtos?
        })
        .addCase(apagarFornecedorReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
        .addCase(editarFornecedorReducer.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (Atualizando fornecedor)";
        })
        .addCase(editarFornecedorReducer.fulfilled,(state,action) =>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.fornecedor){
                    const i = state.listaDeFornecedores.findIndex((fornecedor) => fornecedor.codigo === action.payload.fornecedor.codigo);
                    state.listaDeFornecedores[i] = action.payload.fornecedor;
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
           
        })
        .addCase(editarFornecedorReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem= action.payload.mensagem;
        })
        .addCase(inserirFornecedorReducer.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (Cadastrando fornecedor)"
        })
        .addCase(inserirFornecedorReducer.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.fornecedor)
                {
                    state.listaDeFornecedores.push(action.payload.fornecedor);
                }
                else
                {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            }
        })
    }   
});

export default fornecedorReducer.reducer;