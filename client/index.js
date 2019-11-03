document.addEventListener('DOMContentLoaded', () => {
    for (let form in obj) loadList(obj[form].listID, obj[form].getURL, obj[form].innerText)

    document.querySelectorAll('form').forEach(form => form.addEventListener('submit', addFormSubmitted))
    
    document.querySelector('#filterPosts').addEventListener('click', () => {
        let post = obj[addPostForm]
        loadList(post.listID, post.getURL, post.innerText)
    })
});


let obj = {
    addUserForm: {
        listID: '#usersList',
        getURL: () => `http://localhost:3000/users`,
        postURL: `http://localhost:3000/users/register`,
        innerText: (user) => `${user.firstname} ${user.lastname}, age ${user.age}`,
    },
    addPostForm: {
        listID: '#postsList',
        getURL: () => `http://localhost:3000/posts/${document.querySelector('#filter_id').value}`,
        postURL: `http://localhost:3000/posts/register`,
        innerText: (post) => `${post.poster_id},\n${post.body}\n\n`,
    },
    likePostForm: {
        listID: '#likesList',
        getURL: () => `http://localhost:3000/likes`,
        postURL: `http://localhost:3000/likes/register`,
        innerText: (like) => `Liker ${like.liker_id}: post ${like.post_id}`,
    }
}


async function addFormSubmitted(event) {
    event.preventDefault();
    let formID = event.target.id
    console.log('Form id => ', formID)

    let form = document.querySelector('#' + formID)
    let postBody = {}
    form.querySelectorAll('input').forEach(input => postBody[input.id] = input.value)
    console.log('Our body payload for post request', postBody)

    let response = await axios.post(obj[formID].postURL, postBody);
    let item = response.data.payload;
    console.log('What we posted. ', item);
    console.log('Where it was posted. ', obj[formID].postURL);
    
    let li = document.createElement('li')
    li.innerText = obj[formID].innerText(item);
    document.querySelector(obj[formID].listID).append(li)
    // Adds individual item to list
}


async function loadList(listID, getURL, listInnerText) {
    console.log('listID \n\t', listID)
    const list = document.querySelector(listID);
    
    list.innerHTML = "";
    // Clears entire list on the DOM
    
    console.log('getURL \n\t', getURL())
    const response = await axios.get(getURL());
    console.log('response data payload \n\t', response.data.payload)

    response.data.payload.forEach((item) => {
        console.log('item to be added to list from payload', item)

        let listItem = document.createElement("li");
        listItem.innerText = listInnerText(item);
        console.log('list item innerText', listInnerText(item))

        list.appendChild(listItem);
        // Adds to listItem to list on DOM 
    });
}
