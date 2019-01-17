import { Request, Response, Router } from 'express';
import * as phrasesDAL from './phrasesDAL';

const phrasesRouter = Router();

phrasesRouter.get('/', (_: Request, res: Response) => {
  phrasesDAL.getPhrases().then(
    phrases => {
      res.json({ data: phrases });
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesRouter.post('/', (req: Request, res: Response) => {
  phrasesDAL.createPhrase(req.body).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesRouter.put('/', (req: Request, res: Response) => {
  phrasesDAL.updatePhrase(req.body).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesRouter.delete('/:id', (req: Request, res: Response) => {
  phrasesDAL.deletePhrase(req.params.id).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

export default phrasesRouter;
