import Authenticate from '../helpers/authentication';

// Add some sample users
const users = [
    {
        id: 1,
        firstname: 'SampleAdmin',
        lastname: 'UserOne',
        email: 'sampleadmin@example.com',
        phoneNumber: '0722991992',
        username: 'sampleadmin',
        isAdmin: true,
        password: Authenticate.encryptPassword('sample admin password')
    },
    {
        id: 1,
        firstname: 'SampleGeneric',
        lastname: 'UserTwo',
        email: 'sampleuser@example.com',
        phoneNumber: '0722991992',
        username: 'sampleuser',
        isAdmin: false,
        password: Authenticate.encryptPassword('sample user password')
    }
];

class User {

    constructor({ firstname, lastname, email, phoneNumber, username, password }) {

        this.id = users.length + 1;
        this.createdOn = new Date();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.isAdmin = false;
        this.password = Authenticate.encryptPassword(password);
    }

    static createUser(user) {
        return users.push(user);
    }

    static userExists(email) {
        return users.find(user => user.email === email);
    }

    static usernameExists(username) {
        return users.find(user => user.username === username);
    }
}

export default User;