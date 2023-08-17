import * as React from 'react';
import {
  Typography, Container, Box, Link, Grid, TextField,
  CssBaseline, Button, Avatar, Checkbox, FormControlLabel, Paper, Alert, Snackbar
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import userLogo from "../../images/userLogo.png";
import backButtonIcon from "../../images/left-chevron.png";
import { useTranslation } from 'react-i18next';
import { GetLanguageKey, GetLanguages } from '../../context/LanguageContext';
import i18next from 'i18next';
import IconDropdown from '../buttons/IconDropdown';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { useState } from 'react';
import { UserContext } from 'context/UserContext';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        LostFound
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const langs = GetLanguages();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [userNameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [buttonClickable, setButtonClickable] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [userExistsSnackbarOpen, setUserExistsSnackbarOpen] = useState(false);


  const emailExpression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const languageSelectHandler = (i: number) => {
    const newLang: any = GetLanguageKey(GetLanguages()[i])
    i18next.changeLanguage(newLang);
    // navigate("?lng=" + GetLanguageKey(GetLanguages()[i]));

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    const firstName = (event.currentTarget.elements.namedItem('firstName') as HTMLInputElement).value;
    const lastName = (event.currentTarget.elements.namedItem('lastName') as HTMLInputElement).value;
    const userName = (event.currentTarget.elements.namedItem('userName') as HTMLInputElement).value;
    const phoneNumber = (event.currentTarget.elements.namedItem('phoneNumber') as HTMLInputElement).value;

    if (email.length <= 3 || password.length <= 3 || firstName.length <= 3
      || lastName.length <= 3 || userName.length <= 3 || phoneNumber.length <= 3) {
      setSnackbarOpen(true);
      setButtonClickable(false);
      return;
    }

    if (validateInput(email)) {
      const apiEP = createAPIEndpoint(ENDPOINTS.users)
      let userExists = false;
      await apiEP
        .fetchByEmail(email)
        .then(res => {
          if (res.data.email == email) {
            console.log("A user with this email already exists!");
            userExists = true;
          }
        })
        .catch(error => { 
          console.log(error);
        });

      if (!userExists) {
        let newUserId = 0;
        await apiEP
          .post({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profilePicture: "",
            phoneNumber: phoneNumber
          })
          .then(res => newUserId = res.data.userId)
          .catch(error => { console.log(error) });

        await setUser({
          userId: newUserId,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          profilePicture: "",
          phoneNumber: phoneNumber
        })

        navigate("/posts");
      }
      else setUserExistsSnackbarOpen(true);

    }
    else {

    }

  };

  const onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const ectValue = event.currentTarget.value;
    const ectName = event.currentTarget.name;
    console.log("CHANGE EVENT ectName: " + ectName)

    switch (ectName) {
      case "email":
        await setEmailValid(validateInput("", ectValue));
        break;
      case "userName":
        await setUserNameValid(validateInput(ectValue));
        break;
      case "firstName":
        await setFirstNameValid(validateInput(ectValue));
        break;
      case "lastName":
        await setLastNameValid(validateInput(ectValue));
        break;
      case "password":
        await setPasswordValid(validateInput(ectValue));
        break;
      case "phoneNumber":
        await setPhoneNumberValid(validateInput(ectValue));
    }


  }

  React.useEffect(() => {
    console.log(emailValid, userNameValid, firstNameValid, lastNameValid, passwordValid, phoneNumberValid)
    if (emailValid && userNameValid && firstNameValid && lastNameValid && passwordValid && phoneNumberValid)
      setButtonClickable(true);

    else {
      setButtonClickable(false);
    }
  }, [emailValid, passwordValid, userNameValid, firstNameValid, lastNameValid, phoneNumberValid])

  const validateInput = (normalText: string, email?: string) => {
    if (email != null) {
      return emailExpression.test(email)

    }
    else {
      return normalText.length >= 3;
    }
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <IconButton onClick={() => {
          navigate("/posts");
        }}>
          <Avatar src={backButtonIcon} />
        </IconButton>
      </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Paper elevation={10} sx={{
          padding: 2,
          marginTop: 8,
          display: "flex",
          flexDirection: "column"
        }}>
          <IconDropdown
            dropdownIcon="language-icon.png"
            menuItems={langs}
            setMenuItemSelected={languageSelectHandler}
            sx={{ alignSelf: "end" }} />
          <Avatar sx={{ alignSelf: "center", m: 1, bgcolor: 'secondary.main' }} src={userLogo}>

          </Avatar>
          <Typography sx={{ alignSelf: "center" }} component="h1" variant="h5">
            {t("sign-up")}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userName"
                  required
                  key={0}
                  fullWidth
                  id="userName"
                  label={t("username", "Username")}
                  autoFocus
                  onChange={onChangeHandler}
                  error={!userNameValid}
                  helperText={!userNameValid && t("field-too-short", { "minchar": "3" })}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  key={1}
                  fullWidth
                  id="firstName"
                  label={t("first-name")}
                  onChange={onChangeHandler}
                  error={!firstNameValid}
                  helperText={!firstNameValid && t("field-too-short", { "minchar": "3" })}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  key={2}
                  id="lastName"
                  label={t("last-name")}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={onChangeHandler}
                  error={!lastNameValid}
                  helperText={!lastNameValid && t("field-too-short", { "minchar": "3" })}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  key={3}
                  id="email"
                  label={t("email")}
                  name="email"
                  autoComplete="email"
                  onChange={onChangeHandler}
                  error={!emailValid}
                  helperText={!emailValid && t("invalid-email")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  key={4}
                  name="password"
                  label={t("password")}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                  error={!passwordValid}
                  helperText={!passwordValid && t("field-too-short", { "minchar": "3" })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  key={4}
                  name="phoneNumber"
                  label={t("phone-number", "Phone Number")}
                  id="phoneNumber"
                  autoComplete="new-phone-number"
                  onChange={onChangeHandler}
                  error={!phoneNumberValid}
                  helperText={!phoneNumberValid && t("field-too-short", { "minchar": "3" })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={t("accept-terms-of-use")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!buttonClickable}
            >
              {t("sign-up")}
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                {t("enter-required-fields")}
              </Alert>
            </Snackbar>
            <Snackbar open={userExistsSnackbarOpen} autoHideDuration={6000} onClose={() => {setUserExistsSnackbarOpen(false)}}>
              <Alert onClose={() => {setUserExistsSnackbarOpen(false)}} severity="error" sx={{ width: '100%' }}>
                {t("user-exists")}
              </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href='../login' variant="body2">
                  {t("already-have-account")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}