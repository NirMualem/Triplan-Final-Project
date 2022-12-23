import { NavigationActions } from 'react-navigation';

let navigator;

//a function to help us navigate between pages
export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => { // params = any aditional info to pass to the screen we're about to show
  //we are telling react to change its dtate and show a different screen to the user
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
