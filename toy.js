
document.addEventListener('DOMContentLoaded', function() {
    let storedToys = localStorage.getItem('toys');
    
    if (storedToys) {
        storedToys = JSON.parse(storedToys); 
    } else {
        storedToys = []; 
    }

    storedToys.forEach(function(toy) {
        addToyToDOM(toy);
    });
});


document.getElementById('myform').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const inputToy = document.getElementById('toy-input').value;
    
    if (inputToy) {
        addToyToDOM(inputToy);


        let storedToys = JSON.parse(localStorage.getItem('toys')) || [];
        storedToys.push(inputToy);
        localStorage.setItem('toys', JSON.stringify(storedToys));

        document.getElementById('myform').reset();

    } else {
        alert('Please enter a toy name.');
    }
});


function addToyToDOM(toy) {
    const toyItem = document.createElement('div');
    toyItem.className = 'task-item';
    toyItem.innerHTML = `<p>Toy: ${toy}</p>`;  
    
   
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function() {
        toyItem.remove();
        removeToyFromLocalStorage(toy); 
    });
    toyItem.appendChild(deleteButton);
    
    
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit-btn";
    editButton.addEventListener('click', function() {
        document.getElementById('toy-input').value = toy; 
        toyItem.remove();
        removeToyFromLocalStorage(toy); 
    });
    toyItem.appendChild(editButton);
    
    
    document.getElementById('toy-div').appendChild(toyItem);
}


function removeToyFromLocalStorage(toy) {
    let storedToys = JSON.parse(localStorage.getItem('toys')) || []; 
    storedToys = storedToys.filter(storedToy => storedToy !== toy);
    localStorage.setItem('toys', JSON.stringify(storedToys));
}
