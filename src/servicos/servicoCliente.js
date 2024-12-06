const urlBase = 'https://bcc-backend-lp-2-three.vercel.app/cliente';
//const urlBase = 'https://localhost:3000/produtos';

export async function gravarCliente(cliente){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(cliente)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarCliente(cliente){
    const resposta = await fetch(urlBase + "/" + cliente.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(cliente)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirCliente(cliente){
    const resposta = await fetch(urlBase + "/" + cliente.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarCliente() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}