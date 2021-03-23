
import {UserService} from '../services/user.service';

export class UserController {
    private userService: UserService;
    private app: any;

    constructor(app) {
      this.app = app;
      this.userService = new UserService();
    }

    async configureRoutes() {
      // getUser
      this.app.get('/api/user/:email', async (req, res) => {
        console.log('received basic request');
        try {
          const user = await this.userService.getUser(req.params.email);
          res.json(user);
        } catch (err) {
          res.status(404);
          res.send(err.message);
        }
      });

      // create user
      this.app.post('/api/user', async (req, res) => {
        console.log(req.body);
        try {
          const data = await this.userService.createUser(req.body);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // delete user
      this.app.delete('/api/user/:userid', async (req, res) => {
        try {
          const data = await this.userService.deleteUser(req.params.userid);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });
    }

  // async updateUser(user) {
  //     console.log('Controller: updateUser', user);
  //     return await this.userService.updateUser(user);
  // }
}
