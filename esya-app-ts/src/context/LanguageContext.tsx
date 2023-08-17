import React, { SetStateAction } from 'react'

export const LanguageDictionary: { [key: string]: string } = {
  "en": "English",
  "tr": "Türkçe",
  "de": "Deutsch"
}

export const GetLanguages = (): string[] => {

  const tempArray: string[] = [];

  Object.entries(LanguageDictionary).forEach(([key, value]) => {
    tempArray.push(value);
  });
  
  return tempArray!;
}

export const GetLanguageKey = (langName: string) => {
  const result1 = (Object.keys(LanguageDictionary) as (keyof typeof LanguageDictionary)[]).find((key) => {
    return LanguageDictionary[key] === langName;
  });
  return result1;
}

type langType = {
  language: string,
  setLanguage: React.Dispatch<SetStateAction<string>>
}

const defContext: langType = {
  language: "en",
  setLanguage: () => {}
}

export const LanguageContext = React.createContext(defContext);