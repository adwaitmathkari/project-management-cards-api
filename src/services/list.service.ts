import { ListModel } from '../models/list.model';

export class ListService {

    async getList(id) {
        const list = await ListModel.findOne({_id:id});
        console.log('list:::', list);
        return list;
    }

    async createList(list) {
        let data = {};
        try {
            data = await ListModel.create(list);
        } catch(err) {
            console.log('Error::' + err);
            throw err;
        }
        return data;
    }

    // async updateList(task) {
    //     let data = {};
    //     try {
    //         data = await ListModel.updateOne(task);
    //     } catch(err) {
    //         console.log('Error::' + err);
    //     }
    //     return data;
    // }

    async deleteList(id) {
        let data: any = {};
        try {
            data = await ListModel.deleteOne({_id : id});
        } catch(err) {
            console.log('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}