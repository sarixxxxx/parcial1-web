const AuthorsService={
    getAuthors: function(){
        return fetch(process.env.BOOKSTORE_API_URL)
    }
}

export default AuthorsService;