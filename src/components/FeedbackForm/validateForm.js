
export const validateForm = (values) => {
    const regexp = /[^A-Za-z]+/g;
    const errors = {};

    if (!values.userName) {
        errors.userName = 'Введите имя';
    } else if (regexp.test(values.userName)) {
        errors.userName = 'Недопустимые символы!';
    }

    if (!values.phone) {
        errors.phone = 'Введите номер телефона';
    }

    if (!values.message) {
        errors.message = 'Введите сообщение';
    }
    return errors;
}
