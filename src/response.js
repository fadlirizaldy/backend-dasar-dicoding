'use strict'

exports.res200 = (h, data1) => {
  const res = h.response({
    status: 'success',
    data: data1
  })
  res.code(200)
  return res
}

exports.res201 = (h, message, data) => {
  const res = h.response({
    status: 'success',
    message,
    data
  })
  res.code(201)
  return res
}

exports.res400 = (h, message) => {
  const res = h.response({
    status: 'fail',
    message
  })
  res.code(400)
  return res
}

exports.res404 = (h, message) => {
  const res = h.response({
    status: 'fail',
    message
  })
  res.code(404)
  return res
}

exports.res500 = (h, message) => {
  const res = h.response({
    status: 'fail',
    message
  })
  res.code(500)
  return res
}
