import 'parsleyjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import IMask from "imask";

dayjs.extend(customParseFormat);

const phoneMasks = document.querySelectorAll(".js-phone-input")

phoneMasks?.forEach((mask) => {
  IMask(mask, { mask: '+{7}(000)000-00-00' })
})

window.Parsley.addValidator('requiredIfChecked', {
  requirementType: 'string',
  validateString: function (value, requirement) {
    const checkbox = document.querySelector(requirement);

    if (!checkbox) {
      return false;
    }

    if (checkbox.checked && !value.trim()) {
      return false;
    }

    return true;
  },
  messages: {
    en: 'Required field',
    ru: 'Обязательное поле',
  },
  priority: 33,
});

window.Parsley.addValidator('phone', {
  requirementType: 'string',
  validateString: function (value) {
    if (value.trim() === '') return true;
    if(value.length < 12) return false;
  },
  messages: {
    en: 'This value should be a mobile number',
    ru: 'Введите правильный номер мобильного телефона',
  },
});

window.Parsley.addValidator('date', {
  requirementType: 'string',
  validateString: function (value) {
    if (value.trim() === '') return true;
    return dayjs(value, 'DD.MM.YYYY', true).isValid();
  },
  messages: {
    en: 'Enter correct date',
    ru: 'Введите правильно дату',
  },
});

Parsley.addMessages('ru', {
  defaultMessage: 'Некорректное значение.',
  type: {
    email: 'В данном поле может быть только E-mail',
    url: 'Адрес сайта введен неверно.',
    number: 'Введите число.',
    integer: 'Введите целое число.',
    digits: 'Введите только цифры.',
    alphanum: 'Введите буквенно-цифровое значение.',
  },
  notblank: 'Это поле должно быть заполнено.',
  required: 'Обязательное поле',
  pattern: 'Это значение некорректно.',
  min: 'Это значение должно быть не менее чем %s.',
  max: 'Это значение должно быть не более чем %s.',
  range: 'Это значение должно быть от %s до %s.',
  minlength: 'Это значение должно содержать не менее %s символов.',
  maxlength: 'Это значение должно содержать не более %s символов.',
  length: 'Это значение должно содержать от %s до %s символов.',
  mincheck: 'Выберите не менее %s значений.',
  maxcheck: 'Выберите не более %s значений.',
  check: 'Выберите от %s до %s значений.',
  equalto: 'Это значение должно совпадать.',
});

Parsley.addMessages('en', {
  defaultMessage: 'Incorrect value.',
  type: {
    email: 'This field can only contain E-mail',
    url: 'The site address is incorrect.',
    number: 'Enter a number',
    integer: 'Enter an integer.',
    digits: 'Enter digits only.',
    alphanum: 'Enter an alphanumeric value.'
  },
  notblank: 'This field must be filled in.',
  required: 'Required field',
  pattern: 'This value is invalid.',
  min: 'This value must be at least %s.',
  max: 'This value must be no more than %s.',
  range: 'This value must be between %s and %s.',
  minlength: 'This value must contain at least %s characters.',
  maxlength: 'This value must contain no more than %s characters.',
  length: 'This value must contain between %s and %s characters.',
  mincheck: 'Select at least %s values.',
  maxcheck: 'Select no more than %s values.',
  check: 'Select between %s and %s values.',
  equalto: 'This value must match.'
});

const localeLang = document.getElementsByTagName('html')[0].getAttribute('lang').toLowerCase() || 'ru'
Parsley.setLocale(localeLang);

export default function validation() {
  const formsToValidate = Array.from(document.querySelectorAll('form[data-need-validation]'));

  formsToValidate.forEach((form) => {
    $(form).parsley({
      focus: 'none',
      errorClass: 'error',
      successClass: 'success',
      classHandler: (field) => {
        return field.$element.closest('.js-validation-wrapper');
      }
    })
  });
}