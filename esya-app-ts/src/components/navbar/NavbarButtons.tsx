import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import languageButtonIcon from "../../images/language-icon.png"
import { GetLanguageKey, GetLanguages } from '../../context/LanguageContext'
import i18next from 'i18next'
import { Colors } from '../../colors/Colors'
import { useNavigate } from 'react-router-dom'

const NavbarButtons = () => {
    const navigate = useNavigate();

    return (

        <Button sx={{ color: Colors.navbarButtonText }} variant="text">
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => { navigate("/posts") }}
                sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "21px" },
                    mr: 2,
                    display: "flex",
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    "&:hover": {
                        color: "#FFFFFF"
                    }
                }}

            >
                LostFound
            </Typography>
        </Button>
    )
}

export default NavbarButtons