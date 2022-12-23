import React, { Component, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Modal } from 'react-native';
import AttractionsModal from '../attraction/AttractionsModal';
import SectionListSidebar from 'react-native-sectionlist-sidebar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Days from '../../../data/Days.json'
import { Context as TripContext } from '../../context/TripContext';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Tags from 'react-native-tags';



const ITEM_HEIGHT = 50;

const TripDetailsDays = ({ tripId ,canUpdate }) => {

    const [addMemberModal, setAddMemberModal] = useState(false);
    const [addAttrModal, setAddAttrModal] = useState(false);
    const [showHoursModal, setShowHoursModal] = useState(false);
    const [relevantHoursOpen, setRelevantHoursOpen] = useState('');
    const [tags, setTags] = useState([]);
    const { state, fetchTripDays, updateTripUserIdGroup } = useContext(TripContext);

    const deleteItemById = (itemToDelete) => {
        // console.log(itemToDelete);
        // let filteredData = state.filter((item) => item.key === "28.11"); //todo fix
        //filteredData=  filteredData.filter((item) => item.id != itemToDelete.id);
        //let help = this.state.tripDetails;
        //help[0].data = filteredData;
        // console.log(filteredData.data);
        //this.setState({ tripDetails: help });
    }

    const renderItem = ({ item }) => (

        <View>
            
            <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', paddingLeft: 2 }}>
                    {renderElement("location")}
                    <Text style={{ marginLeft: 5, textAlign: 'left', color: "#009387", fontWeight: 'bold', fontSize: 17 }}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    {renderElement("hours")}
                    <Text style={{ marginLeft: 5 }}>{item.startHour} - {item.endHour}</Text>
                </View>

                {item.hoursOpen ? <View style={{ flexDirection: 'row' }}>
                    {renderElement("hoursOpen")}
                    <TouchableOpacity onPress={() => { setShowHoursModal(true); setRelevantHoursOpen(item.hoursOpen) }} >
                        <Text style={{ marginLeft: 5 }}>Hours open</Text>
                    </TouchableOpacity>
                </View> : null}

                {item.description ? <View style={{ flexDirection: 'row' }}>
                    {renderElement("description")}
                    <Text style={{ marginLeft: 5 }}>{item.description}</Text>
                </View> : null}

                <View style={{ flexDirection: 'row' }}>
                    {renderElement("onMap")}
                    <Text href={item.url} style={{ color: 'blue', marginLeft: 7 }}>View on map</Text>
                </View>

                {/* <TouchableOpacity>
                    <FontAwesome onPress={() => deleteItemById(item)} name="trash-o" color="#05375a" size={20} />
                </TouchableOpacity> */}
                {/* <Text >{item.description}</Text> */}

            </View>
            
            <Modal
                transparent={true}
                animationType={"slide"}
                visible={showHoursModal}
                onRequestClose={() => { setShowHoursModal(!showHoursModal) }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={stylesBudget.ModalInsideView}>
                        <View style={stylesBudget.buttonsTopStyle}>
                            <Text style={styles.titleSub}>Hours open</Text>
                            <TouchableOpacity style={stylesBudget.buttonClose} onPress={() => { setShowHoursModal(!showHoursModal) }}>
                                <Icon name='close' style={stylesBudget.iconStyle} size={25} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text >{relevantHoursOpen}</Text>
                        </View>

                    </View>
                </View>
            </Modal>
            
        </View>
    )

    const renderElement = (type) => {
        if (type == "location")
            return <FontAwesome name="map-marker" color="#009387" size={17} style={{ marginTop: 3 }} />;
        else if (type == "hours")
            return <FontAwesome name="clock-o" color="#009387" size={17} />;
        else if (type == "onMap")
            return <FontAwesome name="map-pin" color="#009387" size={17} />;
        else if (type == "description")
            return <FontAwesome name="pencil-square-o" color="#009387" size={15} style={{ marginTop: 3 }} />;
        else if (type == "hoursOpen")
            return <FontAwesome name="info-circle" color="#009387" size={17} />;
        return null;
    }

    const updateTagsState = (Addtags) => {
        setTags(Addtags);

    }
    const onSubmitAddMember = () => {
        setAddMemberModal(false);
        updateTripUserIdGroup({ tripId, tags }); //todo check that they are actual email address

    };
    return (
        <View>
            
            {state.days &&
                <View >
                    {/* <Animatable.View style={styles.footer} animation="fadeInUpBig" > */}
                    <Modal
                        transparent={true}
                        animationType={"slide"}
                        visible={addMemberModal}
                        onRequestClose={() => { setAddMemberModal(!addModalVisible) }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={stylesBudget.ModalInsideView}>
                                <View style={stylesBudget.buttonsTopStyle}>
                                    <Text style={styles.titleSub}>Add a trip member's email:</Text>
                                    <TouchableOpacity style={stylesBudget.buttonClose} onPress={() => { setAddMemberModal(!addMemberModal) }}>
                                        <Icon name='close' style={stylesBudget.iconStyle} size={25} />
                                    </TouchableOpacity>
                                </View>
                                <Tags
                                    initialText=""
                                    //initialTags={tags}
                                    placeholder="enter name"
                                    onChangeTags={(tags) => updateTagsState(tags)}
                                    onTagPress={(index, tagLabel, event) => console.log(index, tagLabel, event)}
                                    inputStyle={{ backgroundColor: "white", border: "2px solid #717171", borderRadius: 10 }}
                                />
                                <TouchableOpacity style={stylesBudget.buttonSubmit} onPress={() => { onSubmitAddMember() }}>
                                    <Text style={stylesBudget.textButton}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    {canUpdate&&
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => setAddAttrModal(true)}
                            style={styles.addAttrBtn}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.addAttrBtn}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: "bold", fontSize: 20 }}>Attraction </Text>
                                <FontAwesome name="plus" color="#05375a" size={20} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setAddMemberModal(true) }}
                            style={styles.addAttrBtn}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.addAttrBtn}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: "bold", fontSize: 20 }}>Member </Text>
                                <Icon name='addusergroup' size={25} style={{ color: '#05375a' }} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    }
                    <SectionListSidebar
                        data={state.days.slice()}
                        renderItem={renderItem}
                        itemHeight={ITEM_HEIGHT}
                        sectionHeaderHeight={38}
                        sectionHeaderTextStyle={{ fontWeight: "bold", paddingVertical: 7, textAlign: 'center', paddingHorizontal: 10, backgroundColor: '#29c2b9', borderRadius: 10, color: 'white', borderWidth: 2, borderColor: '#009387' }}

                        sidebarItemContainerStyle={{ width: 100, backgroundColor: '#edfcfa', borderRadius: 8, borderWidth: 2, borderColor: '#abd1ce' }}
                        sidebarItemTextStyle={{ padding: 2, color: '#009387', textAlign: 'center', fontWeight: "bold" }}
                        sidebarContainerStyle={{ width: 100, alignSelf: "flex-start", alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 8 }}
                    />
                </View>
            }
            <AttractionsModal setAddAttrModal={setAddAttrModal} addAttrModal={addAttrModal} />
        </View>
    );
}


const stylesBudget = StyleSheet.create({
    buttonStyle: {
        color: '#009387',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(170, 207, 202)',
        overflow: "hidden",
        width: 65,
        height: 30,
        flexDirection: "row",
        margin: 2,

    },
    buttonStyle2: {
        color: '#009387',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(170, 207, 202)',
        overflow: "hidden",
        width: 70,
        height: 30,
        flexDirection: "row"
    },
    buttonSubmit: {
        backgroundColor: '#009387',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(170, 207, 202)',
        overflow: "hidden",
        width: 70,
        justifyContent: 'flex-end',
        textAlign: 'center'
    },
    textButton: {
        color: "white",
        fontWeight: 'bold',

    },
    buttonClose: {
        color: '#009387',
        borderColor: '#009387',
        overflow: "hidden",
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    iconStyle: {
        color: '#009387'
    },
    textStyle: {
        color: '#009387',
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    buttonsTopStyle: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    ModalInsideView: {
        //justifyContent: 'center',
        //alignItems: 'center', 
        backgroundColor: "white",
        height: 200,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#009387',
        width: '90%',
        paddingHorizontal: 3,
        alignItems: 'center'
    },
    ModalListInsideView: {
        backgroundColor: "white",
        height: 250,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#009387',
        width: '90%',
        paddingHorizontal: 3,
        alignItems: 'center'
    },
    viewButtonStyle: {
        flexDirection: 'row-reverse',
        marginRight: '5%',
        marginBottom: '2%'
    },
    textModal: {
        color: '#009387',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#009387'
    },
    listModal: {
        flexDirection: "row",
        margin: 2,
    }
});

//todo take from maon styles file
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        // height: 33,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#edfcfa',
        borderRadius: 8,
        borderWidth: 2, borderColor: '#abd1ce'

    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 27
    },
    header: {
        flex: 0.2,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    item: {
        height: ITEM_HEIGHT,
        paddingTop: 12,
        paddingHorizontal: 10,
    },
    sectionHeaderTextStyle: {
        paddingTop: 7,
        paddingHorizontal: 10,
        backgroundColor: '#F2F2F2',
    },
    sidebarItemTextStyle: {
        padding: 2,
        color: 'black',
        textAlign: 'center',
    },
    sidebarContainerStyle: {
        width: 30,
        backgroundColor: '#E6E6E6',
    },
    itemName: {
        textAlign: 'left'
    },
    addAttrBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10
    }
});

export default TripDetailsDays;