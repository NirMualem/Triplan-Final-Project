import createDataContext from './createDataContext';
import fetchApi from '../api/fetchAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const budgetReducer = (state, action) => {
    switch (action.type) {
        case 'Personal_Budget':
            return { ...state, errorMessage: '', personal: action.payload };; //we change the entire state
        case 'group_budget':
            return { ...state, errorMessage: '', group: action.payload };
        // case 'updateTeam':
        //         return { ...state,errorMessage: '', group:action.payload}; 
        default:
            return state;
    }
};

const PersonalBudget = (dispatch) => async ({tripId,userId}) => {
    try {
        const response = await fetchApi.get(`/Budget/Personal?tripId=${tripId}&userId=${userId}`
        )
            .catch(err => {
                console.log(err);
            });

        dispatch({ type: 'Personal_Budget', payload: response.data.data });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
};

const GroupBudget = (dispatch) => async ({tripId}) => {
    //let tripId = "6249aad456c80b44e4493ece";
    try {
        const response = await fetchApi.get(`/Budget/Group?tripId=${tripId}`
        )
            .catch(err => {
                console.log(err);
            });
        dispatch({ type: 'group_budget', payload: response.data.data });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
};

const updateTeamGroup = (dispatch) => async ({ tripId, tags }) => {
    try {
        console.log(tripId);
        console.log(tags);
        response = await fetchApi.put('/Budget/updateTeamGroup', { tripId, tags });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
};


const updateGroupBudget = (dispatch) => async ({ tripId, numberGroup }) => {
    try {
        response = await fetchApi.put('/Budget/updateGroup', { tripId, numberGroup });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
};

const updatePesonalBudget = (dispatch) => async ({ tripId, userId, numberPersonal }) => {
    try {

        response = await fetchApi.put('/Budget/updatePersonal', { tripId, userId, numberPersonal });
    }
    catch (err) {
        console.log(err);//check if server error or input error
    }
    //this.PersonalBudget();
};
export const { Provider, Context } = createDataContext(
    budgetReducer,
    { PersonalBudget, GroupBudget, updateTeamGroup, updatePesonalBudget, updateGroupBudget },
    []
);
