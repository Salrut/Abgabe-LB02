const form = document.getElementById('form');
const lastname = document.getElementById('lastname');
const firstname = document.getElementById('firstname');
const username = document.getElementById('username');
const number = document.getElementById('number');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function checkNames(input,errMsg) {
  //const re = /^([ \u00c0-\u01ffa-zA-Z\.' \-]{3,})+$/;
  const re = /^[a-zA-Z]+$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, errMsg);
  }
}


// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Mailadresse ist nicht korrekt');
  }
}


// Check number is valid
function checkNumber(input) {
  //const re = /^\s*\+\s*\d{1,3}\s*-\s*\d{9, 10}\s*$/;
  const re = /^0(2[1-246-7]|3[1-4]|4[13-4]|5[25-6]|6[1-2]|7[15-68-9]|8[17]|91)[0-9]{7}/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Telefonnummer ist nicht korrekt');
  }
}


// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} ist notwendig`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
        input,
        `${getFieldName(input)} muss mindestens ${min} Zeichen haben`
    );
  } else if (input.value.length > max) {
    showError(
        input,
        `${getFieldName(input)} darf höchstens ${max} Zeichen haben`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
  if(!checkRequired([lastname, firstname, username, number, email, password])){
    //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
    checkLength(firstname, 3, 20);
    checkLength(lastname, 3, 20);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);


    checkNumber(number);
    //checkNames(firstname,"Vorname ist nicht korrekt!");
    //checkNames(lastname,"Nachname ist nicht korrekt!");
    checkEmail(email);

  }
}


// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});
