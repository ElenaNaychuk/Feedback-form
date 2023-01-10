const url = '#';
export async function sendDataToServer({ form }) {
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        })
    } catch (error) {
        console.log(error);
        alert('Произошла ошибка! Попробуйте ещё раз')
    }
}
