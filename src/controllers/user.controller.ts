
import { UserService } from '../services/user.service';

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUser(email) {
        console.log('Controller: getUsers', null)
        return await this.userService.getUser(email);
    }

    async createUser(user) {
        console.log('Controller: createUser', user);
        return await this.userService.createUser(user);
    }

    // async updateUser(user) {
    //     console.log('Controller: updateUser', user);
    //     return await this.userService.updateUser(user);
    // }

    async deleteUser(userId) {
        console.log('Controller: deleteUser', userId);
        return await this.userService.deleteUser(userId);
    }
}