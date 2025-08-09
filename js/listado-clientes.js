let clienteActual = null;
let tablaCliente = document.querySelector("#table-cliente > tbody");

document.addEventListener("DOMContentLoaded", ()=>{
    getDataClients();
});

let getDataClients =  async ()=>{
    let url = "http://localhost/backend-apicrud/index.php?url=clientes";
    try {
        let respuesta = await fetch(url, {
           method: "GET",
           headers:{
            "Content-Type": "application/json"
           }

        });

        if(respuesta.status == 204){
            console.log("no hay conexion a la base de datos");
        }else{
            let dataClientes = await respuesta.json();
            localStorage.setItem("dataClientes",JSON.stringify(dataClientes));
            dataClientes.forEach((data, i) => {
                let fila = document.createElement("tr");
                fila.innerHTML =`
                <td>${i+1}</td>
                <td>${data.nombre}</td>
                <td>${data.apellido}</td>
                <td>${data.email}</td>
                <td>${data.celular}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-edit" data-id="${i}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-delete" data-id="${i}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-info btn-view" data-id="${i}">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
                `;
                tablaCliente.appendChild(fila);
            });
            console.log(data)

        }
    } catch (error) {
        console.error(error)
    }

}



