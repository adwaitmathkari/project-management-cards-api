
import {ListService} from '../services/list.service';

export class ListController {
    private listService: ListService;
    private app: any;

    constructor(app) {
      this.app = app;
      this.listService = new ListService();
    }

    async configureRoutes() {
      // getList
      this.app.get('/api/list/:listId', async (req, res) => {
        console.log('received basic request');
        try {
          const list = await this.listService.getList(req.params.listId);
          res.json(list);
        } catch (err) {
          res.status(404);
          res.send(err.message);
        }
      });

      // create list
      this.app.post('/api/list', async (req, res) => {
        console.log(req.body);
        try {
          const data = await this.listService.createList(req.body, req.body.boardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // delete list
      this.app.delete('/api/list/:listid', async (req, res) => {
        try {
          const data = await this.listService.deleteList(req.params.listid);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });
    }
}
