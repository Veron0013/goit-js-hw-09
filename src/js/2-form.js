//import { nanoid } from "nanoid";

//console.log(nanoid());

import JustValidate from "just-validate";

const btn = document.querySelector("form-btn");

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
				return value !== undefined && String(value).length > 3;
			},
			errorMessage: 'Повідомлення повинне бути не менше 3 символів. З трьох символів лише погані повідомлення',
		},
	]);
