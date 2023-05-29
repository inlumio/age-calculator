import moment from 'https://cdn.jsdelivr.net/npm/moment@2.29.4/+esm';
import momentPreciseRangePlugin from 'https://cdn.jsdelivr.net/npm/moment-precise-range-plugin@1.3.0/+esm';

const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const button = document.querySelector('.app__btn');
const dayResult = document.querySelector('[data-result="day"]');
const monthResult = document.querySelector('[data-result="month"]');
const yearResult = document.querySelector('[data-result="year"]');

let setResults = (days, months, years) => {
	dayResult.innerText = days;
	monthResult.innerText = months;
	yearResult.innerText = years;
};

let getDatesDifference = (starts) => {
	return moment.preciseDiff(starts, moment.now(), true);
};

let checkDay = (dayInput) => {
	let day = parseInt(dayInput.value);
	if (isNaN(day)) {
		return { isValid: false, errMessage: 'This field is required' };
	}
	if (day > 31 || day < 1) {
		return { isValid: false, errMessage: 'Must be a valid day' };
	}
	return { isValid: true, errMessage: '' };
};

let checkMonth = (monthInput) => {
	let month = parseInt(monthInput.value);
	if (isNaN(month)) {
		return { isValid: false, errMessage: 'This field is required' };
	}
	if (month > 12 || month < 1) {
		return { isValid: false, errMessage: 'Must be a valid month' };
	}
	return { isValid: true, errMessage: '' };
};

let checkYear = (yearInput) => {
	let year = parseInt(yearInput.value);
	if (isNaN(year)) {
		return { isValid: false, errMessage: 'This field is required' };
	}
	if (year > new Date().getFullYear()) {
		return { isValid: false, errMessage: 'Must be in the past' };
	}
	return { isValid: true, errMessage: '' };
};

let fieldChecking = (field, checkFn) => {
	let checkResult = checkFn(field);
	setFieldsetValidity(field, checkResult.isValid, checkResult.errMessage);
	return checkResult.isValid;
};

let setFieldsetValidity = (input, isValid, message) => {
	input.closest('.app__input-set').setAttribute('aria-invalid', !isValid);
	input.closest('.app__input-set').querySelector('.app__warning').innerText =
		message;
};

let checkDate = function () {
	let dayCheck = fieldChecking(dayInput, checkDay);
	let monthCheck = fieldChecking(monthInput, checkMonth);
	let yearCheck = fieldChecking(yearInput, checkYear);

	if (!(dayCheck && monthCheck && yearCheck)) {
		setResults('--', '--', '--');
		return;
	}

	let dateMoment = moment({
		year: yearInput.value,
		month: monthInput.value - 1,
		day: dayInput.value,
	});

	if (!dateMoment.isValid()) {
		setFieldsetValidity(dayInput, false, 'Must be a valid date');
		setFieldsetValidity(monthInput, false, '');
		setFieldsetValidity(yearInput, false, '');
		setResults('--', '--', '--');
		return;
	}

	let diff = getDatesDifference(dateMoment);
	setResults(diff.days, diff.months, diff.years);
};

button.addEventListener('click', (e) => {
	e.preventDefault();
	checkDate();
});
