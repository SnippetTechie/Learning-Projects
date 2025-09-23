
let ctr = 1;
function Delete(index){
    console.log("Deleted!")
    const ele = document.getElementById(index);
    ele.parentNode.removeChild(ele);
}

function add(){
    const UserInput= document.querySelector('input');
    const value = UserInput.value;

    const newEL = document.createElement("div");
    newEL.setAttribute("id",ctr);
    newEL.innerHTML = "<div>" + value + '</div> <button onclick="Delete(' + ctr + ')">Delete</button>';
    ctr++;
    const container = document.getElementsByClassName("container")[0];
    container.appendChild(newEL);
}