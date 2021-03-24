// import {ObjectId} from '../../config/db.config';
import {CardModel} from '../models/card.model';
import {ListModel} from '../models/list.model';
import {BoardService} from './board.service';

export class ListService {
  private boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  async getList(id) {
    // console.time('1q')
    // const list1 = await ListModel.aggregate([
    //   { $match: { _id: ObjectId(id) } },
    //   { $unwind: "$cards" },
    //   { $lookup:{
    //       from: "cards",
    //       localField: "cards",
    //       foreignField: "_id",
    //       as: "card"
    //     }
    //   },
    //   { $group : { _id: "$_id" , cards: {$push: "$card" }}},
    // ]);
    // console.timeEnd('1q');
    // console.time('2q')
    let list:any = await ListModel.findById(id);
    list = list.toObject();
    const cards = await CardModel.find({_id: {$in: list.cards}});
    list.cards = cards;
    // console.timeEnd('2q')
    // console.log(list, JSON.stringify(list1, null, 2))

    console.log('list:::', list);
    return list;
  }

  async createList(list, boardId) {
    let data: any = {};
    try {
      // create list
      data = await ListModel.create(list);
      // add list to board
      await this.boardService.addListToBoard(data._id, boardId);
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }


  async addCardToList(listId, cardId) {
    let data = {};

    if (!cardId) {
      throw new Error('cardId cannot be empty');
    }

    try {
      data = await ListModel.updateOne(
          {_id: listId},
          {$addToSet: {cards: cardId}},
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }


  async removeCardFromList(listId, cardId) {
    let data = {};
    try {
      data = await ListModel.updateOne(
          {_id: listId},
          {$pull: {cards: cardId}},
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }

  async moveCard(moveFromListId, moveToListId, cardId) {
    // pull from list 1
    // push into list 2
    let remove;
    let add;
    try {
      remove = this.removeCardFromList(moveFromListId, cardId);
      add = this.addCardToList(moveToListId, cardId);
      add = await remove;
      remove = await add;
      console.log(add, remove);
      return {
        added: `${add.nModified > 0 ? true : false}`,
        removed: `${remove.nModified > 0 ? true : false}`,
      };
    } catch (err) {
      console.log('Error:::moveCard', err);
      throw err;
    }
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
    try {
      const list:any = await ListModel.findById(id);

      let cardsDelResponse:any = CardModel.deleteMany({_id: {$in: list.cards}});
      let listDelResponse:any = ListModel.deleteOne({_id: id});
      cardsDelResponse = await cardsDelResponse;
      listDelResponse = await listDelResponse;

      return {
        status: `${listDelResponse.deletedCount > 0 ? true : false}`,
        statusCards: `${cardsDelResponse.deletedCount > 0 ? true : false}`,
      };
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
  }
}
