//variables

const formulario = document.getElementById('datosUsuario');
const divForFormDates = document.getElementById('forDatosUsuario');
const mensajeEnviado = document.getElementById('divMensajeEnviado');
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//En este archivo js se encuentran los eventos y funciones de pages/contacto.js destinados a operar con formularios
//El usuario ingresa o selecciona informacion
//En todos los casos se simula un envío real mediante LocalStorage y una previsualización de los mismos

//Evento que escucha change y da una respuesta

const selected = document.querySelector('#pageContacto__select');
selected.addEventListener('change', (e) => {
    e.preventDefault();
    let divEleccion = document.createElement("h5")
    divEleccion.innerHTML = `Elegiste: ${e.target.value}`;
    divForFormDates.appendChild(divEleccion)
    let enviado = document.createElement("p")
    enviado.innerHTML = `Tipo de consulta ${e.target.value}`;
    mensajeEnviado.appendChild(enviado);
    guardarLocal("Tipo de consulta del usuario", e.target.value)
});

//Evento para formulario de datos en input que ingresa el usuario

formulario.addEventListener("submit",validarForm);
function validarForm(e){
    e.preventDefault();
    let form = e.target;
    let parrafo = document.createElement("p")
    parrafo.innerHTML = `<p>Gracias <strong> ${form.children[1].value}</strong> por ingresar tus datos.Al finalizar tu consulta te responderemos a el email que ingresaste. (Ya podes continuar con tu consulta)</p>`;
    parrafo.classList.add("contacto_p");
    parrafo.classList.add("ml-2");
    parrafo.classList.add("mt-2");
    divForFormDates.appendChild(parrafo);
    let enviado = document.createElement("p")
    enviado.innerHTML = `<p>Usuario: ${form.children[1].value} , Email: ${form.children[3].value} </p>`;
    mensajeEnviado.appendChild(enviado);
    guardarLocal("Nombre del usuario", form.children[1].value)
    guardarLocal("Mail del usuario", form.children[3].value)
    formulario.submit.disabled = true;
    return true;
}   
//Evento para re-activar el submit que fue deshabilitado cuando se clickeo

formulario.addEventListener("reset",reset)
function reset(){
    formulario.submit.disabled = false;
    return false;
}

//Evento para el textArea y envío del mensaje final

const textArea = document.querySelector('#textArea');
textArea.addEventListener('submit', (e) => {
    e.preventDefault();
    let form = e.target;
    let divEleccion = document.createElement("p")
    divEleccion.innerHTML =`<p>Consulta del usuario: ${form.children[0].children[1].value} </p>`  
    mensajeEnviado.appendChild(divEleccion)
    guardarLocal("mensaje del Usuario", form.children[0].children[1].value)
});


