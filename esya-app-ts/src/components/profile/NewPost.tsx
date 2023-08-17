import { createAPIEndpoint, ENDPOINTS } from 'api/index';
import { Box, ListSubheader, Container, CssBaseline, Paper, Typography, TextField, Button, Grid, Select, FormControl, InputLabel, MenuItem, CircularProgress, SelectChangeEvent, Alert, Snackbar } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ICategory, ISubCategory } from 'api/Interfaces';
import { UserContext } from 'context/UserContext';
import axios from 'axios';

const Cities = [
  "Ankara",
  "İstanbul",
  "İzmir"
]
const NewPost = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categories, setCategories] = React.useState(Array<ICategory>);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [textValid, setTextValid] = useState(true);
  const [photoValid, setPhotoValid] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  React.useEffect(() => {
    if (titleValid && cityValid && categoryValid && addressValid && textValid && photoValid) setInputValid(true);
    else setInputValid(false);
  }, [titleValid, cityValid, categoryValid, addressValid, textValid, photoValid])

  const validateInput = () => {
    // Validate with regular expressions in the future
    return true
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let ect = event.currentTarget;

    switch (ect.name) {
      case "title":
        if (ect.value.length > 3) setTitleValid(true);
        else setTitleValid(false);
        break;

      case "address":
        if (ect.value.length > 3) setAddressValid(true);
        else setAddressValid(false);
        break;
      case "text":
        if (ect.value.length > 3) setTextValid(true);
        else setTextValid(false);
        break;
      case "photo":
        if (ect.value.length > 3) setPhotoValid(true);
        else setPhotoValid(false);
        break;
    }
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    let et = event.target;
    switch (et.name) {
      case "category":
        if (et.value.length > 3) setCategoryValid(true);
        else setCategoryValid(false);
        break;
      case "city":
        if (et.value.length > 3) setCityValid(true);
        else setCityValid(false);
        break;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ecte = event.currentTarget.elements;
    const title = (ecte.namedItem('title') as HTMLInputElement).value;
    const city = (ecte.namedItem('city') as HTMLInputElement).value;
    const category = (ecte.namedItem('category') as HTMLInputElement).value;
    const photo = (ecte.namedItem('photo') as HTMLInputElement).files![0];
    const address = (ecte.namedItem('address') as HTMLInputElement).value;
    const text = (ecte.namedItem('text') as HTMLInputElement).value;

    if (title.length <= 3 || city.length <= 3 || category.length <= 3 || photo.name.length <= 3
      || address.length <= 3 || text.length <= 3) {
      setInputValid(false);
      setSnackbarOpen(true);
      return;
    }
    let formData = new FormData();

    const newPostValues = {
      title: title,
      city: city,
      categoryId: category,
      imageUrl: "",
      address: address,
      userId: user.userId,
      text: text,
      date: new Date(),
      isFound: false
    }

    if (validateInput()) {
      let newPostId = 0;

      await createAPIEndpoint(ENDPOINTS.posts)
        .post(newPostValues)
        .then(res => {
          formData.append("image", photo, "post" + res.data.postId + ".png");
          newPostId = res.data.postId;
        })
        .catch(error => console.log(error));

      await axios.post("https://localhost:7183/upload/post-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => console.log(res))
        .catch(error => console.log(error));

      newPostValues.imageUrl = "post" + newPostId + ".png";
      await createAPIEndpoint(ENDPOINTS.posts)
        .put(newPostId.toString(), { postId: newPostId, ...newPostValues })
        .then(res => console.log(res))
        .catch(error => console.log(error));

      await loadBeforeNavigate();
      navigate("/posts/" + newPostId)

    }
  }

  const loadBeforeNavigate = () => {
    setLoading(true);
    return new Promise(resolve => setTimeout(resolve, 5000));
  }

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const DisplayGroupedCategories = () => {
    let index = 0;

    return (
      <FormControl margin="normal" fullWidth>
        <InputLabel id="select-category">{t("category")}</InputLabel>
        <Select
          labelId="demo-select-category"
          id="select-category"
          name='category'
          label="category"
          onChange={handleSelectChange}
        >

          {
            categories.map((category) => {
              return (
                [
                  <ListSubheader>{t(category.categoryId)}</ListSubheader>,
                  category.subCategories.map((subCategory) => {
                    index += 1;
                    return (

                      <MenuItem
                        value={subCategory.subCategoryId}
                      >
                        {t(subCategory.subCategoryName)}
                      </MenuItem>

                    );
                  })
                ]
              );
            })
          }
        </Select>
      </FormControl>
    )

  }
  return (

    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography sx={{ alignSelf: "center" }} component="h1" variant="h5">
        {t("new-post", "New Post")}
      </Typography>
      <Paper elevation={10} sx={{
        padding: 2,
        marginTop: 8,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{}}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid xs={6} sx={{ pr: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label={t("post-title")}
                name="title"
                autoFocus
                onChange={handleChange}
                error={!titleValid}
                helperText={!titleValid && t("field-too-short", { "minchar": 4 })}
              />
            </Grid>
            <Grid container columnGap={2} direction="row" xs={6}>
              <Grid xs>
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="select-city">{t("city")}</InputLabel>
                  <Select
                    labelId="select-city"
                    id="select-city"
                    name='city'
                    label="city"
                    defaultValue="0"
                    onChange={handleSelectChange}

                  >
                    {Cities != null ?
                      Cities.map((city, index) => {
                        return (
                          <MenuItem
                            value={city}
                          >
                            {t(city)}
                          </MenuItem>
                        );

                      }) :
                      <MenuItem>Loading...</MenuItem>
                    }
                  </Select>
                </FormControl>

              </Grid>

              <Grid xs>
                {categories != null ?
                  DisplayGroupedCategories() :
                  <p>Loading...</p>
                }
              </Grid>
              <Grid xs>
                <Button variant="contained" component="label">
                  Upload
                  <input onChange={handleChange}
                    name="photo" hidden accept="image/*" type="file" />
                </Button>
                <label htmlFor="photo">Your file: </label>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label={t("address")}
              name="address"
              onChange={handleChange}
              error={!addressValid}
              helperText={!addressValid && t("field-too-short", { "minchar": 4 })}

            />
          </Grid>
          <Grid>
            <TextField
              multiline
              minRows={3}
              margin="normal"
              required
              fullWidth
              id="text"
              label={t("text")}
              name="text"
              onChange={handleChange}
              error={!textValid}
              helperText={!textValid && t("field-too-short", { "minchar": 4 })}

            />
          </Grid>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("password")}
              type="password"
              id="password"
              autoComplete="current-password"
            /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!inputValid}
          >
            {t("submit-post")}
          </Button>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
              {t("enter-required-fields")}
            </Alert>
          </Snackbar>
        </Box>
        {loading &&
          <CircularProgress />

        }

      </Paper>
    </Container>


  )
}

export default NewPost;