const urlBase = 'https://bcc-backend-lp-2-three.vercel.app/privilegio';

export async function gravarPrivilegio(privilegio){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(privilegio)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarPrivilegio(privilegio){
    const resposta = await fetch(urlBase + "/" + privilegio.codigo,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(privilegio)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirPrivilegio(privilegio){
    const resposta = await fetch(urlBase + "/" + privilegio.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarPrivilegio() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}