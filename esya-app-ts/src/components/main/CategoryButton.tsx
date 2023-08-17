import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { ISubCategory } from 'api/Interfaces'

type CategoryButtonProps = {
  setCurrentCategory: any,
  categoryId: string,
  categoryName: string,
  subCategories: Array<ISubCategory> | null
}

const CategoryButton = (props: CategoryButtonProps) => {
  const [ t ] = useTranslation();
  let currentlyHovering = false;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleButtonHover = (event: any) => {
  //   anchorEl !== event.currentTarget && setAnchorEl(event.currentTarget)
  //   if (!currentlyHovering) currentlyHovering = true;
  //   setTimeout(() => {
  //     if (!currentlyHovering) handleClose();
  //   }, 50);
  // }
  // const handleCloseHover = () => {
  //   currentlyHovering = false;

  // }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement>, key: string) => {
    props.setCurrentCategory(key);
  }
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.subCategories == null) {
      // props.setCurrentCategory(props.categoryId * 10);
    }
    else setAnchorEl(e.currentTarget);
  }
  return (
    <>
      <Button
        aria-controls={open ? props.categoryName : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleButtonClick}
      >
        {t(props.categoryName)}
      </Button>
      {
        props.subCategories !== null &&
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            onMouseLeave: handleClose
          }}
          anchorOrigin={{
            horizontal: "right",
            vertical: "top"
          }}
        >
          {
            props.subCategories.map((sc, index) => {
              return <MenuItem id={"index"}
                key={index + 1}
                onClick={event => handleMenuClick(event, sc.subCategoryId)}>
                {t(sc.subCategoryName)}
              </MenuItem>
            })
          }


        </Menu>
      }
    </>

  )
}

export default CategoryButton