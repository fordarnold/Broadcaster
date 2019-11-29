import User from '../models/User';
import Authenticate from '../helpers/authentication';

class UserController {

    static signUp(req, res) {

        const userExists = User.userExists(req.body.email);
        const username = User.usernameExists(req.body.username);

        if (username) {
            return res.status(409).json({
                status: 409,
                error: `${username.username} username already exists`
            });
        }

        if (userExists) {
            return res.status(409).json({
                status: 409,
                error: 'The email for this user already exists'
            });
        }

        const newUser = new User(req.body);

        User.createUser(newUser);

        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: {
                token: Authenticate.generateToken(newUser.email, newUser.id, newUser.isAdmin),
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email,
                username: newUser.username,
            }
        });
    }

    static signIn(req, res) {
        
    }
};

export default UserController;