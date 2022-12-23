import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from "../ComponentStyle";
import * as Animatable from 'react-native-animatable';
import { Context as BudgetContext } from '../../context/BudgetContext';
import { NavigationEvents } from "react-navigation";
import BudgetGroup from './BudgetGroup';
import BudgetPersonal from './BudgetPersonal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tags from 'react-native-tags';
import Icon2 from 'react-native-vector-icons/Ionicons';

export const BudgetScreen = ({ navigation,route}) => {
    const tripId = route.params.tripId;
    const userId = route.params.userId;

  
    const { state, GroupBudget, PersonalBudget, updateTeamGroup, updatePesonalBudget, updateGroupBudget } = useContext(BudgetContext);
    
    const [personal, setPersonal] = useState(state.personal);
    const [group, setGroup] = useState(state.group);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [personalModalVisible, setPersonalModalVisible] = useState(false);
    const [groupModalVisible, setGroupModalVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const [numberPersonal, onChangePersonalNumber] = useState({});
    const [numberGroup, onChangeGroupNumber] = useState({});

    useEffect(() => {     
        updateState();
        //setTags(group?.map((persone) => (persone.x)));
    }, [state.personal, state.group]);

    const updateState = () => {
        PersonalBudget({tripId,userId});
        GroupBudget({tripId});
        setPersonal(state.personal);
        setGroup(state.group);
    }
    const onSubmitAddUsers = () => {
        setAddModalVisible(false);
        console.log(tags);
        updateTeamGroup({ tripId, tags });

    };
    const updateTagsState = (Addtags) => {
        
        setTags(Addtags);
        console.log(tags[0]);
    }

    const submitAddPersonalBudget = () => {
        setPersonalModalVisible(false);
        updatePesonalBudget({ tripId, userId, numberPersonal });
        onChangePersonalNumber({});
        console.log(tripId);
        console.log(numberPersonal);
    }

    const submitAddGroupBudget = () => {
        setGroupModalVisible(false);
        updateGroupBudget({ tripId, numberGroup });
        onChangeGroupNumber({});
    }

    return (
        <View style={styles.container}>

            <View style={[styles.header , {flexDirection: 'row'}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon2 name='arrow-back-circle' size={30} />
                </TouchableOpacity>
                <Text style={styles.text_header}>Money Expenses</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig" >
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={addModalVisible}
                    onRequestClose={() => { setAddModalVisible(!addModalVisible) }}>
                    <View style={{ flex: 1, marginTop: 200, alignItems: 'center' }}>
                        <View style={stylesBudget.ModalInsideView}>
                            <View style={stylesBudget.buttonsTopStyle}>
                                <Text style={styles.titleSub}>Add a new trip member:</Text>
                                <TouchableOpacity style={stylesBudget.buttonClose} onPress={() => { setAddModalVisible(!addModalVisible) }}>
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
                            <TouchableOpacity style={stylesBudget.buttonSubmit} onPress={() => { onSubmitAddUsers() }}>
                                <Text style={stylesBudget.textButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={personalModalVisible}
                    onRequestClose={() => { setPersonalModalVisible(!personalModalVisible) }}>
                    <View style={{ flex: 1, marginTop: 200, alignItems: 'center' }}>
                        <View style={stylesBudget.ModalListInsideView}>
                            <View style={stylesBudget.buttonsTopStyle}>
                                <Text style={styles.titleSub}>Add personal expenses:</Text>
                                <TouchableOpacity style={stylesBudget.buttonClose} onPress={() => { setPersonalModalVisible(!personalModalVisible) }}>
                                    <Icon name='close' style={stylesBudget.iconStyle} size={25} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={personal}
                                renderItem={({ item }) =>
                                    <View style={stylesBudget.listModal}>
                                        <Text style={stylesBudget.textModal}>{item.x}</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => {
                                                let textInputs = numberPersonal;
                                                textInputs[item.x] = text;
                                                console.log();
                                                onChangePersonalNumber(textInputs);
                                            }}
                                            value={numberPersonal[item.x] == null ? '' : numberPersonal[item.x]}
                                            placeholder="  enter new expenses"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                }
                            />
                            <View style={stylesBudget.viewButtonStyle}>
                                <TouchableOpacity style={stylesBudget.buttonSubmit} onPress={() => { submitAddPersonalBudget() }}>
                                    <Text style={stylesBudget.textButton}>submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={groupModalVisible}
                    onRequestClose={() => { setGroupModalVisible(!groupModalVisible) }}>
                    <View style={{ flex: 1, marginTop: 200, alignItems: 'center' }}>
                        <View style={stylesBudget.ModalListInsideView}>
                            <View style={stylesBudget.buttonsTopStyle}>
                                <Text style={styles.titleSub}>Add group expenses:</Text>
                                <TouchableOpacity style={stylesBudget.buttonClose} onPress={() => { setGroupModalVisible(!groupModalVisible) }}>
                                    <Icon name='close' style={stylesBudget.iconStyle} size={25} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={group}
                                renderItem={({ item }) =>
                                    <View style={stylesBudget.listModal}>
                                        <Text style={stylesBudget.textModal}>{item.x}</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={text => {
                                                let textInputs = numberGroup;
                                                textInputs[item.x] = text;
                                                console.log();
                                                onChangeGroupNumber(
                                                    textInputs);
                                            }}
                                            value={numberGroup[item.x] == null ? '' : numberGroup[item.x]}
                                            placeholder="  enter new expenses"
                                            keyboardType="numeric"
                                        />
                                    </View>
                                }
                            />
                            <View style={stylesBudget.viewButtonStyle}>
                                <TouchableOpacity style={stylesBudget.buttonSubmit} onPress={() => { submitAddGroupBudget() }}>
                                    <Text style={stylesBudget.textButton}>submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <View style={stylesBudget.buttonsTopStyle}>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={stylesBudget.buttonStyle} onPress={() => { setPersonalModalVisible(true) }}>
                            <Icon name='user' size={25} style={stylesBudget.iconStyle} />
                            <Text style={stylesBudget.textStyle}>me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesBudget.buttonStyle} onPress={() => { setGroupModalVisible(true) }}>
                            <Icon name='team' size={25} style={stylesBudget.iconStyle} />
                            <Text style={stylesBudget.textStyle}>team</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={stylesBudget.buttonStyle2} onPress={() => { setAddModalVisible(true) }}>
                        <Icon name='addusergroup' style={stylesBudget.iconStyle} size={25} />
                        <Text style={stylesBudget.textStyle} >add</Text>
                    </TouchableOpacity>

                </View>
                <View >
                    <View >
                        <BudgetPersonal data={personal} />
                    </View>
                    <View>
                        <BudgetGroup data={group} />
                    </View>
                </View>
            </Animatable.View>

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

export default BudgetScreen;