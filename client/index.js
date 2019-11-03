document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const userForm = document.querySelector('#addUserForm');
    userForm.addEventListener('submit', addUserFormSubmitted);
    loadPosts();
    const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostFormSubmitted);
    loadLikes();
    const likeForm = document.querySelector('#likePostForm');
    likeForm.addEventListener('submit', addLikeFormSubmitted);
    document.querySelector('#filterPosts').addEventListener('click', loadPosts)
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users`);
    response.data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    let user = response.data.payload;
    let li = document.createElement('li')
    li.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
    document.querySelector('#usersList').append(li)
    // // loadUsers();
}

async function loadPosts() {
    const postsList = document.querySelector('#postsList');
    const user_id = document.querySelector('#filter_id').value;
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts/${user_id}`);
    response.data.payload.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.poster_id},\n${post.body}\n\n`;
        postsList.appendChild(listItem);
    });
}

async function addPostFormSubmitted(event) {
    event.preventDefault();    
    const poster_id = document.querySelector('#poster_id').value;
    const body = document.querySelector('#post_body').value;
    let response = await axios.post(`http://localhost:3000/posts/register`, { poster_id, body });
    let post = response.data.payload;
    let li = document.createElement('li')
    li.innerText = `${post.poster_id},\n${post.body}\n\n`;
    document.querySelector('#postsList').append(li)
    // // loadPosts();
}

async function loadLikes() {
    const likesList = document.querySelector('#likesList');
    likesList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/likes`);
    response.data.payload.forEach((like) => {
        let listItem = document.createElement("li");
        listItem.innerText = `Liker ${like.liker_id}: post ${like.post_id}`;
        likesList.appendChild(listItem);
    });
}

async function addLikeFormSubmitted(event) {
    event.preventDefault();    
    const liker_id = document.querySelector('#liker_id').value;
    const post_id = document.querySelector('#post_id').value;
    let response = await axios.post(`http://localhost:3000/likes/register`, { liker_id, post_id });
    let like = response.data.payload;
    let li = document.createElement('li')
    li.innerText = `Liker ${like.liker_id}: post ${like.post_id}`;
    document.querySelector('#likesList').append(li)
    // // loadLikes();
}