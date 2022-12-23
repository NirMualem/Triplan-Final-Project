import { StyleSheet, Platform, } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 0.2,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
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
        fontSize: 27,
        marginLeft:4
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        margin:5
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flexDirection: 'row',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginHorizontal: 10

    },
    textInputdisable: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    errMsgStyle: {
        fontSize: 16,
        color: 'red',
        alignItems: 'flex-start'
    },
    ProfileImage:{ 
        width:100,
        justifyContent: "center",
        alignItems: "center"
    },
    imageModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageModalEdit: {
        position: 'absolute',
    },
    awesomeStyle: {
        marginBottom: 6,
    },
    profileHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    dateStyle: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        marginHorizontal: 10
    },
    startDateBtn: {
        width: '50%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
      dropdown: {
        height: 50,
        width:'80%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      containerDropdown:{
        backgroundColor: 'white',
        padding: 16,
        borderColor:'white'
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        width:200
      },
      placeholderStyle: {
        fontSize: 16,
        width: 300,
      },
      selectedTextStyle: {
        fontSize: 16,
        width: 300,
      },
      iconStyle: {
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      line:{
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        padding: 3,
      },
      titleSub:{
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop:10,
        paddingBottom:3
      },
      switch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      addAttrBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
      },
      loadingGif: {
        width: 100,
        height: 100,
      },
});

export { styles }