import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchApi from '../api/fetchAPI';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }; //update the state with the error msg property
        case 'signIn' || 'signUp' || 'signOut' || 'deleteAccount':
            return { errorMessage: '', token: action.payload , user:action.user}; //we change the entire state
        default:
            return state;
    }
};


//we have 3 cases in which we want to change the state
const signUp = (dispatch) => async ({ email, password, confirmPassword,  firstName, lastName, navigation }) => {
    try {
        let profileDefultImage = require('../../assets/profile.png');
        
        //make an api request with email and password
        const response = await fetchApi.post('/signup', { email, password, confirmPassword, firstName, lastName, profileDefultImage}, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
            }
        }).catch(err => { throw err });

        //saves the user's token in case the app was closed, so the user doesn't have to log in every time
        await AsyncStorage.setItem('token', response.data.token); //response.data has a token property
        await AsyncStorage.setItem('email', email);// for check return user
        await AsyncStorage.setItem('password', password);// for check return user

        console.log(response.data.token);
        //if we sign up, modify our state, and say that we need to be authenticated
        dispatch({ type: 'signUp', payload: response.data.token  , user: response.data.user});

        navigation.replace('OpeningScreen');
          
    }
     //sign up failed => show an error somewhere
    catch (err) {
        errorHandle(err, dispatch);//check if server error or input error
    }
};


const signIn = (dispatch) => async ({ email, password, navigation }) => {
    try {
        //make an api request with email and password
        const response = await fetchApi.post('/signin', { email, password }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
            }
        }).catch(err => {
            throw err;
        });
        //saves the user's token in case the app was closed, so the user doesn't have to log in every time
        await AsyncStorage.setItem('token', response.data.token); //response.data has a token property
        await AsyncStorage.setItem('email', email);// for check return user
        await AsyncStorage.setItem('password', password);// for check return user
        //if we sign up, modify our state, and say that we need to be authenticated
        dispatch({ type: 'signIn', payload: response.data.token , user: response.data.user});
        navigation.replace('tabs');

        //sign up failed => show an error somewhere
    }
    catch (err) {
        //if problem with server
        if(await AsyncStorage.getItem('token') !== 'null') //disconnect server
        {
            AsyncStorage.setItem('token', null);//clear user token
            navigation.replace('Sign In');// go login screen (from openning screen)
        }
        errorHandle(err, dispatch);//check if server error or input error
    }
};

const signOut = (dispatch) => async  ({navigation}) => {
    await AsyncStorage.setItem('token', null); //clear user token
    dispatch({ type: 'signOut', payload: null , user: null});
    navigation.replace('Sign In');
};

const deleteAccount = (dispatch) => async  ({navigation , email}) => {
    try {
        //make an api delete request with email  
        const response = await fetchApi.delete('/deleteAccount',  {
        data: {email}
        }).then(() => {
            AsyncStorage.setItem('token', null); //clear user token
            dispatch({ type: 'deleteAccount', payload: null , user: null});
            navigation.replace('Sign In');})
        .catch(err => {
            throw err;
        });
    }
    catch (err) {
        errorHandle(err, dispatch);//check if server error or input error
    }
};

const errorHandle = (err, dispatch) => {
    if (err.message === 'Network Error') //server not response
        dispatch({ type: 'add_error', payload: 'Oops! something went wrong with the server. Please try again later' });
    else //server response with error
        dispatch({ type: 'add_error', payload: err.response.data.error });
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signOut, signUp , deleteAccount},
    { token: null, errorMessage: '' , user : null }, //the default of token is null, meaning he's not logged by default
);