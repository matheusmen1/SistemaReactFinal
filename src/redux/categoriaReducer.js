import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import ESTADO from "./estados";
import { act } from "react";
import { alterarCategoria, excluirCategoria, gravarCategoria, consultarCategoria } from "../servicos/servicoCategoria";

export const buscarCategorias =  createAsyncThunk('buscarCategorias', async() =>{
    //lista de produtos
    const resultado = await consultarCategoria();
    //se for um array/lista a consulta funcionou
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Categorias recuperados com sucesso",
                "listaDeCategorias":resultado
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar as categorias do Backend",
                "listaDeCategorias":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDeCategorias":[]
        }
    }
        
});
export const inserirCategoriaReducer = createAsyncThunk('gravarCategoria', async(categoria)=>{
        console.log(categoria);
        const resultado = await gravarCategoria(categoria);
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    categoria,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const editarCategoriaReducer = createAsyncThunk('alterarCategoria', async(categoria)=>{

        console.log(categoria);
        const resultado = await alterarCategoria(categoria);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    categoria,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 

})
export const apagarCategoriaReducer = createAsyncThunk('excluirCategoria', async (categoria)=>{

        console.log(categoria);
        const resultado = await excluirCategoria(categoria);
        //se for um array/lista a consulta funcionou
        console.log(resultado);
        try {
                return {
                    "status":resultado.status,
                    "mensagem":resultado.mensagem,
                    categoria,
                }
        }
        catch(erro){
            return {
                "status":false,
                "mensagem":"Erro: " + erro.message,
            }
        } 
});

const categoriaReducer = createSlice({
    name:'categoria',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeCategorias:[]
    },
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(buscarCategorias.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando categorias)"
        })
        .addCase(buscarCategorias.fulfilled, (state, action) =>{
          if (action.payload.status){
            state.estado=ESTADO.OCIOSO;
            state.mensagem=action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
          else{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
          } 
        })
        .addCase(buscarCategorias.rejected, (state, action) =>{
            state.estado=ESTADO.ERRO;
            state.mensagem = action.payload.mensagem;
            state.listaDeCategorias=action.payload.listaDeCategorias;
        })
        .addCase(apagarCategoriaReducer.pending, (state,action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem= "Processando requisição (Excluindo Categoria)";
        })
        .addCase(apagarCategoriaReducer.fulfilled,(state,action) =>{
            if (action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                if (action.payload.categoria){
                    state.listaDeCategorias = state.listaDeCategorias.filter((categoria)=>
                        categoria.codigo !== action.payload.categoria.codigo
                    );
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
            
            //altera a lista de produtos?
        })
        .addCase(apagarCategoriaReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=""//action.payload.mensagem;
        })
        .addCase(editarCategoriaReducer.pending, (state, action) =>{
            state.estado=ESTADO.PENDENTE;
            state.mensagem="Processando requisição (Atualizando categoria)";
        })
        .addCase(editarCategoriaReducer.fulfilled,(state,action) =>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.categoria){
                    const i = state.listaDeCategorias.findIndex((categoria) => categoria.codigo === action.payload.categoria.codigo);
                    state.listaDeCategorias[i] = action.payload.categoria;
                }
                
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            }
           
        })
        .addCase(editarCategoriaReducer.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem= action.payload.mensagem;
        })
        .addCase(inserirCategoriaReducer.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = "Processando requisição (Cadastrando categoria)"
        })
        .addCase(inserirCategoriaReducer.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                if (action.payload.categoria)
                {
                    state.listaDeCategorias.push(action.payload.categoria);
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

export default categoriaReducer.reducer;