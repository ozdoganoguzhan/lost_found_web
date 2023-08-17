import * as React from 'react';
import { createAPIEndpoint, ENDPOINTS } from 'api/index';
import { useTranslation } from 'react-i18next';
import CategoryButton from './CategoryButton';
import { Box, List, Collapse, Button, ButtonGroup, Paper } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess } from '@mui/icons-material';
import { ICategory, ISubCategory } from 'api/Interfaces';

type CategoryBarProps = {
  currentCategory: string,
  setCurrentCategory: any
}

const CategoryBar = (props: CategoryBarProps) => {
  const [categories, setCategories] = React.useState(Array<ICategory>);
  const { t } = useTranslation();

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

  const DisplayCategoryButtons = () => {
    if (categories.length > 0) {
      return (
        categories.map((category: ICategory, i) => {
          return (
            <CategoryButton key={category.categoryId}
              categoryId={category.categoryId}
              setCurrentCategory={props.setCurrentCategory}
              categoryName={category.name}
              subCategories={category.subCategories} />
          )
        })
      )
    }
  }

  return (

    <Paper elevation={3}
      sx={{ 
        padding: 1, 
        display: "flex",
        marginBottom: 3,
        flexDirecion: "column" 
        }}>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
        color='primary'
        sx={{ marginTop: 1 }}
        disableElevation
      >
        <Button
          onClick={() => { props.setCurrentCategory("none") }}
        >
          {t("category-none")}
        </Button>
        {DisplayCategoryButtons()}
      </ButtonGroup>
    </Paper>


  )
}

export default CategoryBar;