import {BoardModel} from '../models/board.model';
import {ListModel} from '../models/list.model';
import {ListService} from './list.service';

export class BoardService {
  async getBoard(id) {
    let board: any = await BoardModel.findOne({_id: id});
    if (!board) {
      return board;
    }
    board = board.toObject();
    const lists = await ListModel.find({_id: {$in: board.lists}});
    board.lists = lists;
    console.log('board:::', board);
    return board;
  }

  async getBoards() {
    const boards:any = await BoardModel.find();
    const promises = [];
    boards.forEach(async (board:any) =>{
      const b1 = board;
      promises.push(
          new Promise(async (resolve, reject) => {
            const lists = await ListModel.find({_id: {$in: b1.lists}});
            // console.log('board', lists)
            resolve(lists);
          }),
      );
    });
    const listsRes = await Promise.all(promises);
    console.log(listsRes);
    for (let i =0; i < boards.length; i++) {
      boards[i] = boards[i].toObject();
      boards[i].lists = listsRes[i];
    }
    console.log('resolving boards');
    return boards;
  }

  async createBoard(board) {
    let data = {};
    try {
      data = await BoardModel.create(board);
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }

  async addMember(userId, boardId) {
    let data = {};
    try {
      data = await BoardModel.updateOne(
          {_id: boardId},
          {$addToSet: {members: userId}},
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }


  async removeMember(userId, boardId) {
    let data = {};
    try {
      data = await BoardModel.updateOne(
          {_id: boardId},
          {$pull: {members: userId}},
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }


  async addListToBoard(listId, boardId) {
    let data = {};

    if (!listId) {
      throw new Error('ListId cannot be empty');
    }

    try {
      data = await BoardModel.updateOne(
          {_id: boardId},
          {$addToSet: {lists: listId}},
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }


  async removeListFromBoard(listId, boardId) {
    let data = {};
    try {
      data = await BoardModel.updateOne(
          {_id: boardId},
          {$pull: {lists: listId}},
      );
      console.log(data);
    } catch (err) {
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
      let board: any = await BoardModel.findOne({_id: id});
      const listService = new ListService();
      board = board.toObject();
      board.lists.forEach((list)=>{
        console.log('deleting list: ' + list);
        listService.deleteList(list).then((res)=>console.log(res))
            .catch((err) => console.log('Error deleting lists from board', err));
      });

      data = await BoardModel.deleteOne({_id: id});
    } catch (err) {
      console.log('Error::' + err);
    }
    return {status: `${data.deletedCount > 0 ? true : false}`};
  }
}


