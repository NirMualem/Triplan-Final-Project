
const countryReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }; //update the state with the error msg property
        case 'getContry':
            return { errorMessage: '', token: action.payload }; //we change the entire state
        case 'getCity':
            return { errorMessage: '', token: action.payload }; //we change the entire state
        default:
            return state;
    }
};

const getContry = (dispatch) => async ({ navigation }) => {
    try {
        //make an api request with email and password
        const response = await fetchApi.get('/country', {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization"
            }
        }).catch(err => { throw err });

        //saves the user's token in case the app was closed, so the user doesn't have to log in every time
        //await AsyncStorage.setItem('token', response.data.token); //response.data has a token property

        console.log(response.data.token);
        //if we sign up, modify our state, and say that we need to be authenticated
        //dispatch({ type: 'signUp', payload: response.data.token });

        //navigation.replace('Sign In');

        //sign up failed => show an error somewhere
        return response;
    }
    catch (err) {
        errorHandle(err, dispatch);//check if server error or input error
    }
};

