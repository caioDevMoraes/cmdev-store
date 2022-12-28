module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'UHSAUHU234UHR47363JDUWY4RHDJDKW4UYT5U5RJJFTU5URHFUT',
    api: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
    store: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000',
}