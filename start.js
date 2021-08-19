// AXIOS Globals
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {
  // axios({
  //   method: 'get',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  // .then(res => showOutput(res))
  // .catch(err => console.log(error(err)));

  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => showOutput(res))
    .catch((err) => console.error(err));
}

// POST REQUEST
function addTodo() {
  axios
  .post("https://jsonplaceholder.typicode.com/todos",{
    title: "New Todo",
    completed: "false"
  })
  .then((res) => showOutput(res))
  .catch((err) => console.error(err));
}

// PUT/PATCH REQUEST - put replaces the data where patch modifies only the given data
function updateTodo() {
  axios
  .patch("https://jsonplaceholder.typicode.com/todos/1", {
    title: 'Updated Todo',
    completed: true
  })
  .then((res) => showOutput(res))
  .catch((err) => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
  .delete("https://jsonplaceholder.typicode.com/todos/1")
  .then((res) => showOutput(res))
  .catch((err) => console.error(err));
}

// SIMULTANEOUS DATA- takes arrays of requests
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
  ])
  .then(axios.spread((todos, posts) => showOutput(posts))) //axios.spread- more descriptive variable names, takes a fucntion
  .catch((err) => console.error(err));
}

// CUSTOM HEADERS- create a config object and header object
function customHeaders() {
  const config = {
    headers: {
      'Content-Type' : 'application/json',
      Authorization: 'sometoken'
    }
  }
  axios
  .post('https://jsonplaceholder.typicode.com/todos', {
    title: "New Todo",
    completed: "false"
  }, 
  config
  )
  .then((res) => showOutput(res))
  .catch((err) => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data:{
      title: 'Hello world'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES- this takes a function with congig as a paremeter.
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config
}, error => {
  return Promise.reject(error);
});

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
