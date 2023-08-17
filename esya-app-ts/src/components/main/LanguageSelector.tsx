import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import i18next from 'i18next';
import React, { useState } from 'react'
import { GetLanguageKey, GetLanguages, LanguageDictionary } from 'context/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const langs = GetLanguages();
  const {t} = useTranslation();
  const defLang = LanguageDictionary[i18next.language];
  const handleLanguageChange = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    const newLang: any = GetLanguageKey(GetLanguages()[i])
    i18next.changeLanguage(newLang);
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small">{t("language")}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label="Language"
        defaultValue={defLang}
      >
        {
          langs.map((sc, index) => {
            return (<MenuItem
              id={"index"}
              key={index}
              value={sc}
              onClick={event => handleLanguageChange(event, index)}>{sc}
            </MenuItem>);
          })
        }
      </Select>
    </FormControl>
  )
}

export default LanguageSelector