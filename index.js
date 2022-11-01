
const form = document.querySelector('#form');
const descriptionField = form.querySelector(`#description`);
const nettoField = form.querySelector(`#netto`);
const formOutput = document.querySelector('#form-output');
const count = document.getElementById('count');
const vat = document.getElementById('vat');
const priceBrutto = document.getElementById('price-brutto')
const attention = document.getElementById('attention')
let bruttoResult;
nettoField.disabled = true;

const handledescriptionInputChange = () => {
	descriptionField.value = descriptionField.value.substr(0, 255);	
	count.innerText = `${255 - descriptionField.value.length}`;
}


const handleVatChange =(fieldValue)=>{
	nettoField.disabled = !fieldValue	
}

const countBrutto = (vatValue, nettoValue)=>{
	if(!!vatValue&&!!nettoValue){
		bruttoResult = vatValue*nettoValue
	priceBrutto.innerHTML=bruttoResult
}
}


const handlenettoInputChange = (fieldvalue) => {
	const numberValue = +fieldvalue.replace(',','.')
	const isNumber = !isNaN(numberValue);
	attention.innerText = isNumber ? '' :'Please, input number'
	return isNumber ? numberValue : isNumber;
}


const submitForm = (value) => {
	new Promise((resolve, reject) => {
		 setTimeout(() => {
			  resolve(value); // <------- For success
			  // reject('Something went wrong'); // <------ For error
		 }, 2000);
	}).then(value => {
		 submitSuccess(value);
	}).catch(error => {
		 submitFailed(error);
	})
}

const setFormOuput = (message) => {
	form.style.display = 'none';
	formOutput.innerHTML = message;
	formOutput.style.opacity = 1;
	formOutput.style.visibility = 'visible';
}

const submitSuccess = (value) => {
	setFormOuput(value);
}

const submitFailed = (error) => {
	setFormOuput(error);
	formOutput.style.color = 'red';
}

form.addEventListener('input', event => {
	const { id, value } = event.target;

	switch(id) {
		 case 'description': {
			  handledescriptionInputChange();
			  break;
		 }
		 case 'netto': {
				countBrutto(handlenettoInputChange(value), +vat.value)			  
			  break;
		 }
		 case 'vat':{
			handleVatChange(value);
			countBrutto(+value,+nettoField.value)
			break;
		 }
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const value = `description value is ${descriptionField.value}, netto value is ${nettoField.value}`
	submitForm(value);
});


