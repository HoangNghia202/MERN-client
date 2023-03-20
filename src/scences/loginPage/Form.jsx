import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import DropZoneImage from "./DropZoneImage";
import { registerUser, loginUser } from "../../services/userServices";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  location: Yup.string().required("Location is required"),
  occupation: Yup.string().required("Occupation is required"),
  picture: Yup.string().required("Picture is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValueRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValueLogin = {
  email: "",
  password: "",
};

const FormRegisterLogin = (props) => {
  const { isNoneMobileScreens } = props;
  const [clearImg, setClearImg] = useState(0);
  console.log("isNoneMobileScreens", isNoneMobileScreens);

  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const palette = theme.palette;
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  console.log("login", isLogin);
  console.log("register", isRegister);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
    if (isLogin) {
      let userInfo = {
        email: values.email,
        password: values.password,
      };
      let res = await loginUser(userInfo);
      console.log("res login >>>", res);
      if (!res.error) {
        let payload = {
          token: res.token,
          user: res.user,
        };
        dispatch(setLogin(payload));
        navigate("/home");
      }
    }
    if (isRegister) {
      let loginInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        location: values.location,
        occupation: values.occupation,
        picturePath: values.picture.path,
      };
      let res = await registerUser(loginInfo);
      console.log("res register >>>", res);
      if (res.error === false) {
        setPageType("login");
      }
    }
  };

  const resetImg = () => {
    setClearImg(clearImg + 1);
  };
  return (
    <Formik
      initialValues={isLogin ? initialValueLogin : initialValueRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        resetForm,
        setFieldValue,
      }) => (
        <Form className="grid grid-cols-2 gap-3">
          <Field
            as={TextField}
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            className="col-span-2"
          />

          <Field
            as={TextField}
            name="password"
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            className="col-span-2"
            type="password"
          />

          {isRegister && (
            <>
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                className="col-span-2"
                type="password"
              />

              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                className="sm:col-span-2 md:col-span-1"
              />

              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                className="sm:col-span-2 md:col-span-1"
              />
              <Field
                as={TextField}
                name="location"
                label="Location"
                variant="outlined"
                margin="normal"
                fullWidth
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                className="col-span-2"
              />
              <Field
                as={TextField}
                name="occupation"
                label="Occupation"
                variant="outlined"
                margin="normal"
                fullWidth
                error={touched.occupation && Boolean(errors.occupation)}
                helperText={touched.occupation && errors.occupation}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.occupation}
                className="col-span-2"
              />

              <div className="col-span-2">
                <DropZoneImage
                  sizeFiles={1}
                  clearImg={clearImg}
                  setFieldValue={setFieldValue}
                />
              </div>
            </>
          )}
          <div className="col-span-2">
            {isLogin ? (
              <Button
                className=""
                variant="contained"
                color="info"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Loading" : "Login"}
              </Button>
            ) : (
              <Button
                className=""
                variant="contained"
                color="info"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Loading" : "Register"}
              </Button>
            )}

            {isRegister && (
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                color="warning"
                type="reset"
                onClick={() => {
                  resetImg();
                  setFieldValue("picture", "");
                }}
              >
                Reset
              </Button>
            )}
          </div>

          <div>
            {isLogin ? (
              <Typography>
                You don't have an account?{" "}
                <span
                  className="text-blue-600 underline decoration-solid cursor-pointer"
                  onClick={() => {
                    setPageType("register");
                    resetForm();
                  }}
                >
                  Register
                </span>
              </Typography>
            ) : (
              <Typography>
                You have an account?{" "}
                <span
                  className="text-blue-600 underline decoration-solid cursor-pointer"
                  onClick={() => {
                    setPageType("login");
                    resetForm();
                  }}
                >
                  Login
                </span>
              </Typography>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormRegisterLogin;
