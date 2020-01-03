// validacion de formulario
var nombre = document.getElementById("nombre");
var telefono = document.getElementById("telefono");
var semana = document.getElementById("semana");

function valida(){
    nombre.addEventListener("input", verifica_datos, false);
    telefono.addEventListener("input", verifica_datos, false);
    semana.addEventListener("input", verifica_datos, false);
    guardarItem();
}

function verifica_datos(){
    if (nombre.value=="") {
        nombre.setCustomValidity("Falta tu nombre");
    }else{
        nombre.setCustomValidity("");
    }
    if (!(/^\d{2}-\d{4}-\d{4}$/.test(telefono.value)) || telefono=="") {
        telefono.setCustomValidity("Falta tu telefono o esta mal puesto");
    } else {
        telefono.setCustomValidity("");
    }
    if (semana.value==""){
        semana.setCustomValidity("¿En que semana pasas?");
    }else{
        semana.setCustomValidity("");
    }

}

// webstorage

function guardarItem(){
    verifica_datos()
    var n = nombre.value
    var t = telefono.value
    var s = semana.value
    var texto = "Hola "+n+", tenes una visita pactada para la semana "+s+", con tu numero "+ t+"";
    localStorage.setItem("visita", texto);
}

function mostrarDatos(){
    var zonaDatos = document.getElementById("zonadatos");
    var elvalor = localStorage.getItem("visita")
    if (localStorage.getItem("visita")){
        zonaDatos.textContent=""+elvalor+"";
    }else{
        zonaDatos.textContent="No tienes fecha agendada";
    }
}

function eliminarDatos(){
    var zonaDatos = document.getElementById("zonadatos");
    localStorage.clear("visita");
    if (mostrarDatos()==null){
        zonaDatos.textContent="No tienes fecha agendada";
    }
}
//funciones para el video

var video = document.getElementById("mivideo");
var btn = document.getElementById("icono_play");
var volumen = document.getElementById("rango");
var duracion = document.getElementById ("duracion");
var vlm = document.getElementById ("icono_volumen");
video.addEventListener("timeupdate", actulizar_barra);
volumen.addEventListener("change", cambio_volumen);
vlm.addEventListener ("click", mudo);
duracion.addEventListener("change", mover_duracion);

function reproducir(){
    if (video.paused){
        video.play();
        btn.className = "fas fa-pause";
    }else{
        video.pause();
        btn.className = "fas fa-play";
    }
}

function cambio_volumen(){
    video.volume = rango.value
}

function mudo(){
    if (video.muted == false){
        video.muted = true;
        vlm.className = "fas fa-volume-mute";
    }else{
        video.muted = false;
        vlm.className = "fas fa-volume-up";        
    }
}

function actulizar_barra(){
    var valor_segundos = (100 / video.duration) * video.currentTime;
    duracion.value = valor_segundos;
}

function mover_duracion(){
    var tiempo = video.duration * (duracion.value / 100);
    video.currentTime = tiempo;
}

// Canvas

var mov, dibujo, moverX=0;

function dibujarCanvas(){
    mov = document.getElementById ("canvas_obelisco"), 
    dibujo = mov.getContext("2d");
    dibujo.clearRect(0,0,500,500);
    dibujoPintura();
    //carga auto
    var imagen = new Image ();
    imagen.src="https://cdn.pixabay.com/photo/2016/12/31/01/43/auto-1941988_960_720.png";
    dibujo.drawImage(imagen,moverX,220,150,80); //auto
    if (moverX <= 500){
        moverX++;
    }else{
        moverX=-120;
    }
    setTimeout(dibujarCanvas,10);
}

function dibujoPintura(){
    var obelsico = document.getElementById ("canvas_obelisco");
    var dibujo = obelsico.getContext("2d");
    var color_ruta = "#35383d";
    var color_obelisco = "#BAB7B7";
    var cielo = dibujo.createLinearGradient(0,0,0,500);

    // dibuja ruta
    dibujo.fillStyle=color_ruta;
    dibujo.fillRect(0,290,500,20);

    // dibuja cielo
    cielo.addColorStop(0,"#75a0e5");
    cielo.addColorStop(1,"#ffff");
    dibujo.fillStyle=cielo;
    dibujo.fillRect(0,0,500,290);

     //dibuja obelsico cuerpo
    dibujo.strokeStyle=color_obelisco;
    dibujo.rect(340,112,80,180); 
    dibujo.stroke();
    dibujo.fillStyle=color_obelisco;
    dibujo.fillRect(340,112,80,180);

     //dibuja obelsico punta    
    dibujo.beginPath();
    dibujo.strokeStyle=color_obelisco;
    dibujo.moveTo(380,33);
    dibujo.lineTo(420,113);
    dibujo.lineTo(340,113);
    dibujo.lineTo(380,33);
    dibujo.stroke();
    dibujo.closePath();
    dibujo.fillStyle=color_obelisco;
    dibujo.fill();

    dibujo.fillStyle="#7b8596";
    dibujo.fillRect(372,120,15,20);
}

function mostrar_ocultar(){
    var a = document.getElementById("canvas_obelisco");
		if (a.style.display == "none") {
			a.style.display = "block"
		}else{
			a.style.display = "none"
		}
}

window.onload=function(){
    dibujarCanvas();
    mostrarDatos();
}

