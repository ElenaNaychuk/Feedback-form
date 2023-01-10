import { useState } from 'react';
import Inputmask from "inputmask";
import { sendDataToServer } from './sendingDataToServer';
import { onBlur, validateForm } from './validateForm'
import style from './feedbackForm.module.scss';

function FeedbackForm({ closeFeedbackForm }) {

    const [inputValues, setInputValues] = useState({
        userName: '',
        phone: '',
        message: '',
        text: '',
        title: '',
    });
    const [visited, setVisited] = useState({});
    const [sentAttempt, setSentAttempt] = useState(false);

    const onBlur = e => {
        setVisited({ ...visited, [e.target.name]: true })
    }

    const errors = validateForm(inputValues);

    const error = name => {
        return (visited[name] || sentAttempt) && errors[name];
    }

    async function onSubmit() {
        // e.preventDefault();
        setSentAttempt(true);
        sendDataToServer(inputValues);
    }

    const hasErrors = () => Object.values(errors).length > 0


    function setInputValue(name, value) {
        setInputValues({ ...inputValues, [name]: value });
    }

    const onNameChange = ({ target: { name, value } }) => {
        let userName = value.trim();
        let newUserName = userName.toLowerCase();
        let newName = newUserName.charAt(0).toUpperCase() + newUserName.slice(1);
        userName = newName;
        setInputValue(name, userName);
    }

    const onPhoneChange = ({ target: { name, value } }) => {
        const phoneNumber = value;
        const phone = phoneNumber.replace(/[^0-9+]/g, '')
        setInputValue(name, phone);
    }

    const onMessageChange = ({ target: { name, value } }) => setInputValue(name, value);

    Inputmask({ "mask": "+7(999)999-99-99" }).mask('#phone');
    return (
        <section className={style.favDialog}>
            <form className={style.form} onSubmit={onSubmit}>
                <h3 className={style.form__title}>{inputValues.title}</h3>
                <input
                    onChange={onNameChange}
                    onBlur={onBlur}
                    className={style.form__input}
                    type="text"
                    placeholder='Имя'
                    name='userName'
                    value={inputValues.userName}
                />
                <p className={style.form__errorMessage}>{error('userName')}</p>
                <input
                    onChange={onPhoneChange}
                    onBlur={onBlur}
                    className={style.form__input}
                    type="text"
                    placeholder='+7(999)999-99-99'
                    name="phone"
                    value={inputValues.phone}
                    id="phone"
                />
                <p className={style.form__errorMessage}>{error('phone')}</p>
                <textarea
                    onChange={onMessageChange}
                    onBlur={onBlur}
                    className={style.form__input}
                    placeholder='Введите сообщение'
                    rows="5"
                    cols="33"
                    name='message'
                    value={inputValues.message}
                />
                <p className={style.form__errorMessage}>{error('message')}</p>
                <div className={style.form__text}>{inputValues.text}</div>
                <button
                    onClick={onSubmit}
                    className={style.form__submitBtn}
                    disabled={hasErrors()}
                >Отправить</button>
                <button
                    onClick={closeFeedbackForm}
                    className={style.form__closeBtn}
                >&#10006;</button>
            </form>
            {sentAttempt ? <p className={style.form__info}>Форма успешно отправлена</p> : null}
        </section>
    )
}

export default FeedbackForm;