import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect, useContext } from 'react';
import userLogo from "../../images/userLogo.png";
import { createAPIEndpoint } from '../../api';
import { useNavigate } from 'react-router-dom';
import { DefaultUser, UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

const ProfileDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const {t} = useTranslation();

    const loggedIn = user.firstName.length > 1;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileClick = (event: any) => {
        setAnchorEl(null);
        navigate("users/" + user.userId);
    }
    const handleMyPosts = () => {
        setAnchorEl(null);
        navigate("myposts/");
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        setUser(DefaultUser);

    }

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {user.profilePicture.length > 3 ?
                    <Avatar alt="User Avatar" /> :
                    <Avatar alt="Not Logged In Avatar"/>
                }
            </IconButton>
            {loggedIn ?
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleProfileClick}>{t("profile")}</MenuItem>
                    <MenuItem onClick={handleMyPosts}>{t("my-posts", "My Posts")}</MenuItem>
                    <MenuItem onClick={handleLogOut}>{t("logout", "Log out")}</MenuItem>


                </Menu> :
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={() => {
                        setAnchorEl(null);
                        navigate("/login")
                    }}>{t("log-in")}</MenuItem>
                    <MenuItem onClick={() => {
                        setAnchorEl(null);
                        navigate("/signup")
                    }}>{t("sign-up")}</MenuItem>

                </Menu>
            }


        </div>
    );
}

export default ProfileDropdown;