const url=window.location.search.slice(1);
const question=document.querySelector('.question')
const buttons=document.querySelectorAll('.btn')
const result=document.querySelector('.result')
let globalData={};

async function getAPIdata(){
    const request= await(await fetch(url)).json()
    const data=request.results;
    globalData=data;
    return data;
}
window.onload=async ()=>{
 let data= await getAPIdata();
  loadButtons(data)
}
const createQuestion=(data,idx)=>{
    question.innerHTML=data[idx].question
    let answers=[data[idx].correct_answer,...data[idx].incorrect_answers]
    answers=shuffleArray(answers)
    buttons.forEach((button,idx)=>{
    button.textContent=answers[idx]
})
   clearBackGround()
}
const clearBackGround=()=>{

    buttons.forEach(button=>{
        button.classList.remove('correct')
        button.classList.remove('incorrect')
    })
}
const disableButtons=()=>{
 buttons.forEach(button=>{
     button.disabled=true;
 })
}
 const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[rand];
    array[rand] = temp;
  }

    return array;
}
const loadButtons=(data)=>{
let idx=0;
let isClicked=false;
data=data.filter(item=>item.type!='boolean')
data=shuffleArray(data);
createQuestion(data,idx++);
buttons.forEach(button=>{
    button.addEventListener('click',function(e){
        e.preventDefault();
        if(!isClicked)
        {
        isClicked=true;
        if(this.textContent==data[idx].correct_answer){
        this.classList.add('correct')
        result.textContent=(parseInt(result.textContent)+10).toString()
        }
        else
            this.classList.add('incorrect')
     
        setTimeout(function(){
         idx++; 
         if(idx==(data.length)){
         document.body.innerHTML=`<div style="width:200px;height:200px">Your Score Is :
         ${result.textContent}</div>`;
        return;
        }
            createQuestion(data,idx)
            isClicked=false;
        },1000)
       }  
    })  
})
};

