export default {
    auth: {
        secret: 'yoursecretkey'
        // expires:
    },

    postgres: { // TODO - this can be done with a connString, and thats how old wasabi did it
        host     : 'test',
        user     : 'test',
        password : 'test',
        database : 'hexabi',
        charset  : 'utf8'
    },

    port: 8080
}
