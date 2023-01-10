import { useState, useEffect } from 'react';
import style from './feedbackForm.module.scss'

function FeedbackForm({ closeFeedbackForm }) {

    const [inputValue, setInputValue] = useState({
        userName: '',
        phone: '',
        message: '',
        isValid: false,
    });

    const [errors, setErrors] = useState({
        userName: '',
        phone: '',
        message: '',
    });

    console.log(errors);
    useEffect(() => setInputValue(inputValue), [inputValue]);
    useEffect(() => setErrors(errors), [errors]);

    console.log(inputValue);

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputValue({ ...inputValue, [name]: value })
    }

    const validateForm = (values) => {
        if (!values.userName) {
            errors.userName = 'Введите имя!';
            setInputValue({ ...inputValue, isValid: true })
        }
        if (!values.phone) {
            errors.phone = 'Введите номер телефона!';
            setInputValue({ ...inputValue, isValid: true })

        } else if (/^\d+$/.test(values.phone)) {
            errors.phone = 'Телефон заполнен неверно!';
            setInputValue({ ...inputValue, isValid: true })

        }
        if (!values.message) {
            errors.message = 'Введите сообщение!';
            setInputValue({ ...inputValue, isValid: true })

        }
        return errors;
    }

    const handleSendButton = (e) => {
        e.preventDefault();
        const error = setErrors(validateForm(inputValue));
    }

    return (
        <section className={style.favDialog}>
            <form className={style.form}>
                <input
                    onChange={handleInputChange}
                    className={style.form__input}
                    type="text"
                    placeholder='Имя'
                    name='userName'
                    value={inputValue.userName}
                />
                <p className={style.form__errorMessage}>{errors.userName}</p>
                <input
                    onChange={handleInputChange}
                    className={style.form__input}
                    type="text"
                    placeholder='+7 (999) 999-99-99'
                    minLength='18'
                    name="phone"
                    value={inputValue.phone}
                />
                <p className={style.form__errorMessage}>{errors.phone}</p>
                <textarea
                    onChange={handleInputChange}
                    className={style.form__input}
                    placeholder='Введите сообщение'
                    rows="5"
                    cols="33"
                    name='message'
                    value={inputValue.message}
                />
                <p className={style.form__errorMessage}>{errors.message}</p>
                <button onClick={closeFeedbackForm} className={style.form__closeBtn}>&#10006;</button>
                <button
                    onClick={handleSendButton}
                    className={style.form__submitBtn}
                >
                    Отправить
                </button>
            </form>
        </section>
    );
}

export default FeedbackForm;