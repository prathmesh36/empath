# empath-ui

## About Experience by Empath

<!-- #default-branch-switch -->

The project enables users to leverage their social media interaction and purchase history with different brands (clients) onboarded to the portal. The user gains points for the above activities and it can redeem experiences of their choice by using the collected points. The project is designed in a way to onboarded any clients with very less code change.

## About empath-ui

<!-- #default-branch-switch -->

The empath-ui project is based on material-ui v5 framework.
You can head to the material-ui documentation [(Getting Started)](https://mui.com/material-ui/getting-started/) to learn more about the framework.

Change the src/metadata/constants.js file to point to the empath-backend system.
```js
export const BASE_URL = "http://localhost:8080" // Your empath-backend URL;
```

To start the project we need to run the following commands.
Install it and run:

```sh
npm install
npm start
```

## About empath-ui directory structure

- ### **/src/api/**
    
    The /api directory contains the REST API call code in api.js file. It is a common function used across all components in the project to make a REST api call.
    The api.js file's apiCall function accepts axios configuration, a post call transform & setter function and expiry token. The function is configurable and can be reused easily across the entire project.

- ### **/src/auth/**

    The /auth directory contains the code necessary for authentication. The LocalStorage.js file is used for maintaining the user JWT Token in the browser's local storage which is used for making authorized rest api calls to the empath-backend.
    The AuthProvider.js file is a Context Provider which helps various component across the project to access the user token and data stored in Local Storage, perform sign-in and sign-out operations.

- ### **/src/images/**

    The /images directory contains images used across the project.

- ### **/src/routes/**

    The /routes directory contains [react-router-dom](https://reactrouter.com/en/main) based routing system used across the project.

- ### **/src/stylesheets/**

    The /routes directory contains css stylesheets. 

- ### **/src/theme/**

    The /theme directory contains the code necessary for theming the entire UI. The LocalStorage.js file in /auth is used for maintaining the user's theme preference (dark/light) in the browser's local storage which will used when the user sign-in again from the same browser.
    The ColorModeProvider.js file is a Context Provider which helps various component across the project to access the user's theme preference stored in Local Storage and perform theme switch operation.

- ### **/src/utility/**

    The /utility directory contains the various utility functions used across the project.

- ### **/src/netadata/**

    The /netadata directory contains static/constant data used across the project such as axios configurations for empath-backend REST apis, theming configuration and constant variables.

- ### **/src/components/**

    The /components directory contains React components rendered on the UI Screen.
    The Component Tree is as follows:

  * App.js
    * Router(AppHeader.js)
    * Copyright.js
    * Router(AppBody.js)
      * MyRoutes.js
        * SignIn.js
        * SignUp.js
        * NotFound.js
        * ProtectedRoute.js
          * Profile.js
            * Charts.js 
            * Deposits.js
            * Orders.js
            * Title.js
          * UpcomingExp.js
            * ExperienceModal.js 
          * YourExp.js
            * ExperienceModal.js
            * CounterInput.js
          * SignOut.js
          * Checkout.js
            * CreditBalance.js
            * Review.js
            * AddressForm.js
          Messaging.js
            * TabPanel.js 
              * ChatBox.js
                * Message.js
                * ChatBoxInput.js

## How To's for empath-ui

* ### How to add a new route for newly developed component?
  To add a new route, we need to add the code in MyRoute.js file
  ```jsx
  <Routes>
    {/* FOR COMPONENTS THAT DON'T NEED AUTHENTICATION*/}
    <Route path='/path1' element={<YOUR_COMPONENT/>} />
    {/* FOR COMPONENTS THAT NEED AUTHENTICATION*/}
    <Route path='/path2'
           element={
             <ProtectedRoute>
               <YOUR_PROTECTED_COMPONENT/>
             </ProtectedRoute>
           }
    />
  </Routes>
  ```

* ### How to leverage Local Storage?
  Custom hook for local storage can be used in your code as follows:
  ```jsx
  const [user, setUser] = useLocalStorage("your_key", DEFAULT_VALUE);
  ```
  
* ### How to use Authentication functions?
  Context Provider named AuthProvider can be used to access authentication function and variables.
  ```jsx
  const { user, setUser, login, logout } = useAuth();
  ```

* ### How to implement form validation?
  The project has included the [react-hook-form](https://react-hook-form.com/get-started#IntegratingwithUIlibraries) library. Also Yup library is used for schema definition and validation.
  ```jsx
    const validationSchema = Yup.object().shape({
        yourInputFieldNameId: Yup.string().required('Error Message'),
        yourInputField2NameId: Yup.string()
            .required('Error Message')
            .length(2, 'Error Message'),

    });
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(validationSchema)});
  ```
  
  ```jsx
        <TextField
            required
            id="yourInputFieldNameId"
            name="yourInputFieldNameId"
            label="Field Label"
            fullWidth
            autoComplete="field-value"
            defaultValue={"SOME VALUE"}
            {...register('yourInputFieldNameId')}
            error={!!errors.yourInputFieldNameId}
        />
        <Typography variant="inherit" color="textSecondary">
            {errors.yourInputFieldNameId?.message}
        </Typography>
  ```
  
  ```jsx
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit(yourOnSubmitFunction)}
          loading={loading}
      >
          Sign Up
      </LoadingButton>
  ```

* ### How to use media query?
  Material UI's media query hook can be used as follows
  ```jsx
  const isScreenMd = useMediaQuery('(max-width:1000px)');
  ```

* ### How to integrate new REST api in a component?
  Add the REST api's axios configuration in the metadata/apiConfig.js. Follow the example shown below
  ```jsx
  export const YOUR_API_CONFIG = {
    method: 'get', // use post for POST API
    url: BASE_URL + 'path'
  }
  ```
  Inside your component use the api/api.js file's apiCall function to make a call to the REST API
  ```jsx
  let authorizationHeader = {
      Authorization: `Bearer USER_TOKEN`, // get the user token using useAuth Custom Hook
      "ngrok-skip-browser-warning": "69420"
  }
  apiCall({...YOUR_API_CONFIG, headers:authorizationHeader}, setCards, user.tokenExpiry)
      .then((response)=> {
          console.debug(response);
          setLoading(true);
          if(!response[0]){
              toast.error("Message: " + response[3] + " Reason: " + response[2]);
              setCards([]);
          }
      }
      ).catch((error) => {
          toast.error("Message: " + error[3] + " Reason: " + error[2]);
          if(error[1] === -1) {
              logout();
          }
      }
  );
  ```

* ### How to change theme?
  Refer the Material UI theme guidelines [Theme](https://mui.com/material-ui/customization/theming/).
  In the project, override the theme properties in the metadata/theme.js file as per your requirements.
  Also, you can make changes in the theme/ColorModeProvider.js to add more themes support.

* ### How to add stylesheets ?
  Each component must have a separate stylesheet. The naming convention for stylesheet is same as its JS file. All the classes inside the stylesheet also following a naming convention as follows:
  ```css
  .[feature-name/file-name]-[element-description]{
  /* CSS Properties*/
  }
  ```
  
  

