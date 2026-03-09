const AuthorsService = {
    getAuthors: function () {
        return fetch("http://127.0.0.1:8080/api/authors")
            .then(response => response.json());
    }
}

export default AuthorsService;