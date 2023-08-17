import React from 'react'
import Box from "@mui/material/Box"
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid, SxProps, Typography, List, ListItem, IconButton, Paper } from '@mui/material';
import LanguageSelector from 'components/main/LanguageSelector';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTranslation } from 'react-i18next';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <Paper variant='elevation' elevation={5} sx={{
            backgroundColor: "scondary",
            height: 100,
            width: "100%"
        }}>

            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                columnGap={4}
                sx={{
                    pt: 2,
                    pl: 5,
                    pr: 5
                }}
            >
                <Grid item>
                    <Typography>LostFound Copyright</Typography>
                </Grid>
                <Grid item>
                    <LanguageSelector />
                </Grid>
                <Grid item>
                    <Typography  variant="h4">{t("contact", "Contact")}</Typography>
                    <Typography>İletişim Sayfası</Typography>
                </Grid>
                <Grid item>
                    <Typography></Typography>
                    <Grid>
                        <IconButton>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>


        </Paper>

    );

}

export default Footer;