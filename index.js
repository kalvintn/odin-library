const myLibrary = [];
let library = document.querySelector(".library");



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
}



// dummy books
addBookToLibrary("Our Tragic Universe", "Scarlett Thomas", 428, false);
addBookToLibrary("Quicksand", "Junichiro Tanizaki", 240, false);
addBookToLibrary("Mansfield Park", "Jane Austen", 384, true);
addBookToLibrary("The Woods", "Harlan Coben", 528, true);



// Create cards for each book object
for(let i = 0; i < myLibrary.length; i++){
    let card = document.createElement("div");
    card.className = "card";

    // Add book properties to card (excluding id)
    let keys = Object.keys(myLibrary[i]);
    let values = Object.values(myLibrary[i]);
    for(let j = 1; j < values.length; j++){
        let property = document.createElement("p");
        property.className = keys[j];   // classname=keyname for CSS styling
        property.innerText = values[j];
        card.appendChild(property);
    }

    library.appendChild(card);
}



