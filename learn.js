// Get Request
function getTodos(){
    // Passing an object and method and we want to use
    axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/todos'
    })
    .then(res => console.log(res)) // returns promises
    .catch(err => console.error(err)); //for error handling with promises
}