import JustValidate from "just-validate";

let LOCAL_VALUES = "feedback-form-state";

let formData = getStorageData();

updateText();

const currentForm = document.querySelector(".feedback-form");

currentForm.addEventListener("input", (e) => {
	if (e.target.name != "email" && e.target.name != "message") { return; }

	updateLocalStorage(prepareData(e.target.name, e.target.value));

});

function prepareData(key, inputData) {
	formData[key] = inputData.trim();

	return JSON.stringify(formData);
}

function updateLocalStorage(dataUpdate) {
	localStorage.setItem(LOCAL_VALUES, dataUpdate);
}

function getStorageData() {
	return JSON.parse(localStorage.getItem(LOCAL_VALUES)) || { email: "", message: "" };
}

function updateText() {
	formData = getStorageData();
	for (const key in formData) {
		const keyValue = formData[key]
		document.querySelector(`#${key}`).value = keyValue;

		updateLocalStorage(prepareData(key, keyValue));
	}
}

//валідатор - ми ж бібліотеки вивчаємо, правда
const validator = new JustValidate('.feedback-form');
validator
	.addField('.form-input', [
		{
			rule: 'required',
			errorMessage: "Поле email - обов'язкове",
		},
		{
			rule: 'required',
		},
		{
			rule: 'email',
			errorMessage: 'Не правильний формат. Перевірте ще раз.'
		},
	])
	.addField('.form-text', [
		{
			validator: (value) => {
				return value !== undefined && String(value).trim().length > 3;
			},
			errorMessage: 'Повідомлення повинне бути не менше 3 символів. З трьох символів лише погані повідомлення',
		},
	])
	.onSuccess(() => {
		console.log("success", formData);
		localStorage.removeItem(LOCAL_VALUES);
		formData = getStorageData();
		currentForm.reset();
		//console.log(formData, localStorage.getItem(LOCAL_VALUES));

	});