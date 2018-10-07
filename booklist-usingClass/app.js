class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToLIst(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='delete'>X</a></td>
        `;
        list.appendChild(row);
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');

        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

//local storage class
class Store {
    static getBooks() {
        return (localStorage.getItem("books") === null) ? [] : JSON.parse(localStorage.getItem('books'));
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();
            ui.addBookToLIst(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    static checkDuplicateIsbn(isbn) {
        const books = Store.getBooks();
        let result = false;
        books.forEach(function (book) {
            if (book.isbn === isbn) {
                result = true;
            }
        });
        return result

    }
}


document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all the fields', 'error');
    } else if (Store.checkDuplicateIsbn(isbn)) {
        ui.showAlert('Duplicate isbn found', 'error');
    }
    else {
        ui.addBookToLIst(book);
        Store.addBook(book)
        ui.showAlert('Book Added!', 'success');
        ui.clearFields();
    }
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert("Book removed", 'success');
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', Store.displayBooks);