const inputBox= document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBx.value === ''){
    alert("You must write something!");
    
 } 
 else{
   let li = document.createElement("li");
   li.innnerHTML = input.box.value;
   listContainer.appendChild("li");
   let span = document.createElement("span");
   span.innerHTML ="\u00d7;"
   li.appendChild(span)
 }
 input.box.value = "";
saveData();
}
listContainer.addEventListener("click",function(e){
   if(e.target.tagName === "LI"){
      e.target.classList.toggle("checked");
      saveData();
   }
   else if(e.target.tagName === "SPAN"){
      e.target.parenElement.remove(); 
      saveData();
      }
},false);
function saveData(){
   localStorage.setItem("data",listContainer.innerHTML);
}
function showTask(){
   listContainer.innerHTML = localStorage.getItem("data");
}
showTask()

