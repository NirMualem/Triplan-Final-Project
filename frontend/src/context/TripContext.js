import fetchApi from '../api/fetchAPI';
import createDataContext from './createDataContext';

const tripReducer = (state, action) => {
    switch (action.type) {
        case 'getDays':
            return { ...state, days: action.payload };
        case 'myTrips':
            return { ...state, myTrips: action.payload };
        case 'sharedTrips':
            return { ...state, shareTrips: action.payload };
        case 'updateTeam':
            return { ...state, errorMessage: '', group: action.payload };
        case 'takeSharedTrip':
            return { ...state, errorMessage: '' };
        case 'deleteTrip':
            return {...state, myTrips : state.myTrips.filter(item => item._id !== action.payload)};
        default:
            return state;
    }
};

//fetch user the trips that are attached to a single user
const fetchMyTrips = dispatch => async ({ _id }) => {
    try {
        let response = await fetchApi.get(`/myTrips?userId=${_id}`);
        dispatch({ type: 'myTrips', payload: response.data });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
}

//fetch  the trips that are share to a single user
const fetchSharedTrips = dispatch => async ({ _id }) => {
    try {
        let response = await fetchApi.get(`/sharedTrips?tripId=${_id}`);
        dispatch({ type: 'sharedTrips', payload: response.data });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
}

const deleteTrip = dispatch => async ({ tripId }) => {
    try {
        await fetchApi.delete('/deleteTrip', { data: { tripId } }).then(res => {
            dispatch({ type: 'deleteTrip', payload: tripId });
        })
        
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
}

const shareTrip = dispatch => async ({ tripId }) => {
    try {
        const response = await fetchApi.get(`/shareTrip?tripId=${tripId}`);
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
}

//fetch all the trips that are attached to a single user
// const createTrip = dispatch => async (name, country, city, urlImage, description, startDate, endDate, navigation) => {
const createTrip = (dispatch) => async ({ _id, name, country, city, startDate, endDate, navigation }) => {

    let tripId;
    let response;
    let userId;
    try {
        response = await fetchApi.post('/trips', { _id, name, country, city, urlImage: 'hi', description: 'desc' });
        tripId = response.data._id;
        await fetchApi.post('/days', { startDate, endDate, tripId });
        userId = _id;
        await fetchApi.post('/Budget/createPersonal', { tripId, userId });
        let data = [];
        await fetchApi.post('/Budget/createGroup', { tripId, data });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
    navigation.navigate("AttractionDivision", { _id: tripId });

};

const fetchTripDays = (dispatch) => async ({ tripId }) => {
    try {
        console.log(tripId);
        dispatch({ type: 'getDays', payload: null });
        const response = await fetchApi.get(`/allDays?tripId=${tripId._id}`)
            .catch(err => { console.log(err); });

        console.log(response.data);
        dispatch({ type: 'getDays', payload: response.data });
    }
    catch (err) {
        console.log(err); //check if server error or input error
    }
};



const takeSharedTrip = (dispatch) => async ({ trip, userId, name, startDate, endDate,navigation }) => {

    const _id = userId;
    const country = trip.country;
    const city = trip.city;
    const urlImage = trip.urlImage;

    let tripId;
    let response;
    try {
        response = await fetchApi.post('/trips', { _id, name, country, city, urlImage, description: '' });
        tripId = response.data._id;
        await fetchApi.post('/days', { startDate, endDate, tripId });
        let sharedtripId = trip._id;
        response = await fetchApi.post('/copyAttraction', { sharedtripId ,tripId });
        await fetchApi.post('/Budget/createPersonal', { tripId, userId });
        let data = [];
        await fetchApi.post('/Budget/createGroup', { tripId, data });
    
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
    dispatch({ type: 'takeSharedTrip', payload: response.data });
    navigation.navigate("AttractionDivision", { _id: tripId });

};

/**
 * check first if this name
 */
const updateTripUserIdGroup = (dispatch) => async ({ tripId, tags }) => {
    try {
        response = await fetchApi.put('/updateTripUserIdGroup', { tripId, tags });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
};

export const { Provider, Context } = createDataContext(
    tripReducer,
    { fetchMyTrips, fetchSharedTrips, createTrip, fetchTripDays, deleteTrip, shareTrip, updateTripUserIdGroup,takeSharedTrip },
    []
);

