import { BoardModel } from '../models/board.model';

export class BoardService {

    async getBoard(id) {
        const board = await BoardModel.findOne({_id:id});
        console.log('board:::', board);
        return board;
    }

    async createBoard(board) {
        let data = {};
        try {
            data = await BoardModel.create(board);
        } catch(err) {
            console.log('Error::' + err);
            throw err;
        }
        return data;
    }

    // async updateBoard(task) {
    //     let data = {};
    //     try {
    //         data = await BoardModel.updateOne(task);
    //     } catch(err) {
    //         console.log('Error::' + err);
    //     }
    //     return data;
    // }

    async deleteBoard(id) {
        let data: any = {};
        try {
            data = await BoardModel.deleteOne({_id : id});
        } catch(err) {
            console.log('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}