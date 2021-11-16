//Variables

let agregarAlCarrito =  $("#btn1");
let agregarAlCarritoDos =  $("#btn2");
let agregarAlCarritoTres =  $("#btn3");
let verTotal =  $("#btnTotal");
let refrescar =  $("#btnRefrescar");
let carrito = $("#textoCarrito");
let newDiv = $("#newDiv");
let apiDiv = $("#divForApi");
let subDiv = $("#divCompra");
let carritoTotal = 0;
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

//Mediante Document.ready, al cargarse el sitio, se ejecuta una función que muestra un mensaje

$( document ).ready(function() {
    $("body").prepend(`<div id="documentReady"><h3>El sitio ya esta cargado</h3></div>`)
    //Al haberse incluido un id al elemento incluido al dom, su estilo se puede manipular desde styles.css
    //En seguida se incluye animación de jQuery
    $("#documentReady").delay(1700).slideUp("fast");
});

//Array de Objetos para los productos

const objetos = [{id: 1, nombre: "Diseño Gráfico", precio: 2000},
                {id: 2, nombre: "Animaciones", precio: 2500}, 
                {id: 3, nombre: "Ediciones", precio: 1500}];

//Iterando por cada objeto para almacenarlo en LocalStorage en JSON

for (objeto of objetos) {
    guardarLocal(objeto.id, JSON.stringify(objeto))
}

//Estilo
newDiv.css({"background-color":"transparent"})
$("#mainRow").css({"border-radius":"25px"});

//Creación de boton que luego consumirá la API

$('#forBtnDolar').append(`<div class="bg-dark align-items-center bg-white pt-4 pr-4 float-right">
                    <a class="btn bg-dark text-light mt-3" id="btnConvertor">
                        <strong>Cotización Dolar Hoy</strong>
                    </a>
                  </div>`);

$(apiDiv).css({"height":"80px",
               "color":"black"})


//Evento que obtiene los datos de la API           
$("#btnConvertor").click(() => { 
    $.get(URLGET, function (response, state) {
        if(state === "success"){
            let myDates = response;
            $(".boxDolar").remove()
            $("#btnOcultar").remove()
            for (const dato of myDates) {
                $(apiDiv).append(`<div class="col-1 text-dark boxDolar ml-1" style="display:none">
                                    <h6>${dato.casa.nombre}</h6>
                                    <p> ${dato.casa.compra}</p>
                                </div>`);

                $(".boxDolar").slideDown("slow");
            }  
            $(apiDiv).append(`<a class="btn text-light h-50" id="btnOcultar"><strong>Ocultar</strong></a>`)
            $("#btnOcultar").click(() => {
                $(".boxDolar").slideUp("slow");
                $("#btnOcultar").slideUp("slow");
            })
        }
    });   
});

// Se crea un array de los botones del carrito, traido en las variables de las primeras líneas de main.js
// Este paso, se repite para los objetos almacenados del LocalStorage

let btnsCarrito = [agregarAlCarrito,agregarAlCarritoDos,agregarAlCarritoTres];
let json = [JSON.parse(localStorage.getItem("1")),
        JSON.parse(localStorage.getItem("2")),
        JSON.parse(localStorage.getItem("3"))]

//Iterando el array de los botones para añadirles eventos 
//Por cada click se añade el producto al carrito con la información de los objetos parseados,traidos del localStorage
for (let i = 0; i < btnsCarrito.length; i++) {
    const element = btnsCarrito[i];
    element.click((e)=> {
        e.preventDefault();
        let parseJson = json[i]
        $(carrito).append(`<div class="animada" style="display:none"><p><strong>${parseJson.nombre}:</strong> $${parseJson.precio}</p></div>`);
        $(".animada").slideDown("slow");   
        carritoTotal = carritoTotal + parseJson.precio;

    })
    
}


//Botón para ver el precio total del carrito: con condicinales para ver un resultado
//La funcion genera un botón de compra y otro en el que se interactua con la API del Dolar

verTotal.click((e)=> {
    e.preventDefault();   
    newDiv.children().remove();
    if (carritoTotal !== 0) {
        newDiv.append(`<div id="animation" style="display: none">
                            <h3 class="pl-3 mt-3 text-dark">
                                <strong>Total </strong> 
                                $${carritoTotal}
                            </h6>
                            <a class="btn text-light mb-1 ml-1" id="btnComprar"><strong>Comprar</strong></a>
                        </div>`) 
        newDiv.append(`<div>
                        <p class="text-dark">Consultá tu precio a Dólar</p>
                            <a class="btn text-light" id="btnDolar">
                                <strong>Ver</strong>
                            </a>
                        </div>`)

        $("#btnDolar").click(()=>{
            $("#theCard").toggle("fast")
            $("#theCard").children().remove();
            $.get(URLGET, function (response, state) {        
                if(state === "success"){
                    carritoDolar = carritoTotal / parseInt(response[0].casa.compra);
                    carritoDolar = carritoDolar.toFixed();             
                    $("#theCard").append(`<div id="animationDolar" style="display: none" class="pt-4 d-inline-flex mb-4">
                                            <p class="ml-2 mt-1 text-dark mr-3">
                                                <strong>Total Dolarizado: U$D${carritoDolar}</strong>
                                            </p>
                                            <a href="pages/contacto.html" class="btn text-light mb-3"><strong>Pagar con Paypal</strong></a>
                                          </div>`)
                    $("#animationDolar").fadeIn(1000);  
                    $("#animationDolar").css({"width": "40em",
                                              "margin-top":"5px",
                                              "left":"0em",
                                              "padding-top":"20px",
                                              "padding-left":"40px", 
                                              "background-color":"white",
                                              "font-size": "14px",
                                              "font-weight":"bold",
                                              "border-radius":"20px", 
                                              "position": "absolute" })
                }         
            })        
        })

        $("#animation").fadeIn(1000);
        $("#btnComprar").css("border-radius","20px");
        $("#animation").css({"background-color":"white",
                             "border-radius":"20px"})
        newDiv.css({"width": "100%", 
                    "font-size": "40px",
                    "border-radius":"20px",
                    "left":"6.5em", 
                    "bottom":"0px", 
                    "position": "absolute",
                    "background-color":"white" })          
    }

    else {
        newDiv.append(`<div class="bg-danger" id="require" style="display:none">
                            <p class="p-3">
                                Para ver el total usted<strong> debería elegir un producto</strong>
                            </p>
                        </div>`);
        $("#require").slideDown("slow");
        $("#require").css("border-radius","20px");
        newDiv.css({"border-radius":"20px",
                    "width":"100%",
                    "left":"0px",
                    "top":"0px",
                    "position":"sticky"
                    });                    
        $("#require").delay(2000).slideUp("slow");
    }

    $("#btnComprar").click(() => {
        $("#divCompra").children().remove()
        $("#divCompra").append(`<div class="text-light">
                                    <h6>
                                        <lottie-player id="animLottie" src="https://assets9.lottiefiles.com/datafiles/jXqHQIXI6oO6V47/data.json"  background="transparent"  speed="1"  autoplay></lottie-player>
                                        Felicidades! Usted ha realizado su compra
                                    </h6>
                                </div>`)
    })
}
)

//Un botón para refrescar el contenido del carrito

refrescar.click(() => {
    refrescar.animate({opacity:'0.5'},"slow",function() {
        newDiv.slideUp("slow");
        newDiv.toggle("fast");
        carrito.toggle("fast");
        $("#divCompra").toggle("fast");
        $("#theCard").toggle("fast");
        $("#divCompra").children().remove();
        $("#theCard").children().remove();
        newDiv.children().remove();
        newDiv.delay(2000).css({"background-color":"transparent"})
        carrito.children().remove();
        carrito.toggle("fast");     
    })    
        carritoTotal = 0;
    }
    
)
//
