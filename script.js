var add_btn = document.getElementById("add-btn");
var myInput = document.getElementById("myInput"); 
var list = document.getElementById("list");


if(localStorage.getItem("list") != null)
{
    var arr_list = JSON.parse(localStorage.getItem("list"));
arr_list.forEach(task => {
     newToDoList(task)
});
}

add_btn.onclick = function(){
    if(myInput.value != ""){
        newToDoList();
    }
    else{
        alert("Input Field is empty");
    }
}


function newToDoList(task){
    var item_name = myInput.value;
    if(task){
        item_name = task.name
    }
    var li = document.createElement("LI");
    var span = document.createElement("SPAN");
    span.innerText = item_name;
    span.className = "text";
    li.appendChild(span);
    var label = document.createElement("LABEL");
    label.innerHTML = '<label><i class="fa-solid fa-square-check"></i>&nbsp;<i class="fa-solid fa-trash">';
    li.append(label)
    list.appendChild(li);
    myInput.value = "";

    var check_tag = label.getElementsByTagName("I");
    check_tag[0].onclick = function(){
        li.classList.toggle("checked");
        updateLocalStorage();
    }

    check_tag[1].onclick = function(){
        var cnf = confirm("Do you wanna delete");
        if(cnf){
            li.remove();
            updateLocalStorage();
        }
        else{
            alert("Your task is safe");
        }
    }

    updateLocalStorage();

}

function updateLocalStorage(){
    var li_el = document.querySelectorAll("li");
    var i;
     arr_list = [];
    for(i=0;i<li_el.length;i++){
        var span = li_el[i].getElementsByTagName("span")
        arr_list.push({
            name : span[0].innerText,
            checked : li_el[i].classList.contains("checked")
        });
    }
    localStorage.setItem("list",JSON.stringify(arr_list));
}