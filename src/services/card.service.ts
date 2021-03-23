import { CardModel } from '../models/card.model';

export class CardService {

    constructor() {
    }

    async getCard(cardId) {
        const card = await CardModel.findOne({ _id: cardId });
        console.log('card:::', card);
        if (!card) {
            throw new Error('Card Not Found');
        }
        return card;
    }

    async createCard(card) {
        let data = {};
        try {
            data = await CardModel.create(card);
        } catch (err) {
            console.log('Error::' + err);
            throw err;
        }
        return data;
    }

    async assignUser(cardId, userId) {
        let data = {};
        if (userId == "") {
            userId = undefined;
        }
        try {
            data = await CardModel.updateOne(
                { _id: cardId },
                {
                    $set:
                    {
                        assignee: userId
                    }
                }
            )
        } catch (err) {
            console.log('Error::' + err);
            throw err;
        }
        return data;
    }

    async deleteCard(cardId) {
        let data: any = {};
        try {
            data = await CardModel.deleteOne({ _id: cardId });
        } catch (err) {
            console.log('Error::' + err);
            throw err;
        }
        return { status: `${data.deletedCount > 0 ? true : false}` };
    }

}