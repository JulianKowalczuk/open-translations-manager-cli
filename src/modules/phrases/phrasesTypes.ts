export type LangCode = 'en' | 'no' | 'sv';

type BasePhrase = {
  name: string;

  id?: number;
  comment?: string;
};

export type PhraseValues = {
  [langCode: string]: string;
};

export type Phrase = BasePhrase & {
  categoriesIds?: number[];
  values?: PhraseValues;
};

export type PhraseRow = BasePhrase & {
  categoriesIds: string;
  values: string;
};
