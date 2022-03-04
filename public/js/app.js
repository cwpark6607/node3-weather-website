//console.log("Client side javascript file is loaded!")

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })



// fetch('http://localhost:3000/weather?address=Seoul').then((res) => {
//     console.log(res)
//     res.json().then((data => {
//         if (data.error) {
//             return console.log(data.error)
//         }

//         console.log(data.forecast)
//         console.log(data.address)
//     }))
// })
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(searchInput.value)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + searchInput.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                //return console.log(data.error)
                return messageOne.textContent = data.error
            }

            // console.log(data.forecast)
            // console.log(data.address)
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
        })
    })
})