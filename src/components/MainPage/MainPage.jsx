import { useState } from 'react';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import style from './mainPage.module.scss';


function MainPage() {
    const [showedFeedbackForm, setShowedFeedbackForm] = useState(false);
    // const [submittedForm,  ]

    const showFeedbackForm = () => setShowedFeedbackForm(true);

    const closeFeedbackForm = () => {
        setShowedFeedbackForm(false)
    }

    return (
        <div className={style.container}>
            <p className={style.text}>Воспользуйтесь формой обратной связи и мы обязательно свяжемся с вами</p>
            <button onClick={showFeedbackForm} className={style.button}>Форма</button>
            {showedFeedbackForm && <FeedbackForm closeFeedbackForm={closeFeedbackForm} />}
        </div>

    );
}

export default MainPage;