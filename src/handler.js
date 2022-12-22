/* eslint-disable object-shorthand */
const { nanoid } = require('nanoid')
const books = require('./books')
const response = require('./response')

// Task 1 : Create Task for Adding Books
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) return response.res400(h, 'Gagal menambahkan buku. Mohon isi nama buku')

  if (readPage > pageCount) return response.res400(h, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount')

  const finished = pageCount === readPage
  const id = nanoid(16)

  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.name === name).length > 0

  if (isSuccess) return response.res201(h, 'Buku berhasil ditambahkan', { bookId: id })

  return response.res500(h, 'Buku gagal ditambahkan')
}

// Task 2 : Showing all books
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query
  const showedBooks = books.map(b => {
    return ({ id: b.id, name: b.name, publisher: b.publisher })
  })

  if (name) {
    const booksFilteredName = books.filter(b => b.name.toLowerCase()
      .includes(request.query.name.toLowerCase()))
      .map(b => {
        return ({ id: b.id, name: b.name, publisher: b.publisher })
      })
    return response.res200(h, { books: booksFilteredName })
  }

  if (reading) {
    const filterNum = !!+request.query.reading
    const booksFilteredReading = books.filter(b => b.reading === filterNum).map(b => {
      return ({ id: b.id, name: b.name, publisher: b.publisher })
    })
    return response.res200(h, { books: booksFilteredReading })
  }

  if (finished) {
    const filterNum = !!+request.query.finished
    const booksFilteredFinished = books.filter(b => b.finished === filterNum).map(b => {
      return ({ id: b.id, name: b.name, publisher: b.publisher })
    })
    return response.res200(h, { books: booksFilteredFinished })
  }

  return response.res200(h, { books: showedBooks })
}

// Task 3 : Show detail of the book
const showBookDetail = (request, h) => {
  const { bookId } = request.params

  const filteredBook = books.find(b => b.id === bookId)

  if (filteredBook) {
    return response.res200(h, { book: filteredBook })
  }

  return response.res404(h, 'Buku tidak ditemukan')
}

// Task 4 : Edit Book
const editNoteByIdHandler = (request, h) => {
  const { bookId } = request.params

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) return response.res400(h, 'Gagal memperbarui buku. Mohon isi nama buku')

  if (readPage > pageCount) return response.res400(h, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount')

  const index = books.findIndex((b) => b.id === bookId)

  // verifikasi apakah indexnya ada atau tidak, jika tidak maka -1
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  return response.res404(h, 'Gagal memperbarui buku. Id tidak ditemukan') // Respon jika index -1
}

// Task 5 : Menghapus Buku
const deleteBook = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((b) => b.id === bookId)

  if (index !== -1) {
    books.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  return response.res404(h, 'Buku gagal dihapus. Id tidak ditemukan') // Respon jika index -1
}

module.exports = {
  addBookHandler,
  getAllBooks,
  showBookDetail,
  editNoteByIdHandler,
  deleteBook
}
