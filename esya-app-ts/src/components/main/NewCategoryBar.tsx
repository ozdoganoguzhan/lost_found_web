import { createAPIEndpoint, ENDPOINTS } from "api/index";
import { ICategory, ISubCategory } from "api/Interfaces";
import { Box, List, ListItemButton, Collapse, ListItem, Paper, ListItemText } from "@mui/material";
import React, { useState } from "react";
import NewCategoryButton from "./NewCategoryButton";
import { useTranslation } from "react-i18next";

interface NewCategoryBarProps {
  currentCategory: string,
  setCurrentCategory: any
}

const NewCategoryBar = (props: NewCategoryBarProps) => {
  const [categories, setCategories] = useState(Array<ICategory>);
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState("")

  React.useEffect(() => {
    createAPIEndpoint(ENDPOINTS.subCategories)
      .fetch()
      .then((subRes) => {

        let subCategories = subRes.data;

        createAPIEndpoint(ENDPOINTS.categories)
          .fetch()
          .then((res) => {

            res.data.forEach((category: ICategory) => {
              category.subCategories = [];
              subCategories.forEach((subCategory: ISubCategory) => {

                if (category.categoryId == subCategory.categoryId) {
                  category.subCategories.push(subCategory);
                }

              });
            });
            setCategories(res.data);
          })

      })
      .catch(error => console.log(error))
  }, []);

  const handleClick = () => {
  }
  const DisplayCategoryButtons = () => {
    if (categories.length > 0) {
      return (

        categories.map((category: ICategory, i) => {
          return (
            <NewCategoryButton
              openCategory={openCategory}
              key={category.categoryId}
              categoryId={category.categoryId}
              setCurrentCategory={props.setCurrentCategory}
              categoryName={category.name}
              subCategories={category.subCategories}
              setOpenCategory={setOpenCategory} />
          )
        })


      )
    }
  }
  return (
    <Box sx={{
      mt: 4,
      display: 'flex',
      flexDirection: 'column',
      width: 360,
      maxHeight: 750,
      overflow: "auto"
    }}>
      <Paper
        sx={{
          bgcolor: '#E0E0E0',
          mt: 1,
          maxWidth: { sx: 100 }
        }}
        variant="outlined"
        component="nav"
        aria-label="mailbox folders"
      >
        <List>
          <li>
            <ListItemButton onClick={() => { props.setCurrentCategory("none") }}>
              <ListItemText>{t("category-none")}</ListItemText>
            </ListItemButton>
          </li>

          {DisplayCategoryButtons()}
        </List>
      </Paper>
    </Box>
  );
}

export default NewCategoryBar;