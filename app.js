const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const cardDiv = document.querySelector('.card');
const dateDiv = document.querySelector('.date');
const url = 'https://api.github.com/users/';
const preloader = document.querySelector('.preloader');
const form = document.getElementById('form');
const usernameInput = document.getElementById('usernameInput');
let usernameInputValue = usernameInput.value;
console.log('usernameInputValue###', typeof usernameInputValue);
let nickName = usernameInputValue;

const startPreloader = () => preloader.classList.remove('hidden');
const stopPreloader = () => preloader.classList.add('hidden');
const closeInputForm = () => {
    cardDiv.classList.remove('hidden');
    form.classList.remove('form');
    form.classList.add('hidden');
};
const delay = ms => new Promise((resolve) => setTimeout(() => resolve(), ms));

usernameInput.onchange = (event) => {
    console.log('event', event);
    console.log('event target', event.target);
    console.log('event target value', event.target.value);
    usernameInputValue = event.target.value;
    nickName = usernameInputValue;
}

async function getResponse() {
    try {
        const response = await fetch(`${url}${nickName}`);
        if (!response.ok) {
            throw new Error('не удалось найти такого пользователя');
        }
        return response.json();
    } catch (error) {
        console.log(`Fetch Error: ${error.message} o_O`);
    }

}

async function getDate() {
    console.log('arguments', arguments);
    await delay(4000);
    return new Date();
}

function getUserData(obj) {
    const {name, bio, avatar_url, html_url} = obj;

    !name ? userName.append(' Информация о пользователе недоступна!') : userName.append(name);
    !bio ? userBio.append(' Информация о пользователе недоступна!') : userBio.append(bio);

    let photo = new Image(300, 400);
    photo.src = avatar_url;
    userPhoto.append(photo);

    let link = html_url;
    userName.onclick = () => window.location.assign(link);
    userName.style.cursor = 'pointer';

    return {name, bio, avatar_url, html_url};
}

form.onsubmit = (event) => {
    event.preventDefault();
    startPreloader();
    closeInputForm();


    Promise.all([getResponse(), getDate()])
        .then(([response, date]) => {
            setTimeout(stopPreloader, 2000);
            dateDiv.append(date);
            getUserData(response);
        })
}






    