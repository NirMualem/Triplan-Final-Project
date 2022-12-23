import React, { Component, useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Modal, Text, Image } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AttractionsList from './AttractionsList';
import AttractionSearchStepOne from './AttractionSearchStepOne';
import fetchApi from '../../api/fetchAPI';
import { styles } from '../ComponentStyle';
import AttractionDetails from './AttractionDetails';
import { Context as TripContext } from '../../context/TripContext';

export const AttractionsModal = ({ setAddAttrModal, addAttrModal}) => {

  //for first screen
  const [errors, setErrorsStep] = useState(false); //hold if there errors when push next
  const [areaOfAttraction, setAreaOfAttraction] = useState('');//for search area 
  const [typeOfAttraction, setTypeOfAttraction] = useState(null);//for search type

  //for second screen
  const [attractions, setAttractions] = useState([]);//get all atrraction by type and area
  const [pagetoken, setPagetoken] = useState('');//save page token for geting more results
  const [specificAttraction, setSpecificAttraction] = useState(null);//save the attraction pick after fetch details
  const [specificAttractionId, setSpecificAttractionId] = useState('');//save the attraction pick id for fetch details

  //for third screen
  const { fetchTripDays} = useContext(TripContext);
  const [start, setStart] = useState('');//start time for the attraction picked
  const [end, setEnd] = useState('');//end time for the attraction picked
  const [description, setDescription] = useState('');//description time for the attraction picked
  const [dayPickId, setDayPickId] = useState('');//day for the attraction picked

  const [loading, setLoading] = useState(false);
  let opening_hours = "";

  //steps general arguments
  const progressStepsStyle = {
    activeLabelColor: '#009387',
    completedLabelColor: 'lightgray',
    activeStepIconBorderColor: '#009387',
    completedStepIconColor: '#009387',
    completedProgressBarColor: '#009387',
  };

  //all steps arguments
  const progressStepArgument = {
    nextBtnStyle: { backgroundColor: '#009387', borderRadius: 9 },
    nextBtnTextStyle: { color: 'white' },
    nextBtnStyle: { backgroundColor: '#009387', borderRadius: 9 },
    nextBtnTextStyle: { color: 'white' },
    errors: errors,
  }

  const progressStepTwoArgument = {
    previousBtnTextStyle: { color: 'white' },
    previousBtnStyle: { backgroundColor: '#009387', borderRadius: 9 }
  }

  //fetch attractions from google places api by location and type
  const getAttractions = async () => {
    setLoading(true);
    console.log("fetch");
    setAttractions([]);
    await fetchApi.post('/attractionsByQuary', { attraction: typeOfAttraction, area: areaOfAttraction, pagetoken }
    ).then(res => {
      console.log(res.data.next_page_token);
      setAttractions(res.data.results);
      setPagetoken(res.data.next_page_token);
      setLoading(false);
    })
      .catch(err => { throw err });
  }

  //fetch attraction details from google place details api by place id
  const getAttractionDetails = async () => {
    console.log("fetch");
    setSpecificAttraction(null);
    setSpecificAttractionId('');
    setStart('');
    setEnd('');
    await fetchApi.post('/attractionDetails', { placeId: specificAttractionId }
    ).then(res => {
      setSpecificAttraction(res.data.result);
      setLoading(false);
    })
      .catch(err => { throw err });
  }

  //check errors when pass to second screen
  const onNextStepOneValidate = async () => {
    if (areaOfAttraction === '' || typeOfAttraction === null) { //no choose type/location
      setErrorsStep(true);
    } else {
      setErrorsStep(false);
      await getAttractions();
    }
  };

  //check errors when pass to third screen
  const onNextStepTwoValidate = async () => {
    if (specificAttractionId === '') { //no choose attraction
      setErrorsStep(true);
    } else {
      setErrorsStep(false);
      await getAttractionDetails();
    }
  };

  //add attraction to a day by 
  const addAttraction = async () => {
    setLoading(true);
    if (start === '' || end === '' || dayPickId === '') {
      setErrorsStep(true);
    } else {
      setErrorsStep(false);
      if (specificAttraction.hasOwnProperty("opening_hours")) {
        setLoading(false);
        opening_hours = specificAttraction.opening_hours.weekday_text;

      }

      await fetchApi.put('/addAttraction', {
        dayId: dayPickId, name: specificAttraction.name, type: typeOfAttraction,
        startHour: start, endHour: end, description: description, hoursOpen: opening_hours, url: specificAttraction.url
      }
      ).then(res => {  
        setSpecificAttraction(res.data.result);
        setLoading(false);
        onClose();
        setSpecificAttraction(null);
        setSpecificAttractionId('');
        setStart('');
        setEnd('');
        setDescription('');
      })
        .catch(err => { throw err });
    }

  };

  //when back to first screen clear state
  const onPreviousToFirst = () => {
    setAreaOfAttraction('');
    setTypeOfAttraction(null);
    setAttractions([]);
    setPagetoken('');
  };

  //when close add attractions modal
  const onClose = () => {
    onPreviousToFirst();
    setErrorsStep(false);
    setAddAttrModal(false);
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true}
        visible={addAttrModal} onRequestClose={() => onClose}
      >
        <View style={attractionStyles.centeredView} >
          <View style={attractionStyles.modalView}>

            <View style={{ flex: 1 }}>
              <ProgressSteps {...progressStepsStyle} >

                {/*first page - choose location and type */}
                <ProgressStep onNext={onNextStepOneValidate} label="Search attractions" {...progressStepArgument}>
                  {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={styles.loadingGif} /> :
                    <AttractionSearchStepOne areaOfAttraction={areaOfAttraction}
                      setAreaOfAttraction={setAreaOfAttraction}
                      typeOfAttraction={typeOfAttraction}
                      setTypeOfAttraction={setTypeOfAttraction} />
                  }
                  {errors && <Text style={{ color: 'red' }}>Please choose a location and type</Text>}
                </ProgressStep>

                {/*second page - list of attractions */}
                <ProgressStep onPrevious={onPreviousToFirst} onNext={onNextStepTwoValidate} label="Choose attraction"
                  {...progressStepArgument} {...progressStepTwoArgument} >
                  <View style={{ flex: 1 }}>
                    <AttractionsList attractions={attractions}
                      specificAttractionId={specificAttractionId}
                      setSpecificAttractionId={setSpecificAttractionId}
                      pagetoken={pagetoken}
                      setPagetoken={setPagetoken}
                      getAttractions={getAttractions} />
                  </View>
                  {errors && <View><Text style={{ color: 'red' }}>Please choose an attraction</Text></View>}
                </ProgressStep>

                {/*third page - attraction details and add to trip */}
                <ProgressStep label="Add to trip" {...progressStepArgument} {...progressStepTwoArgument} onSubmit={addAttraction}>
                  <View style={{ alignItems: 'center' }}>
                    <AttractionDetails attraction={specificAttraction} start={start} setStart={setStart}
                      end={end} setEnd={setEnd} description={description}
                      setDescription={setDescription} dayPickId={dayPickId} setDayPickId={setDayPickId} />
                  </View>
                  {loading ? <Image source={require('./../../../assets/waiting-page.gif')} style={{ height: 50, width: 50 }} /> :<Text/>}
                  {errors && <Text style={{ color: 'red' }}>Please make sure you picked a day, start time and end time</Text>}
                </ProgressStep>

              </ProgressSteps>

            </View>

            <Pressable style={[attractionStyles.button, attractionStyles.buttonClose]} onPress={onClose}>
              <Text style={attractionStyles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const attractionStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    borderColor: "#009387",
    borderRadius: 9,
    color: "#009387",
    borderWidth: 2
  },
  textStyle: {
    color: "#009387",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

});


export default AttractionsModal;