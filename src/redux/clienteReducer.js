import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ESTADO from "./estados";
import { act } from "react";
import { alterarCliente, excluirCliente, gravarCliente, consultarCliente } from "../servicos/servicoCliente";

export const buscarCliente =  createAsyncThunk('buscarCliente', async() =>{
    //lista de produtos
    const resultado = await consultarCliente();
    //se for um array/lista a consulta funcionou
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Clientes recuperados com sucesso",
                "listaDeClientes":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar os clientes do Backend",
                "listaDeClientes":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDeClientes":[]
        }
    }
        
});
export const inserirClienteReducer = createAsyncThunk('gravarCliente', async(cliente)=>{
        console.log(cliente);
        const resultado = await gravarCliente(cliente);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    cliente,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const editarClienteReducer = createAsyncThunk('alterarCliente', async(cliente)=>{

        console.log(cliente);
        const resultado = await alterarCliente(cliente);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    cliente,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const apagarClienteReducer = createAsyncThunk('excluirCliente', async (cliente)=>{

        console.log(cliente);
        const resultado = await excluirCliente(cliente);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    cliente,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 
});

const clienteReducer = createSlice({
    name:'cliente',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeClientes:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarCliente.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando clientes)"
        })
        .addCase(buscarCliente.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
          } 
        })
        .addCase(buscarCliente.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeClientes=action.payload.listaDeClientes;
        })
        .addCase(apagarClienteReducer.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem= "Processando requisição (Excluindo cliente)";
        })
        .addCase(apagarClienteReducer.fulfilled,(state,action) =>{
            if (action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                if (action.payload.cliente){
                    state.listaDeClientes = state.listaDeClientes.filter((cliente)=>
                        cliente.codigo !== action.payload.cliente.codigo
                    );
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
            
            //altera a lista de produtos?
        })
        .addCase(apagarClienteReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
        .addCase(editarClienteReducer.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (Atualizando cliente)";
        })
        .addCase(editarClienteReducer.fulfilled,(state,action) =>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.cliente){
                    const i = state.listaDeClientes.findIndex((cliente) => cliente.codigo === action.payload.cliente.codigo);
                    state.listaDeClientes[i] = action.payload.cliente;
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
           
        })
        .addCase(editarClienteReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem= action.payload.mensagem;
        })
        .addCase(inserirClienteReducer.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (Cadastrando cliente)"
        })
        .addCase(inserirClienteReducer.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.cliente)
                {
                    state.listaDeClientes.push(action.payload.cliente);
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

export default clienteReducer.reducer;