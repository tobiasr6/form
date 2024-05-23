let formGroup = document.getElementById('guardar');
let listGroup = document.getElementById('listar');

let nombreForm = document.getElementById('nombre');
let apellidoForm = document.getElementById('apellido');
let calleForm = document.getElementById('calle');
let numForm = document.getElementById('número');
let pisoForm = document.getElementById('piso');
let deptoForm = document.getElementById('depto');
let selectCiudades = document.getElementById('ciudad');
let erroresDiv = document.getElementById('errores');
let usersDiv = document.getElementById('users');
let valid = true;
let errores = [];
let dataArray = [];
let cargasRealizadas = 0;

formGroup.addEventListener('click', (event) => {
    event.preventDefault();
    erroresDiv.innerHTML = '';
    erroresDiv.classList.remove('rojo');
    valid = true;
    errores = [];
    let user = {};  

    if (!verificarCampo(nombreForm, 40, errores, user)) valid = false;
    if (!verificarCampo(apellidoForm, 40, errores, user)) valid = false;
    if (!verificarCampo(calleForm, 100, errores, user)) valid = false;
    if (!verificarCampo(numForm, 5, errores, user)) valid = false;
    if (!verificarPisoDepto(pisoForm, deptoForm, errores, user)) valid = false;
    if (!verificarSelect(selectCiudades, errores, user)) valid = false;

    if (!verificarCampoNumerico(numForm, errores)) valid = false;
    if (!verificarCampoNumerico(pisoForm, errores)) valid = false;
    if (!verificarCampoNumerico(deptoForm, errores)) valid = false;

    if (valid) {
        if (cargasRealizadas < 3) {

            dataArray.push({...user, sector: obtenerSectorAleatorio()});
            cargasRealizadas++;

            erroresDiv.innerHTML = '';

            nombreForm.value = '';
            apellidoForm.value = '';
            calleForm.value = '';
            numForm.value = '';
            pisoForm.value = '';
            deptoForm.value = '';
            selectCiudades.value = 'Seleccione una ciudad';

            const index = sectoresDisponibles.indexOf(sectorAleatorio);
            if (index !== -1) {
                sectoresDisponibles.splice(index, 1);
            }

        } else if (cargasRealizadas >= 3) {
            console.log('si');
            alert('Se ha alcanzado el límite de cargas (3).');
            formGroup.style.background = 'rgba(74, 144, 226, 0.5)';
            formGroup.style.cursor='none'
            formGroup.disabled = true;

        }
    } else {
        mostrarErrores(errores);
        erroresDiv.classList.add('rojo');
    }
});

listGroup.addEventListener('click', (event) => {
    event.preventDefault();
    mostrarDatos();
    usersDiv.classList.add('green');
});

function verificarCampoNumerico(input, errores) {
    let value = input.value.trim();
    if (value !== '' && isNaN(value)) {
        errores.push(`El campo ${input.name} debe ser numérico.`);
        return false;
    }
    return true;
}

function verificarCampo(input, maxLength, errores, user) {
    let value = input.value.trim();
    if (value === '') {
        errores.push(`El campo ${input.name} es obligatorio.`);
        return false;
    } else if (value.length > maxLength) {
        errores.push(`El campo ${input.name} no puede exceder los ${maxLength} caracteres.`);
        return false;
    } else {
        user[input.name.toLowerCase()] = value;
    }
    return true;
}

function verificarPisoDepto(pisoInput, deptoInput, errores, user) {
    let pisoValue = pisoInput.value.trim();
    let deptoValue = deptoInput.value.trim();

    if (pisoValue !== '') {
        if (!verificarCampo(pisoInput, 2, errores, user)) return false;
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

    if (pisoValue !== '') {
        user[pisoInput.name.toLowerCase()] = pisoValue;
    }

    if (deptoValue !== '') {
        user[deptoInput.name.toLowerCase()] = deptoValue;
    }

    return true;
}

function verificarSelect(select, errores, user) {
    if (select.value === '' || select.value === 'Seleccione una ciudad') {
        errores.push(`Debe seleccionar una ciudad.`);
        return false;
    } else {
        user['ciudad'] = select.value;
    }
    return true;
}

let sectoresDisponibles = ['Depósito', 'Taller', 'Cocina'];

function obtenerSectorAleatorio() {
    if (sectoresDisponibles.length === 0) {
        return null; // Si no quedan sectores disponibles, devolvemos null
    }
    const indice = Math.floor(Math.random() * sectoresDisponibles.length);
    const sector = sectoresDisponibles[indice];
    sectoresDisponibles.splice(indice, 1); 
    return sector;
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

function mostrarDatos() {
    usersDiv.innerHTML = '';

    let acheDos = document.createElement('h2');
    let texto = 'Datos de los usuarios';
    acheDos.textContent = texto;
    usersDiv.appendChild(acheDos);

    dataArray.forEach(user => {
        let p = document.createElement('p');
        let text = `${user.apellido}, ${user.nombre}, cuyo domicilio es ${user.calle} ${user.numero}`;
        if (user.piso) {
            text += `, piso ${user.piso}`;
        }
        if (user.departamento) {
            text += `, departamento ${user.departamento}`;
        }
        text += `, de la ciudad de ${user.ciudad}.`;
        text += ` Tiene asignado el sector: ${user.sector}`;

        p.textContent = text;
        usersDiv.appendChild(p);
    });
}

cargarCiudades();
