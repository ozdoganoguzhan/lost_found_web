import { ISubCategory } from "api/Interfaces";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, ListItemProps, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface NewCategoryButtonProps extends ListItemProps {
  categoryId: string,
  categoryName: string,
  subCategories: Array<ISubCategory>,
  setCurrentCategory: any,
  openCategory: string,
  setOpenCategory: any
}

const NewCategoryButton = ({ openCategory, setOpenCategory, categoryId, categoryName, subCategories, setCurrentCategory }: NewCategoryButtonProps) => {
  const { t } = useTranslation();
  let icon = null;

  if (subCategories.length > 0) icon = openCategory === categoryId ? <ExpandLess /> : <ExpandMore />;

  const handleButtonClick = () => {
    if (subCategories.length > 0) setOpenCategory((prev: string): string => {
      if (prev === categoryId) return ""
      else return categoryId
    });
    else setCurrentCategory(categoryId);
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    setCurrentCategory(key);
  }

  return (
    <li >
      <ListItemButton onClick={handleButtonClick}>
        <ListItemText sx={{fontSize: {xs: "12px"}}}>
          {t(categoryName)}
        </ListItemText> {icon}
      </ListItemButton>
      {subCategories.length > 0 &&
        <Collapse
          component="li"
          in={openCategory === categoryId}
          timeout="auto"
          sx={{ maxWidth: { xs: "100%" }, bgcolor: "#D0D0D0" }}
          unmountOnExit>
          <List disablePadding>
            {
              subCategories.map((sc, index) => {
                return <ListItemButton
                  sx={{
                    pl: 4
                  }}
                  id={"index"}
                  key={index + 1}
                  onClick={event => handleMenuClick(event, sc.subCategoryId)}>
                  {t(sc.subCategoryName)}
                </ListItemButton>
              })}
          </List>
        </Collapse>
      }
    </li>
  );
}

export default NewCategoryButton;