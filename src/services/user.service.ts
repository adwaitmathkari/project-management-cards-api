import { UserModel } from '../models/user.model';

export class UserService {
    
    async getUser(email) {
        const user = await UserModel.findOne({email:email});
        console.log('user:::', user);
        if (!user) {
            throw new Error('User Not Found');
        }
        return user;
    }

    async createUser(user) {
        let data = {};
        try {
            data = await UserModel.create(user);
        } catch(err) {
            console.log('Error::' + err);
            throw err;
        }
        return data;
    }

    // async updateUser(task) {
    //     let data = {};
    //     try {
    //         data = await UserModel.updateOne(task);
    //     } catch(err) {
    //         console.log('Error::' + err);
    //     }
    //     return data;
    // }

    async deleteUser(userId) {
        let data: any = {};
        try {
            data = await UserModel.deleteOne({_id : userId});
        } catch(err) {
            console.log('Error::' + err);
            throw err;
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}