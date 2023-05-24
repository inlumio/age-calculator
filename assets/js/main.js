import moment from 'https://cdn.jsdelivr.net/npm/moment@2.29.4/+esm';
import momentPreciseRangePlugin from 'https://cdn.jsdelivr.net/npm/moment-precise-range-plugin@1.3.0/+esm';

const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const button = document.querySelector('.app__btn');
const dayResult = document.querySelector('[data-result="day"]');
const monthResult = document.querySelector('[data-result="month"]');
const yearResult = document.querySelector('[data-result="year"]');

button.addEventListener('click', (e) => {
	e.preventDefault();
	checkDate();
});

function checkDate() {
	let now = new Date();
	let dayChecking = checkInput(dayInput);
	let monthChecking = checkInput(monthInput);
	let yearChecking = checkInput(yearInput);
	if (dayChecking && monthChecking && yearChecking) {
		let enteredDate = new Date(
			`${parseInt(yearInput.value)}-${parseInt(monthInput.value)}-${parseInt(
				dayInput.value
			)}`
		);
		const inputSets = document.querySelectorAll('.app__input-set');
		const firsWaringField = document.querySelector('.app__warning');
		if (!dateIsValid(enteredDate)) {
			inputSets.forEach((inputSet) =>
				inputSet.setAttribute('aria-invalid', true)
			);
			firsWaringField.innerText = 'Must be a valid date';
		} else {
			let date = new Date(
				yearInput.value,
				monthInput.value - 1,
				dayInput.value
			);
			if (date > now) {
				inputSets.forEach((inputSet) =>
					inputSet.setAttribute('aria-invalid', true)
				);
				firsWaringField.innerText = 'Must be the past';
			} else {
				let diff = getDatesDifference(enteredDate);
				dayResult.innerText = diff.days;
				monthResult.innerText = diff.months;
				yearResult.innerText = diff.years;
			}
		}
	}
}

function getDatesDifference(starts) {
	return moment.preciseDiff(starts, moment.now(), true);
}

function dateIsValid(date) {
	return date instanceof Date && !isNaN(date);
}

function checkInput(input) {
	const inputValue = parseInt(input.value);
	const inputSet = input.closest('.app__input-set');
	const errField = inputSet.querySelector('.app__warning');
	const id = input.getAttribute('id');

	if (isNaN(inputValue)) {
		inputSet.setAttribute('aria-invalid', true);
		errField.innerText = 'This field is required';
		return false;
	}

	if (id === 'year') {
		if (inputValue > new Date().getFullYear()) {
			inputSet.setAttribute('aria-invalid', true);
			errField.innerText = `Must be in the past`;
			return false;
		}

		if (inputValue < input.getAttribute('min')) {
			inputSet.setAttribute('aria-invalid', true);
			errField.innerText = `Must be in A.D.`;
			return false;
		}
	} else {
		if (
			inputValue < input.getAttribute('min') ||
			inputValue > input.getAttribute('max')
		) {
			inputSet.setAttribute('aria-invalid', true);
			errField.innerText = `Must be valid ${id}`;
			return false;
		}
	}

	inputSet.setAttribute('aria-invalid', false);
	return true;
}
