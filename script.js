let formGoup = document.getElementById('form');
let nombreForm = document.getElementById('nombre');
let apellidoForm = document.getElementById('apellido');
let calleForm = document.getElementById('calle');
let numForm = document.getElementById('número');
let pisoForm = document.getElementById('piso');
let deptoForm = document.getElementById('depto');
let selectCiudades = document.getElementById('ciudad')

formGoup.addEventListener('submit', (event) => {
    event.preventDefault();

    cargarCiudades();

    let valid = true;
    let errores = [];

    if (!verificarCampo(nombreForm, 40, errores)) valid = false;
    if (!verificarCampo(apellidoForm, 40, errores)) valid = false;
    if (!verificarCampo(calleForm, 100, errores)) valid = false;
    if (!verificarCampo(numForm, 5, errores)) valid = false;

    if (!verificarSelect(selectCiudades, errores)) valid = false;

    if (!verificarPisoDepto(pisoForm, deptoForm, errores)) valid = false;

    if (valid) {
        console.log('Formulario enviado');
    } else {
        let mensajeError = errores.join('\n');
        console.log(mensajeError);
    }

    
});

function verificarCampo(input, maxLength, errores) {
    let value = input.value.trim();
    if (value === '') {
        errores.push(`El campo ${input.name} es obligatorio.`);
        return false;
    } else if (value.length > maxLength) {
        errores.push(`El campo ${input.name} no puede exceder los ${maxLength} caracteres.`);
        return false;
    }
    return true;
}

function verificarPisoDepto(pisoInput, deptoInput, errores) {
    let pisoValue = pisoInput.value.trim();
    let deptoValue = deptoInput.value.trim();

    if (pisoValue !== '') {
        if (!verificarCampo(pisoInput, 2, errores)) return false;
        if (deptoValue === '') {
            errores.push('Si ingresa un Piso, también debe ingresar un número de Departamento.');
            return false;
        } else if (deptoValue.length > 2) {
            errores.push('El campo Departamento no puede exceder los 2 caracteres.');
            return false;
        }
    } else if (deptoValue !== '') {
        errores.push('Si ingresa un Número de Departamento, también debe ingresar un Piso.');
        return false;
    }

    return true;
}

function verificarSelect(select, errores) {
    if (select.value === '' && select.value === 'Seleccione una ciudad') {
        errores.push(`Debe seleccionar una ciudad.`);
        return false;
    }
    return true;
}

let ciudades = ['Villa María', 'Villa Nueva', 'Cordoba']

function cargarCiudades(){
    selectCiudades.innerHTML = '';
    
    let defaultCity = document.createElement('option')
    defaultCity.text='Seleccione una ciudad'
    defaultCity.disabled=true;
    defaultCity.selected=true;
    selectCiudades.add(defaultCity)

    ciudades.forEach(function(ciudad){
        let optionCity = document.createElement('option')

        optionCity.value=ciudad;
        optionCity.text=ciudad;
        selectCiudades.add(optionCity)
    })
}

cargarCiudades();





