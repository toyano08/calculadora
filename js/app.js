alert('no puede ingresar un numero mayor de 8 o mayor digitos de lo contrario marcarra error');
var Calculadora={
//creando variables 
num1:'', num2:'', resultado:'', ultimaop:'', signo:'', display:'',
//llamando funciones para efectos display y teclas
    init: function () {
        this.display = document.getElementById('display');
        this.aplicarEfectoTeclas();
    },
    aplicarEfectoTeclas: function () {
        var teclas = document.getElementsByClassName('tecla');

        for (var i = 0; i < teclas.length; ++i) {
            teclas[i].onclick = this.presionarTecla;
        }
    },//funciones de operaciones para el primer numero
    sumar: function(a, b){        
        return a + b;        
    },
    restar: function(a, b){
        return a - b;
    },
    multiplicar: function(a, b){
        return a * b;
    },
    dividir: function(a, b){        
            return a / b;        
    },//resetea el valor de la calculadora
    reset: function () {
        display.textContent = '0';
        Calculadora.num1 = '0';
        Calculadora.num2 = '0';
        Calculadora.signo = '0';
        Calculadora.ultimaop = '0';        
    } ,//llamada para realizar la operaciones
    calcular: function () {
        var resultado = 0;
        var error = false;

        switch (Calculadora.signo) {
            case 'mas':                
                resultado = this.sumar(Calculadora.num1, Number(display.textContent));
                Calculadora.ultimaop = 'mas';
                Calculadora.num2 = Number(display.textContent);
                break;
            case 'menos':
                resultado = this.restar(Calculadora.num1, Number(display.textContent));
                Calculadora.ultimaop = 'menos';
                Calculadora.num2 = Number(display.textContent);
                break;
            case 'por':
                resultado = this.multiplicar(Calculadora.num1, Number(display.textContent));
                Calculadora.ultimaop = 'por';
                Calculadora.num2 = Number(display.textContent);
                break;
            case 'dividido':
                if (Number(display.textContent) === 0) {
                    error = true;
                    alert('no se puede dividir entre 0');
                    display.textContent = 'ERROR';
                } else {
                    resultado = this.dividir(Calculadora.num1, Number(display.textContent));
                    Calculadora.ultimaop = 'dividido';
                    Calculadora.num2 = Number(display.textContent);
                }
                break;
            default://realizar operacion con valor acumulado
                var ultimores = Number(display.textContent);
                switch (Calculadora.ultimaop) {
                    case 'mas':
                        resultado = ultimores + Calculadora.num2;
                        break;
                    case 'menos':
                        resultado = ultimores - Calculadora.num2;
                        break;
                    case 'por':
                        resultado = ultimores * Calculadora.num2;
                        break;
                    case 'dividido':
                        resultado = ultimores / Calculadora.num2;
                        break;
                }
        }

        if(resultado.toString().indexOf(".") !== -1){
            resultado = Number(resultado.toFixed(2));
        }
        //validando si es mas de 8 caracteres
        if (resultado.toString().length >= 8) {
            display.textContent = 'ERROR';
            error = true;
        }

        if (!error) {

            if (resultado.toString().indexOf(".") !== -1) {
                display.textContent = resultado.toFixed(2);
            } else {
                display.textContent = resultado;
            }
            Calculadora.signo = '';
        }
    }
    //funcion para el efecto de las teclas
    , presionarTecla: function (event) {
        var tecla = event.target;
        tecla.style.transform = "scale(0.9)";

        setTimeout(function () {
            tecla.style.transform = "scale(1.0)";
        }, 200);
        //para identificar la tecla presionada 
        switch (tecla.alt) {
            case 'On':
                Calculadora.reset();
                break;
            case 'signo':
                if (display.textContent.length > 0) {
                    if (display.textContent.substr(0, 1) === '-') {
                        display.textContent = display.textContent.substr(1);
                    } else {
                        display.textContent = '-' + display.textContent;
                    }
                }
                break;
            case '0':
                if (display.textContent.length > 0 && display.textContent.substr(0, 1) !== '0'
                    || display.textContent.length === 0
                    || display.textContent.indexOf('.') !== -1) {
                    if (Calculadora.comprobandolongitud()) {                        
                        display.textContent = display.textContent + tecla.alt;
                    }
                }

                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (Calculadora.comprobandolongitud()) {                    
                    Calculadora.removercero();

                    display.textContent = display.textContent + tecla.alt;
                }
                break;
            case 'punto':
                if (display.textContent.length > 0 && display.textContent.indexOf('.') === -1) {
                    display.textContent = display.textContent + '.';
                }
                break;

            case 'mas':
            case 'menos':
            case 'por':
            case 'dividido':
                if(display.textContent.length !== 0){
                    Calculadora.num1 = Number(display.textContent);
                }
                Calculadora.signo = tecla.alt;
                display.textContent = '';
                break;
            case 'igual':
                ///calcula los valores ingresados
                Calculadora.calcular();
        }
    },//compronado la longitud no mas de 8 num
        comprobandolongitud: function () {
        if (this.display.textContent.indexOf('-') !== -1) {
            return this.display.textContent.length < 9;
        } else {
            return this.display.textContent.length < 8;
        }
    },//para quitar el cero
     removercero: function () {
        if (this.display.textContent.length === 1 && this.display.textContent === '0') {
            this.display.textContent = '';
        }
    }
    
};
//llama a toda la funcion principal
Calculadora.init();
