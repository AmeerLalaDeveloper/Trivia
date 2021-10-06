const submit=document.querySelector('.btn')
const trivia_amount=document.querySelector('#trivia_amount')
const category=document.querySelector('#category')
const difficulty=document.querySelector('#difficulty')


let questionAmount=trivia_amount.value;
let difficultyValue='any'
let categoryValue='any';

let url='https://opentdb.com/api.php'

trivia_amount.addEventListener('change',function(e){
    questionAmount=trivia_amount.value
})
difficulty.addEventListener('change',function(e) {
    difficultyValue=difficulty.value;
})
category.addEventListener('change',function(e) {
    categoryValue=category.value;
})
submit.addEventListener('click',function(e){
    e.preventDefault();
       url+=`?amount=${questionAmount}`
    if(categoryValue!='any')
        url+=`&category=${categoryValue}`
    if(difficultyValue!='any')
        url+=`&difficulty=${difficultyValue}`
    
        window.location.href=`./game.html?${url}`
    
})
