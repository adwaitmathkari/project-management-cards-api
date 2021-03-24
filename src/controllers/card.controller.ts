
import {CardService} from '../services/card.service';
import {ListService} from '../services/list.service';

export class CardController {
    private cardService: CardService;
    private app: any;
    private listService: ListService;

    constructor(app) {
      this.app = app;
      this.cardService = new CardService();
      this.listService = new ListService();
    }

    async configureRoutes() {
      // getCard
      this.app.get('/api/card/:cardId', async (req, res) => {
        console.log('received basic request');
        try {
          const card = await this.cardService.getCard(req.params.cardId);
          res.json(card);
        } catch (err) {
          res.status(404);
          res.send(err.message);
        }
      });

      // create card
      this.app.post('/api/card', async (req, res) => {
        console.log(req.body);
        try {
          const data = await this.cardService.createCard(req.body, req.body.listId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // delete card
      this.app.delete('/api/card/:cardid', async (req, res) => {
        try {
          const data = await this.cardService.deleteCard(req.params.cardid);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // assign user to card
      this.app.patch('/api/card/:cardId', async (req, res) => {
        try {
          const data = await this.cardService.assignUser(req.params.cardId, req.body.userId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      this.app.post('/api/card/move', async (req, res) => {
        try {
          const data = await this.listService.moveCard(
              req.body.moveFromListId, req.body.moveToListId, req.body.cardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });
    }

  // async updateCard(card) {
  //     console.log('Controller: updateCard', card);
  //     return await this.cardService.updateCard(card);
  // }
}
