import { Avatar, IconButton, Menu, MenuItem, SxProps } from '@mui/material'
import React from 'react'

type IconDropdownProps = {
  dropdownIcon: string,
  menuItems: string[],
  setMenuItemSelected: any,
  sx: SxProps | null,
  buttonSize: string
}

const IconDropdown = (props: IconDropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    setAnchorEl(e.currentTarget);
  }
  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement>, key: number) => {
    props.setMenuItemSelected(key);
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick} sx={{width: 50, height: 50}}>
        <Avatar src={require("images/" + props.dropdownIcon)} />
      </IconButton>
      {
        props.menuItems?.length > 0 &&
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
            props.menuItems.map((sc, index) => {
              return (<MenuItem
                id={"index"}
                key={index}
                onClick={event => handleMenuClick(event, index)}>{sc}
              </MenuItem>);
            })
          }
        </Menu>
      }
    </>
  )
}

IconDropdown.defaultProps = {
  buttonSize: "small"
}

export default IconDropdown;