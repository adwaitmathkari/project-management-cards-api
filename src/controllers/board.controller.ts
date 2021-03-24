
import {BoardService} from '../services/board.service';

export class BoardController {
    private boardService: BoardService;
    private app: any;

    constructor(app) {
      this.app = app;
      this.boardService = new BoardService();
    }

    async configureRoutes() {
      // getBoard
      this.app.get('/api/board/:boardId', async (req, res) => {
        console.log('received basic request');
        try {
          const board = await this.boardService.getBoard(req.params.boardId);
          res.json(board);
        } catch (err) {
          res.status(404);
          res.send(err.message);
        }
      });

      // create board
      this.app.post('/api/board', async (req, res) => {
        console.log(req.body);
        try {
          const data = await this.boardService.createBoard(req.body);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // delete board
      this.app.delete('/api/board/:boardid', async (req, res) => {
        try {
          const data = await this.boardService.deleteBoard(req.params.boardid);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // add member to board
      this.app.patch('/api/board/:boardId/members/add', async (req, res) => {
        try {
          const data = await this.boardService.addMember(req.body.userId, req.params.boardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // remove member to board
      this.app.patch('/api/board/:boardId/members/remove', async (req, res) => {
        try {
          const data = await this.boardService.removeMember(req.body.userId, req.params.boardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // add member to board
      this.app.patch('/api/board/:boardId/lists/add', async (req, res) => {
        try {
          const data = await this.boardService.addListToBoard(req.body.listId, req.params.boardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });

      // remove member to board
      this.app.patch('/api/board/:boardId/lists/remove', async (req, res) => {
        try {
          const data = await this.boardService.removeListFromBoard(req.body.listId, req.params.boardId);
          res.json(data);
        } catch (err) {
          res.status(400);
          res.send(err.message);
        }
      });
    }

  // async updateBoard(board) {
  //     console.log('Controller: updateBoard', board);
  //     return await this.boardService.updateBoard(board);
  // }
}
