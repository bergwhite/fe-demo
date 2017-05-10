// import a from './a.js'
const moduleA = require('./a.js')
const moduleB = require('./b.js')
const listA = document.getElementsByClassName('list-a')[0]
const listB = document.getElementsByClassName('list-b')[0]
listA.innerHTML = moduleA
listB.innerHTML = moduleB