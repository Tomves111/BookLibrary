class Book {
    contructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list');
        //create tr
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
    
        list.appendChild(row);
    }
    showAlert(message, className){
        const div = document.createElement('div');
        //add clases
        div.className = `alert${className}`;
        //add text
        div.appendChild(document.createTextNode(message));
        //get parent
        const container = document.querySelector('.container');
    
        const form = document.querySelector('#book-form');
        //insert alert
        container.insertBefore(div, form);
        //timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove;
        }, 3000);
    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//event listeners for add book
document.getElementById('book-form').addEventListener('submit', 
function(e){
    //get form values
const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value
//instantiate the book
const book = new Book(title, author, isbn);
//instantiate UI
const ui = new UI();

//validate
if(title === '' || author === '' || isbn === ''){
//error alert 
ui.showAlert('Please fill in all fields', 'error');
}else{
//add book to list
ui.addBookToList(book);
//show success
ui.showAlert('Book added', 'success');
ui.clearFields();
}


    e.preventDefault();
});

//eventListener for delete book 
document.getElementById('book-list').addEventListener('click', function(e){
    //initialize UI
    const ui = new UI();
    
    ui.deleteBook(e.target);
    //show message about deleting
    ui.showAlert('Book removed', 'success');
    e.preventDefault();
});
