const achievementContainer = document.querySelector(".achievement-container");
const addButton = document.querySelector(".btn");
let achievement = document.querySelectorAll(".input-box");
addButton.addEventListener("click", ()=>{
let inputBox = document.createElement("p")
let img = document.createElement("img")
inputBox.className = "input-box"
inputBox.setAttribute("contenteditable", "true");
img.src = "Images/delete.jpeg"
achievementContainer.appendChild(inputBox).appendChild(img);
})
achievementContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
      e.target.parentElement.remove();
    }
})