import Promise from 'bluebird';
import { createPhrasesTableIfNotExists } from './modules/phrases/phrasesDAL';
import { createPhrasesCategoriesTableIfNotExists } from './modules/phrasesCategories/phrasesCategoriesDAL';

Promise.all([createPhrasesTableIfNotExists(), createPhrasesCategoriesTableIfNotExists()]).then(
  () => {
    console.log('Database intialized');
    process.exit();
  }
);
