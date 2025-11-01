function callbackDefault(response) {
    console.log(response);
}

function printPosts(posts) {

    posts = posts.sort(function (a, b) {
        return b.title.length - a.title.length
    });
    posts.forEach(post => {
        console.log(post);
    })
}

function printTodos(todos) {
    let newTodos = []
    todos.forEach(todo => {
        if (todo.completed == 'falsy') {
            newTodos.push(todo);
        }
    })
    newTodos.forEach(newTodo => {
        console.log(newTodo);
    })
}

function printComments(comments, users) {
    comments.forEach(comment => {
        let userName = ""
        users.forEach(user => {
            if (user.id == comment.user_id) {
                comment.username = user.username;
            }
        })
    })
    comments = comments.sort(function (a, b) {
        a.username.localeCompare(b.username)
    });
    console.log(comments);
}

async function getPosts(callback = null) {
    let response = await fetch("https://my-json-server.typicode.com/AlisaRusak/L3/posts");
    let data = await response.json();
  callback(data);
    return data;
}


async function getComments(callback = null) {
    let response = await fetch("https://my-json-server.typicode.com/AlisaRusak/L3/comments");
    let data = await response.json();
    let users = await getUsers();
  callback(data, users);
    return data;

}

async function getUsers(callback = null) {
    let response = await fetch("https://my-json-server.typicode.com/AlisaRusak/L3/users");
    let data = await response.json();
 callback(data);
    return data;

}


async function updateUsers(callback = null) {
    let users = null;
    try {
        users = await getUsers();
        users.forEach(user => {
            delete user.empty;
        })
    } catch (err) {
        console.log(err);
    }
    return users;
}

async function getTodos(callback = null) {
    let response = await fetch("https://my-json-server.typicode.com/AlisaRusak/L3/todos");
    let data = await response.json();
    callback(data);
    return data;
}

await getTodos(printTodos);