# React
## Introduction

This documentation will assume a fair knowledge of React as well as some of the tools that we are used, including:

- [Ant Design](https://ant.design) as the UI webkit.
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Redux](https://redux.js.org/basics/usage-with-react)


# Updating the Base URL
To change the Base URL all that you have to do is change it inside the file [axiosConfig.js](../../react/src/axiosConfig.js).
```jsx
const instance = axios.create({
    baseURL: 'http://localhost:8000'
});
```

# Routes
The App.js component ([App.js](../../react/src/App.js)) is being used as the main router and it is here that the main routes are defined. If you want to define other routes in your sub-components, you should not use `<Router>` again.

As an example of this you can take the [My Profile](../../react/src/components/MyProfile/index.js) page, where a `Switch` component is used:
> `MyProfile`
```jsx
<Switch>
    <Route exact path={`${basicPATH}`} component={BasicSettings} />
    <Route exact path={`${securityPATH}`} component={SecuritySettings} />
</Switch>
```
As you may have noticed the path is not a literal string, this is so that it can accomodate for any future path changes, you can implement this with the following code:
```jsx
// ...
// inside the component
const getUrl = () => {
    // This function can be used to reliably get the current url with 1 slash at the end
    const inconsistentUrl = props.match.url;
    const lastUrlChar = inconsistentUrl[inconsistentUrl.length - 1];
    return ((lastUrlChar === '/') ? inconsistentUrl : (inconsistentUrl + '/'));
}

const url = getUrl();
//paths: 
const basicPATH = `${url}basic/`;
const securityPATH = `${url}security/`
// ...
```
> Note: Unfortunately the getUrl can not be made into a helper function, at least for now.

# Customization
##  Antd Theming
![antd theming](./img/usage_with_react.png)
ANTD is using Less as the development language for styling. A set of less variables are defined for each design aspect that can be customized to your needs.
There are some major variables below, all less variables could be found in [Default Variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less). 

Your custom changes should go in `react/config-overrides.js`.

For all of the potential customizations don't hesitate to check [their documentation](https://ant.design/docs/react/customize-theme) which covers them all.

# Layout Component
Layout Component ([Layout.js](../../react/src/containers/Layout.js))

In this template the layout component is to be used to display the main content of the webpage.
## Navbar
- When logged out:
    > ![navbar1](./img/navbar1.png)
- When logged in:
    > ![navbar2](./img/navbar2.png)

To **add more links** you can just add more `Menu.Item` under `Menu` and make sure that the `Link` `to` is the same as the `Menu.Item` `key` without the `/` at the end, otherwise it won't show as selected, you can look at how this was done for the existing ones.
> Tip: make sure that the `Menu.Item` is not nested in any other component and that it goes right under `Menu`.

# Sessions
The session is managed by the [Redux](https://redux.js.org/basics/usage-with-react) store.

When the page is loaded, an action `actions.authCheckState()` is dispatched, from [App.js](../../react/src/App.js), to the [store actions](../../react/src/store/actions/user.js) which just checks for the existence of a token in localStorage and if there is no token in localStorage it logs the user out, otherwise it checks the token's validity and dispatches some other actions [check `authCheckState()`](../../react/src/store/actions/user.js) to see the code.

When the user is not logged in the store looks the following:

![user store](./img/user_store_not_signed_in.png)

When the user is logged in the store looks the following:

![user store](./img/user_store_signed_in.png)

> Note: To visualize the above you need to get the [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

- user
    - loading - is a boolean that can used, for example, in the conditional rendering of elements, this is used in [Login](../../react/src/components/Login.js) and [My Profile](../../react/src/components/MyProfile/index.js).  
    - error - is a boolen, that can be used, for example, to set a given element to show that it errored out, such as an icon.
    - email - note that email is moved inside profile once the user has logged in. 

# Login / Register 
Login ([Login.js](../../react/src/components/Login.js)) / Register ([App.js](../../react/src/App.js))

Both of these do exactly the same thing, they sign in the user whether they are registered or not, the reason why a registration page exists is to not confuse users that may be looking for the common register/login pages.
# My Profile
My Profile ([MyProfile/index.js](../../react/src/components/MyProfile/index.js))

More options will be added in the future, these existing ones are just a proof of concept or example.
# Notifications
Notifications ([notificationHelpers.js](../../react/src/Helpers/notificationHelpers.js))

The current notification system is based on the [Ant Design notifications](https://ant.design/components/notification/) and it is implemented as a callback for actions that are dispatched to the store, this callback is optional but it is currently the way to run a notification when the axios request returns its promise.

A good example of how to use these notifications can  be seen in `Basic.js`.

> [Basic.js](../../react/src/components/MyProfile/Settings/Basic.js)
```jsx
import { runNotifications } from '../../../Helpers/notificationHelpers';
// ...
// Inside the component:
    const onFinish = values => {
        props.updateProfile(localStorage.getItem('token'), values, runNotifications)
    };
// ...
const mapDispatchToProps = dispatch => {
    return {    // map the callback just like a regular argument, in whatever action you want to dispatch
        updateProfile: (token, profile, callback) => dispatch(actions.updateProfile(token, profile, callback))
    }
}
// ...
```
> [user.js](../../react/src/store/actions/user.js)
```jsx
// ...
// when you define your action make sure to define an empty anonymous function as the
// default function in case you don't want to call notifications on the given action
export const updateProfile = (token, profile, notificationCallback = (message, outcome) => { }) => dispatch => {
    // ...
    // axios request
        .then(res => {
            // ...
            notificationCallback("Profile Updated Successfully", "SUCCESS");
        })
        .catch(err => {
            // ...
            notificationCallback(err.message, "ERROR");
        })
}
// ...
```

# How to add dependencies for Docker
