import Promise from 'bluebird';
import db from '../../db';
import { Phrase, PhraseRow } from './phrasesTypes';

const phrasesTableId = 'phrases';

function rowToPhraseMapper({ categoriesIds, values, ...otherProps }: PhraseRow): Phrase {
  return {
    categoriesIds: JSON.parse(categoriesIds),
    values: JSON.parse(values),
    ...otherProps
  };
}

function anyToRowMapper({ categoriesIds, values, ...otherProps }: Phrase): PhraseRow {
  return {
    categoriesIds: JSON.stringify(categoriesIds),
    values: JSON.stringify(values),
    ...otherProps
  };
}

export function createPhrasesTableIfNotExists() {
  return db.schema.hasTable(phrasesTableId).then(exists => {
    if (exists) {
      return Promise.resolve();
    }

    return db.schema.createTable(phrasesTableId, table => {
      table.increments('id');
      table.string('name');
      table.string('comment');
      table.jsonb('categoriesIds');
      table.jsonb('values');

      table.unique(['name']);
    });
  });
}

export function getPhrases() {
  return db
    .table(phrasesTableId)
    .select()
    .map(rowToPhraseMapper);
}

export function createPhrase(phrase: Phrase) {
  return db.table(phrasesTableId).insert(anyToRowMapper(phrase));
}

export function updatePhrase(phrase: Phrase) {
  const { id, ...otherProps } = anyToRowMapper(phrase);

  return db
    .table(phrasesTableId)
    .where({ id })
    .update(otherProps);
}

export function deletePhrase(id: number) {
  return db
    .table(phrasesTableId)
    .where({ id })
    .del();
}
