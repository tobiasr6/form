let formGroup = document.getElementById('form');
let nombreForm = document.getElementById('nombre');
let apellidoForm = document.getElementById('apellido');
let calleForm = document.getElementById('calle');
let numForm = document.getElementById('número');
let pisoForm = document.getElementById('piso');
let deptoForm = document.getElementById('depto');
let selectCiudades = document.getElementById('ciudad');
let erroresDiv = document.getElementById('errores');

let user = []

formGroup.addEventListener('submit', (event) => {
    event.preventDefault();

    erroresDiv.innerHTML = '';
    erroresDiv.classList.remove('rojo');
    user = []

    let valid = true;
    let errores = [];

    if (!verificarCampo(nombreForm, 40, errores)) valid = false;
    if (!verificarCampo(apellidoForm, 40, errores)) valid = false;
    if (!verificarCampo(calleForm, 100, errores)) valid = false;
    if (!verificarCampo(numForm, 5, errores)) valid = false;
    if (!verificarPisoDepto(pisoForm, deptoForm, errores)) valid = false;
    if (!verificarSelect(selectCiudades, errores)) valid = false;

    if (!verificarCampoNumerico(numForm, errores)) valid = false;
    if (!verificarCampoNumerico(pisoForm, errores)) valid = false;
    if (!verificarCampoNumerico(deptoForm, errores)) valid = false;


    if (valid) {
        console.log('Formulario enviado');
        console.log(user.join('\n'));
        erroresDiv.innerHTML = '';
    } else {
        mostrarErrores(errores);
        erroresDiv.classList.add('rojo');
    }
});

function verificarCampoNumerico(input, errores) {
    let value = input.value.trim();
    if (isNaN(value)) {
        errores.push(`El campo ${input.name} debe ser numérico.`);
        return false;
    } 
    return true;
}


function verificarCampo(input, maxLength, errores) {
    let value = input.value.trim();
    if (value === '') {
        errores.push(`El campo ${input.name} es obligatorio.`);
        return false;
    } else if (value.length > maxLength) {
        errores.push(`El campo ${input.name} no puede exceder los ${maxLength} caracteres.`);
        return false;
    } 
    user.push(`${input.name}:${value}`);
    return true;

}

function verificarPisoDepto(pisoInput, deptoInput, errores) {
    let pisoValue = pisoInput.value.trim();
    let deptoValue = deptoInput.value.trim();

    if (pisoValue !== '') {
        if (!verificarCampo(pisoInput, 2, errores)) return false;
        if (deptoValue === '') {
            errores.push('Si ingresa un piso, también debe ingresar un número de departamento.');
            return false;
        } else if (deptoValue.length > 2) {
            errores.push('El campo departamento no puede exceder los 2 caracteres.');
            return false;
        }
    } else if (deptoValue !== '') {
        errores.push('Si ingresa un número de departamento, también debe ingresar un piso.');
        return false;
    }
    user.push(`${deptoInput.name}:${deptoValue}`);
    return true;
}

function verificarSelect(select, errores) {
    if (select.value === '' || select.value === 'Seleccione una ciudad') {
        errores.push(`Debe seleccionar una ciudad.`);
        return false;
    }
    return true;
}

let ciudades = ['Villa María', 'Villa Nueva', 'Córdoba'];

function cargarCiudades() {
    selectCiudades.innerHTML = '';

    let defaultCity = document.createElement('option');
    defaultCity.text = 'Seleccione una ciudad';
    defaultCity.disabled = true;
    defaultCity.selected = true;
    selectCiudades.add(defaultCity);

    ciudades.forEach(function(ciudad) {
        let optionCity = document.createElement('option');
        optionCity.value = ciudad;
        optionCity.text = ciudad;
        selectCiudades.add(optionCity);
    });
}

function mostrarErrores(errores) {
    let ul = document.createElement('ul');
    errores.forEach(error => {
        let li = document.createElement('li');
        li.textContent = error;
        ul.appendChild(li);
    });
    erroresDiv.appendChild(ul);
}

cargarCiudades();
