// main variables
const myLibrary = [];
let library = document.querySelector(".library");
let modal = document.querySelector("#myModal");
let modalButton = document.querySelector("#modalButton");
let span = document.getElementsByClassName("close")[0]; // close modal [X]
let submit = document.querySelector("#submit");



// dummy books
addBookToLibrary("Our Tragic Universe", "Scarlett Thomas", 428, false);
addBookToLibrary("Quicksand", "Junichiro Tanizaki", 240, false);
addBookToLibrary("Mansfield Park", "Jane Austen", 384, true);
addBookToLibrary("The Woods", "Harlan Coben", 528, true);
createCards();



// main constructor
function Book(title, author, pageCount, readYet){
    // Block regular function calling
    if(!new.target){
        console.log("Warning: Must declare with new constructor.");
        return;
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;

    (readYet) ? this.readYet = "Read." : this.readYet = "Not read yet.";
}





function addBookToLibrary(title, author, pageCount, readYet){
    let newBook = new Book(title, author, pageCount, readYet);
    myLibrary.push(newBook);
    // regenerate cards
    createCards();
}





function createCards(){
    // reset library contents
    library.innerHTML = "";

    // generate cards for each myLibrary[] Book
    for(let i = 0; i < myLibrary.length; i++){
        let card = document.createElement("div");
        card.className = "card";

        // Add book properties to card (excluding id)
        let keys = Object.keys(myLibrary[i]);
        let values = Object.values(myLibrary[i]);
        for(let j = 1; j < values.length; j++){
            let property = document.createElement("p");
            property.className = keys[j];       // classname=keyname for CSS styling
            property.innerText = values[j];
            card.appendChild(property);
        }

        // Add remove button
        let removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        removeButton.className = "removeButton";
        removeButton.addEventListener("click", () => handleRemoveClick(card));
        card.appendChild(removeButton);

        // Add change read button
        let readButton = document.createElement("button");
        readButton.innerHTML = "Toggle Read Status";
        readButton.className = "readButton";
        readButton.addEventListener("click", () => handleToggleRead(card));
        card.appendChild(readButton);

        card.dataset.id = values[0];    // set card data-id = "UUID" for deletion
        library.appendChild(card);
    }
}




/* MODAL */

// open modal
modalButton.onclick = function() { 
    modal.style.display = "block"; 
};

// close modal button
span.onclick = function(){ 
    modal.style.display = "none"; 
};

// click outside = close modal
window.onclick = function(){
    if(event.target == modal){
        modal.style.display = "none";
    }
}

// handle form
submit.onclick = function(event){
    event.preventDefault();

    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pageCount = document.getElementById("pageCount");
    let readYet = document.querySelector("input[name='read']:checked");

    // Basic error check: all fields nonempty
    let empty = false;
    if(title.value == "" || author.value == "" || pageCount.value == "" || readYet.value === null){
        empty = true;
        alert("Some fields are empty. Please try again.");
    }

    // Create element in library
    if(!empty){
        (readYet.value == "Yes") ? readYet = true : readYet = false;

        let newBook = new Book(title.value, author.value, pageCount.value, readYet);
        addBookToLibrary(title.value, author.value, pageCount.value, readYet);

        // close modal
        modal.style.display = "none"; 
    }
}



// Remove a Book instance from Library
function handleRemoveClick(card){
    // Use UUID to remove 
    let id = card.dataset.id;
    for(let i = 0; i < myLibrary.length; i++){
        if(id == myLibrary[i].id){
            myLibrary.splice(i, 1);
        }
    }

    // Reload library
    createCards();
}



// Toggle Read on Book instance
function handleToggleRead(card){
    let cardID = card.dataset.id;
    let book = myLibrary.find(book => book.id == cardID);

    // Call prototype function
    book.toggleReadStatus();

    // Reload Display
    createCards();
}



// Toggle Read Status Prototype
Book.prototype.toggleReadStatus = function(){
    if(this.readYet == "Read."){
        this.readYet = "Not read yet.";
    } else {
        this.readYet = "Read.";
    }
    return this.readYet;
}