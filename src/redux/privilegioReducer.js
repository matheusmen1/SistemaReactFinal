import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ESTADO from "./estados";
import { act } from "react";
import { alterarPrivilegio, excluirPrivilegio, gravarPrivilegio, consultarPrivilegio } from "../servicos/servicoPrivilegio";

export const buscarPrivilegio=  createAsyncThunk('buscarPrivilegio', async() =>{
    //lista de produtos
    const resultado = await consultarPrivilegio();
    //se for um array/lista a consulta funcionou
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"privilegio recuperados com sucesso",
                "listaDePrivilegio":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar as privilegio do Backend",
                "listaDePrivilegio":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDePrivilegio":[]
        }
    }
        
});
export const inserirPrivilegioReducer = createAsyncThunk('gravarPrivilegio', async(privilegio)=>{
        console.log(privilegio);
        const resultado = await gravarPrivilegio(privilegio);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    privilegio,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const editarPrivilegioReducer = createAsyncThunk('alterarPrivilegio', async(privilegio)=>{

        console.log(privilegio);
        const resultado = await alterarPrivilegio(privilegio);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    privilegio,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const apagarPrivilegioReducer = createAsyncThunk('excluirPrivilegio', async (privilegio)=>{

        console.log(privilegio);
        const resultado = await excluirPrivilegio(privilegio);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    privilegio,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 
});

const privilegioReducer = createSlice({
    name:'privilegio',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDePrivilegio:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarPrivilegio.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando privilegio)"
        })
        .addCase(buscarPrivilegio.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDePrivilegio=action.payload.listaDePrivilegio;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDePrivilegio=action.payload.listaDePrivilegio;
          } 
        })
        .addCase(buscarPrivilegio.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDePrivilegio=action.payload.listaDePrivilegio;
        })
        .addCase(apagarPrivilegioReducer.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem= "Processando requisição (Excluindo privilegio)";
        })
        .addCase(apagarPrivilegioReducer.fulfilled,(state,action) =>{
            if (action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                if (action.payload.privilegio){
                    state.listaDePrivilegio = state.listaDePrivilegio.filter((privilegio)=>
                        privilegio.codigo !== action.payload.privilegio.codigo
                    );
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
            
            //altera a lista de produtos?
        })
        .addCase(apagarPrivilegioReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
        .addCase(editarPrivilegioReducer.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (Atualizando privilegio)";
        })
        .addCase(editarPrivilegioReducer.fulfilled,(state,action) =>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.privilegio){
                    const i = state.listaDePrivilegio.findIndex((privilegio) => privilegio.codigo === action.payload.privilegio.codigo);
                    state.listaDePrivilegio[i] = action.payload.privilegio;
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
           
        })
        .addCase(editarPrivilegioReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem= action.payload.mensagem;
        })
        .addCase(inserirPrivilegioReducer.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (Cadastrando privilegio)"
        })
        .addCase(inserirPrivilegioReducer.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.privilegio)
                {
                    state.listaDePrivilegio.push(action.payload.privilegio);
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

export default privilegioReducer.reducer;