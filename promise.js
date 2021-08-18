let p = new Promise((resolve, reject) => { // takes one paremeter which is a function which gets passed variables of  resolve and reject
    // create definition of the function inside
    let a = 1+1
    if ( a == 2){
        resolve('Success') // if the condition is true, it is going to resolve method otherwise 
    }else{
        reject('Failed') // this reject method
    }
})

// How we interact with promises

p.then((message) => {
    console.log('This is in the then' +message) //anything inside then is going to run for resolve-all it does is take a method
}).catch((message) => {
    console.log('This is in catch' +message) //catches errors which are reject state
}) 

// Conclusion: then is going to be called when our promise is resolved successfully 
//Catch is called when our promise is rejected or fails

// Promises are meant to replace callback functions
//code is a lot cleaner to write with using promise than callbacks 
//because as you start nesting callbacks you started to get in a huge world of trouble 
//where your code just keeps getting intended and intended even further 
//below the promises,instead of nesting callbacks all you do is just add another then, 
//instead of using callback inside of a callback inside of callback which is what's kmown as callback hell and its absolutely terrible
//promises helps to solve that problem completely

const userLeft = false
const userWatchingCatMeme = false

function watchTutorialPromise(){
    return new Promise((resolve, reject) => {
        if (userLeft){
            reject({
                name: 'User Left',
                message:':('
            })
        }else if (userWatchingCatMeme) {
            reject({
                name: 'User watching Cat meme',
                message: 'WebDevSimplified < Cat'
            })
        }
        else{
            resolve ('Thumbs up and subscribe')
        }

    })
}


watchTutorialPromise().then((message) => {
    console.log('Success' + message)
}).catch((error) => {
    console.log(error.name + ' ' + error.message)
})


// // We just have three simple promises, always gets resolved, not rejected and sends a same message

const recordVideoOne = new Promise((resolve, reject) => {
    resolve ('Video 1 recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video two uploaded')
})

// Promise.all is going to call each one of these promises and as soon as it is done, it is going to call .then and .catch methood 
//pass array of different promises we wanna run 
Promise.all([
    recordVideoOne,
    recordVideoTwo
]).then((messages) => {
    console.log(messages);
})


// Promise.race similar like promise.all - 
//as soon as one of the promise is done , it will return message as soon as first one is completed than waiting for others 