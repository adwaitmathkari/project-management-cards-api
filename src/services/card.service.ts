import {CardModel} from '../models/card.model';
import {ListService} from './list.service';

export class CardService {
  listService: ListService;

  constructor() {
    this.listService = new ListService();
  }

  async getCard(cardId) {
    const card = await CardModel.findOne({_id: cardId});
    console.log('card:::', card);
    if (!card) {
      throw new Error('Card Not Found');
    }
    return card;
  }

  async createCard(card, listId) {
    let data:any = {};
    try {
      data = await CardModel.create(card);
      await this.listService.addCardToList(listId, data._id);
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }

  async assignUser(cardId, userId) {
    let data = {};
    if (userId == '') {
      userId = undefined;
    }
    try {
      data = await CardModel.updateOne(
          {_id: cardId},
          {$set: {
            assignee: userId,
          },
          },
      );
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return data;
  }

  async deleteCard(cardId) {
    let data: any = {};
    try {
      data = await CardModel.deleteOne({_id: cardId});
    } catch (err) {
      console.log('Error::' + err);
      throw err;
    }
    return {status: `${data.deletedCount > 0 ? true : false}`};
  }
}
