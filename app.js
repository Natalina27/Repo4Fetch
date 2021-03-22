const userPhoto = document.querySelector('.user__photo');
const userName = document.querySelector('.user__nickname');
const userBio = document.querySelector('.user__description');
const url = 'https://api.github.com/users/';

let nickName = prompt('Enter Your NickName', 'Icreateacoolname');
if (!nickName) {
  nickName = 'Icreateacoolname';
}

const delay = ms => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

async function getResponse() {
  await delay(2000);
  const response = await fetch(`${url}${nickName}`);

  return response.json();
} //получает запров в виде json файла

async function getUserData() {
  try {
    const content = await getResponse();
    console.log('content',content);
    const{name, bio, avatar_url,html_url } = content;

    userName.append(name);
    userBio.append(bio);
    let photo = new Image(300, 400);
    photo.src = avatar_url;
    userPhoto.append(photo);

    let link = html_url;
    userName.onclick = () => window.location.assign(link);
    userName.style.cursor = 'pointer';

    return { name, bio, avatar_url,html_url};
  }
  catch(error) {
    userBio.append(error.message);
    console.error(error);
  }
}//дожидается конца работы getResponse и работает с данными

async function getDate() {
  await delay(2000);
  console.log (new Date());
  return new Date();
}

Promise.all([getUserData(), getDate()])
    .then((result) =>{
      console.log(result);
    })

// getUserData();
// getDate();


