import { Request, Response, Router } from 'express';
import * as phrasesCategoriesDAL from './phrasesCategoriesDAL';

const phrasesCategoriesRouter = Router();

phrasesCategoriesRouter.get('/', (_: Request, res: Response) => {
  phrasesCategoriesDAL.getPhrasesCategories().then(
    phrases => {
      res.json({ data: phrases });
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesCategoriesRouter.post('/', (req: Request, res: Response) => {
  phrasesCategoriesDAL.createPhraseCategories(req.body).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesCategoriesRouter.put('/', (req: Request, res: Response) => {
  phrasesCategoriesDAL.updatePhraseCategory(req.body).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

phrasesCategoriesRouter.delete('/:id', (req: Request, res: Response) => {
  phrasesCategoriesDAL.deletePhraseCategory(req.params.id).then(
    () => {
      res.end();
    },
    err => {
      console.error(err);
      res.json({ err });
    }
  );
});

export default phrasesCategoriesRouter;
