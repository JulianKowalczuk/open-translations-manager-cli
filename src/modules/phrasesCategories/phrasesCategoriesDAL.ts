import Promise from 'bluebird';
import db from '../../db';
import { PhraseCategory } from './phrasesCategoriesTypes';

const phrasesCategoriesTableId = 'phrasesCategories';

export function createPhrasesCategoriesTableIfNotExists() {
  return db.schema.hasTable(phrasesCategoriesTableId).then(exists => {
    if (exists) {
      return Promise.resolve();
    }

    return db.schema.createTable(phrasesCategoriesTableId, table => {
      table.increments('id');
      table.string('name');

      table.unique(['name']);
    });
  });
}

export function getPhrasesCategories() {
  return db.table(phrasesCategoriesTableId).select();
}

export function createPhraseCategories(phraseCategory: PhraseCategory) {
  return db.table(phrasesCategoriesTableId).insert(phraseCategory);
}

export function updatePhraseCategory({ id, name }: PhraseCategory) {
  return db
    .table(phrasesCategoriesTableId)
    .where({ id })
    .update({ name });
}

export function deletePhraseCategory(id: number) {
  return db
    .table(phrasesCategoriesTableId)
    .where({ id })
    .del();
}
