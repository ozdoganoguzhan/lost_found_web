import React, { useContext } from 'react'
import NavbarButtons from './NavbarButtons';
import Searchbar from './Searchbar';
import Grid from '@mui/material/Grid';
import ProfileDropdown from './ProfileDropdown';
import { UserContext } from '../../context/UserContext';
import { useTranslation } from 'react-i18next';
import { AppBar, Typography } from '@mui/material';
import i18next from 'i18next';
import { GetLanguages, GetLanguageKey } from '../../context/LanguageContext';

const Navbar = () => {
    const langs = GetLanguages();
    const { user, setUser } = useContext(UserContext);
    const { t } = useTranslation();

    const languageSelectHandler = (i: number) => {
        const newLang: any = GetLanguageKey(GetLanguages()[i])
        i18next.changeLanguage(newLang);
        // navigate("?lng=" + GetLanguageKey(GetLanguages()[i]));

    }
    return (
        <AppBar color='primary' position='fixed'>
            <Grid overflow="hidden" alignItems="center" maxHeight="50" container direction="row">
                <Grid item xs>
                    <NavbarButtons />
                </Grid>
                <Grid item xs>
                    <Searchbar />
                </Grid>
                <Grid container alignItems="center" justifyContent="end" item xs>
                    <Typography sx={{ display: { xs: "none", md: "none", lg: "flex" } }} overflow="hidden">{user.firstName && t("welcome-user") + " " + user.firstName}</Typography>
                    <ProfileDropdown />


                </Grid>
            </Grid>
        </AppBar>




    )
}

export default Navbar;