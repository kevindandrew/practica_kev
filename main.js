const log=document.querySelector(".loggin")
const game=document.querySelector(".game-container")

const botonelec1=document.querySelector(".boton_1")
const botonelec2=document.querySelector(".boton_2")

const cpu_elec=document.querySelector(".CPUE")
const humano_elec=document.querySelector(".player")
const celdas = document.querySelectorAll('.cell');


const mensajearriba=document.querySelector(".player-btn")


const botonplayercont=document.querySelector(".x-button")
const botonempatencont=document.querySelector(".ties-button")
const botoncpucont=document.querySelector(".o-button")
const resetgame=document.querySelector(".reload-button")

const modalsito=document.querySelector(".modal")




console.log(modalsito)

botonelec1.addEventListener("click", eleccion1);
botonelec2.addEventListener("click", eleccion2);

let elegido=botonelec2;

/* para cambiar el color de los botones */
function eleccion1() {
  
    botonelec1.classList.add("seleccionado");
    botonelec2.classList.remove("seleccionado");
    elegido = botonelec1;
}

function eleccion2() {
    
    botonelec2.classList.add("seleccionado");
    botonelec1.classList.remove("seleccionado");
    elegido = botonelec2;
}

cpu_elec.addEventListener("click",partida)
humano_elec.addEventListener("click",partidaDosJugadores)

function partida() {

    let wins=0;
    let  lose=0;
    let empates=0;
    resetgame.addEventListener("click",reiniciarJuego)
   
    log.classList.add("hidden")
    game.classList.remove("hidden")
    mensajearriba.textContent="X turn"
    
    let simboloJugador = elegido.textContent; 
    console.log(elegido.textContent)
    let simboloCPU ="";
    if (simboloJugador === 'X') {
        simboloCPU = 'O';
    } else {
        simboloCPU = 'X';
    }

    if (simboloJugador === 'X') {
        
        celdas.forEach(celda => {
            celda.addEventListener('click', jugadorMovimiento);
        });
    }else{
           
        cpuMovimiento();
        celdas.forEach(celda => {
            celda.addEventListener('click', jugadorMovimiento);
        });
        }
        
    

    function jugadorMovimiento(event) {
       mensajearriba.textContent="X turn"
        const celda= event.target;
        

        if(celda.textContent===""){
            celda.textContent=simboloJugador
            if(simboloCPU === 'O'&& simboloJugador==="X"){
                celda.classList.add("x-icon")
                celda.classList.add("jugador")
            }else{
                celda.classList.add("o-icon")
                celda.classList.add("jugador")
            }
            if(verifivarGanador(simboloJugador)){
                botonplayercont.textContent=`X (YOU)`
                const br=document.createElement("br")
                wins=wins+1
                botonplayercont.append(br,wins)
                mostrarmodalsito(simboloJugador,"jugador")
               reiniciarJuego()
                return
            }
            if (verificarEmpate()) {
                botonempatencont.textContent=`TIES`
                const br=document.createElement("br")
                empates=empates+1
                botonempatencont.append(br,empates)
                mostrarmodalsito(simboloJugador,"empate")
                reiniciarJuego();
                return;
            }
            setTimeout(cpuMovimiento,500)

        }
    }
    function cpuMovimiento() {

        mensajearriba.textContent="O turn"

        const celdasVacias=Array.from(celdas).filter(celda =>celda.textContent==="")
        if(celdasVacias.length>0){
            const eleccionCPU = celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
            eleccionCPU.textContent=simboloCPU
            if (simboloCPU === 'O'&& simboloJugador==="X") {
                eleccionCPU.classList.add("o-icon");
                eleccionCPU.classList.add("cpu");
            } else {
                eleccionCPU.classList.add("x-icon");
                eleccionCPU.classList.add("cpu");
            }            
            if(verifivarGanador(simboloCPU)){
                botoncpucont.textContent=`O (CPU)`
                const br=document.createElement("br")
                lose=lose+1
                botoncpucont.append(br,lose)
                mostrarmodalsito(simboloCPU,"cpu")
                reiniciarJuego()
                return
            }
            if (verificarEmpate()) {
                botonempatencont.textContent=`TIES`
                const br=document.createElement("br")
                empates=empates+1
                botonempatencont.append(br,empates)
                mostrarmodalsito(simboloCPU,"empate")

               reiniciarJuego();
                return;
            }
        }
    }

    function verifivarGanador(simbolo) {
        const combinacionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return combinacionesGanadoras.some(combinacion => {
            return combinacion.every(index => {
                return celdas[index].textContent === simbolo;
            });
        });
    }
        
        function verificarEmpate() {
            return Array.from(celdas).every(celda => celda.textContent !== "");
        }

    function mostrarmodalsito(simbolo,player) {
        modalsito.innerHTML="";
        let template="";
        if(player==="jugador"){
         template=`<div class="modal-content">
            <h2>YOU WON!</h2>
            <p><span class="x-icon">${simbolo}</span> TAKES THE ROUND</p>
            <div class="button-container">
                <button class="quit">QUIT</button>
                <button class="next">NEXT ROUND</button>
            </div>
        </div>`
    }else{
        if(player==="cpu"){
             template=`<div class="modal-content">
            <h2>YOU LOSE!</h2>
            <p><span class="x-icon">${simbolo}</span> TAKES THE ROUND</p>
            <div class="button-container">
                <button class="quit">QUIT</button>
                <button class="next">NEXT ROUND</button>
            </div>
        </div>`
        }else{
            template=`<div class="modal-content">
            <h2>EMPATE!</h2>
           
            <div class="button-container">
                <button class="quit">QUIT</button>
                <button class="next">NEXT ROUND</button>
            </div>
        </div>`
        }
    }
    modalsito.innerHTML=template;

    const salir=document.querySelector(".quit")
    const regresao=document.querySelector(".next")

    salir.addEventListener("click",saliratras)
    regresao.addEventListener("click",regresar)

    modalsito.classList.remove("hidden")
    }
    
    function reiniciarJuego() {
        celdas.forEach(celda => {
            celda.textContent = '';
            celda.classList.remove('jugador', 'cpu',"o-icon","x-icon");
            mensajearriba.textContent="X turn"
        });
    }
    function saliratras(){
        modalsito.classList.add("hidden")
        game.classList.add("hidden")
        log.classList.remove("hidden")
        reiniciarJuego()
    }
    function regresar() {
        modalsito.classList.add("hidden")
    }
}

function partidaDosJugadores() {

    let winsX = 0;
    let winsO = 0;
    let empates = 0;
    let turnoActual = 'X'; 
    resetgame.addEventListener("click", reiniciarJuego);
   
    log.classList.add("hidden");
    game.classList.remove("hidden");
    mensajearriba.textContent = "X turn"; 
    celdas.forEach(celda => {
        celda.addEventListener('click', jugadorMovimiento);
    });

    function jugadorMovimiento(event) {
        const celda = event.target;

        if (celda.textContent === "") {
            celda.textContent = turnoActual;
            
            if (turnoActual === 'X') {
                celda.classList.add("x-icon", "jugador");
            } else {
                celda.classList.add("o-icon", "jugador");
            }

            
            if (verifivarGanador(turnoActual)) {
                if (turnoActual === 'X') {
                    winsX++;
                    botonplayercont.textContent = `X (Player 1)`;
                    botonplayercont.append(document.createElement("br"), winsX);
                } else {
                    winsO++;
                    botoncpucont.textContent = `O (Player 2)`;
                    botoncpucont.append(document.createElement("br"), winsO);
                }
                mostrarmodalsito(turnoActual, "jugador");
                reiniciarJuego();
                return;
            }

            // Verificar si hay empate
            if (verificarEmpate()) {
                empates++;
                botonempatencont.textContent = `TIES`;
                botonempatencont.append(document.createElement("br"), empates);
                mostrarmodalsito(turnoActual, "empate");
                reiniciarJuego();
                return;
            }

            // Cambiar turno
            turnoActual = turnoActual === 'X' ? 'O' : 'X';
            mensajearriba.textContent = `${turnoActual} turn`;
        }
    }

    function verifivarGanador(simbolo) {
        const combinacionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return combinacionesGanadoras.some(combinacion => {
            return combinacion.every(index => {
                return celdas[index].textContent === simbolo;
            });
        });
    }

    function verificarEmpate() {
        return Array.from(celdas).every(celda => celda.textContent !== "");
    }

    function mostrarmodalsito(simbolo, player) {
        modalsito.innerHTML = "";
        let template = "";
        if (player === "jugador") {
            template = `<div class="modal-content">
                <h2>${simbolo === 'X' ? 'Player 1' : 'Player 2'} WINS!</h2>
                <p><span class="${simbolo === 'X' ? 'x-icon' : 'o-icon'}">${simbolo}</span> TAKES THE ROUND</p>
                <div class="button-container">
                    <button class="quit">QUIT</button>
                    <button class="next">NEXT ROUND</button>
                </div>
            </div>`;
        } else {
            template = `<div class="modal-content">
                <h2>IT'S A TIE!</h2>
                <div class="button-container">
                    <button class="quit">QUIT</button>
                    <button class="next">NEXT ROUND</button>
                </div>
            </div>`;
        }
        modalsito.innerHTML = template;

        const salir = document.querySelector(".quit");
        const siguienteRonda = document.querySelector(".next");

        salir.addEventListener("click", saliratras);
        siguienteRonda.addEventListener("click", regresar);

        modalsito.classList.remove("hidden");
    }

    function reiniciarJuego() {
        celdas.forEach(celda => {
            celda.textContent = '';
            celda.classList.remove('jugador', 'cpu', "o-icon", "x-icon");
        });
        turnoActual = 'X';
        mensajearriba.textContent = "X turn";
    }

    function saliratras() {
        modalsito.classList.add("hidden");
        game.classList.add("hidden");
        log.classList.remove("hidden");
        reiniciarJuego();
    }

    function regresar() {
        modalsito.classList.add("hidden");
    }
}
