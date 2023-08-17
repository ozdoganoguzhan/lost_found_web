import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { EffectCallback, useEffect, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Colors } from '../../colors/Colors';

const Searchbar = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchPlaceholder = t("search-posts");

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = (e.currentTarget.elements.namedItem('searchInput') as HTMLInputElement).value;

    if (searchParams.has("query_text") && searchInput.length > 0) {
      searchParams.set("query_text", searchInput);
    }
    else if (searchParams.has("query_text") && searchInput.length == 0) {

      searchParams.delete("query_text");
    }
    else if (searchInput.length > 0) {
      searchParams.append("query_text", searchInput);
    }
    if (searchParams.has("pageOffset")) searchParams.delete("pageOffset");
    setSearchParams(searchParams);
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', height: 30, display: 'flex', alignItems: 'center', width: {xs: 200, md: 300, lg: 400}, alignSelf: "center" }}
      onSubmit={searchHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={searchPlaceholder}
        inputProps={{ 'aria-label': 'search google maps' }}
        name="searchInput"
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;