const texto = document.getElementById("texto");
let contenedorUser = [];
const contenedorHTML = document.getElementById("contenedorHTML");
const fragment = document.createDocumentFragment();
const formulario = document.getElementById("formulario");

let contador = 1;

function promesa(){
    let i = 1;
    let setIntervalId = setInterval(()=>{
        if(i <= 2){
            texto.innerHTML += `<div class="alert alert-info">espere porfavor...</div><br>`;
        }else{
            clearInterval(setIntervalId);
            texto.innerHTML = '';
        }
        i++;
    },1000)
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(fetch("https://jsonplaceholder.typicode.com/users"))
        }, 2000);
    })
}

promesa().then(res=>res.json()).then(data=>{
    contenedorUser.push(data);
    pintar();
})

function pintar(){
    for(let i = 0;i < contenedorUser[0].length;i++){
        contenedorHTML.innerHTML = " ";
        const {name,phone,email,id,username,website,address,company} = contenedorUser[0][i];
        const div = document.createElement("div");
        div.className = 'col-lg-4 col-md-6 col-xs-12 mt-2';
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5>Name:${name}</h5>
                    <h5>Phone:${phone}</h5>
                    <h5>Email:${email}</h5>
                    ${company.name?`<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#a${id}" aria-expanded="false" aria-controls="a${id}">Company</button>
                    <div class="collapse" id="a${id}">
                        <div class="card card-body">

                            <div id="accordion">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${id}" aria-expanded="true"
                                                aria-controls="collapse${id}">
                                                Name
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse${id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            ${company.name}
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse2${id}"
                                                aria-expanded="false" aria-controls="collapse2${id}">
                                                catchPhrase
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse2${id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div class="card-body">
                                            ${company.catchPhrase}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>`:""}
                </div>
                <div class="card-footer">
                    <h5>id:${id}</h5>
                    ${username?`<h5>username:${username}</h5>`:""}
                    <h5>website:${website}</h5>
                    
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#b${id}" aria-expanded="false" aria-controls="b${id}">Address   </button>
                    <div class="collapse" id="b${id}">
                        <div class="card card-body">

                            <div id="accordion">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne${id}" aria-expanded="true"
                                                aria-controls="collapseOne${id}">
                                                Street
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne${id}" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            ${address.street}
                                        </div>
                                    </div>
                                </div>
                                ${address.city?`<div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo${id}"
                                            aria-expanded="false" aria-controls="collapseTwo${id}">
                                            City
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo${id}" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body">
                                        ${address.city}
                                    </div>
                                </div>
                            </div>`:""}
                                ${address.zipcode?`<div class="card">
                                <div class="card-header" id="headingThree">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#${id}" aria-expanded="false" aria-controls="${id}">
                                            Zipcode
                                        </button>
                                    </h5>
                                </div>
                                <div id="${id}" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body">
                                        ${address.zipcode}
                                    </div>
                                </div>
                            </div>`:""}
                            </div>
                            
                        </div>
                    </div>
                    <button type="button" class="btn btn-warning" onclick="actualizar(${id})" data-toggle="modal" data-target="#Modal">demo modal</button>
                    <button type="button" class="btn btn-danger" onclick="eliminar(${id})">Eliminar</button>
                </div>
            </div>
        `;
        fragment.appendChild(div);
    }
    contenedorHTML.appendChild(fragment)
}

function agregar(){
    const newUser = {
        name:document.getElementById("nombre").value,
        phone:document.getElementById("telefono").value,
        email:document.getElementById("correo").value,
        username:document.getElementById("usuario").value,
        company:{name:document.getElementById("compañia").value},
        address:{street:document.getElementById("direccion").value},
        website:document.getElementById("webSite").value,
        id:contenedorUser[0].length+1,
    };
    console.log(newUser);
    contenedorUser[0].push(newUser);
    pintar();
    formulario.reset();
}

function eliminar (id){
    for(let i = 0;i < contenedorUser[0].length;i++){
        if(contenedorUser[0][i].id == id){
            contenedorUser[0].splice(i,1)
        }
    }
    contenedorHTML.innerHTML = " ";
    pintar();
}

function actualizar(id){
    const name = document.getElementById("nombreA");
    const phone = document.getElementById("telefonoA");
    const email = document.getElementById("correoA");
    const username = document.getElementById("usuarioA");
    const website = document.getElementById("webSiteA");
    const company = {name:document.getElementById("compañiaA")};
    const address = {street:document.getElementById("direccionA")};
    const temporal = buscar(id);

    name.value = temporal.name;
    phone.value = temporal.phone;
    email.value = temporal.email;
    username.value = temporal.username;
    website.value = temporal.website;
    company.name.value = temporal.company.name;
    address.street.value = temporal.address.street;
    console.log(temporal);

    if(contador === 1){
        formularioA = document.getElementById("formActualizar");
        formularioA.addEventListener("submit",(e)=>{
            e.preventDefault();
            temporal.name = name.value;
            temporal.phone = phone.value;
            temporal.email = email.value;
            temporal.username = username.value;
            temporal.website = website.value;
            temporal.company.name = company.name.value;
            temporal.address.street = address.street.value;
            pintar();
        })
    }
    contador++;

}

function buscar (id){
    for(let i = 0;i < contenedorUser[0].length;i++){
        if(contenedorUser[0][i].id == id){
            return contenedorUser[0][i];
        }
    }
}

formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    agregar();
})