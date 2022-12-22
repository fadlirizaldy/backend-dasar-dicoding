const { addBookHandler, getAllBooks, showBookDetail, editNoteByIdHandler, deleteBook } = require('./handler')

const routes = [
  { // menambahkan books
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  { // Menampilkan semua books
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  { // Menampilkan detail buku
    method: 'GET',
    path: '/books/{bookId}',
    handler: showBookDetail
  },
  { // Mengubah buku
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editNoteByIdHandler
  },
  { // Menghapus buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook
  }
]

module.exports = routes
