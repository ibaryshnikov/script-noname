console.log('loaded desu')
const script = document.querySelector('script[src$="src/script2.js"]')
console.log(script)
const id = script.dataset.targetId
console.log(' script id is', id)
const element = document.getElementById(id)
element.innerHTML += ' script loaded'
