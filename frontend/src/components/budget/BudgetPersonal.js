import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity,FlatList } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Context as BudgetContext } from '../../context/BudgetContext';
import { styles } from '../ComponentStyle';
const graphicColor = ['#388087', '#6fb3b8', '#badfe7', '#ccf6ef', '#b0f1e7', '#92ebdf', '#40e0d0']; // Colors
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work

//function BudgetScreen() {
export const BudgetPersonal = ({ data }) => {

    const [graphicData, setGraphicData] = useState(defaultGraphicData);
    const { state } = useContext(BudgetContext);
    //const [personalBudget,setPersonalBudget] = useState(state.group);

    useEffect(() => {
        setGraphicData(defaultGraphicData); // Setting the data that we want to display        
    }, []);

    const renderItem = ({ item }) => (
        <View> 
            <Text >{item.x}:{item.y} </Text>
        </View>
    )
        
    return (
        <View>
            <Text style={styles.titleSub}>Personal Expenses</Text>
            <View style={styles.line}/>
            <View  style ={{flexDirection:"row"}}>
                <VictoryPie
                data={data}
                width={200}
                height={200}
                labels={({ datum }) => (datum.y === 0 ? "" : datum.x+" "+(datum.y-1)+"$")}
                colorScale={graphicColor}
                innerRadius={30}
                style={{ labels: { fontSize: 8, fontWeight: "bold", padding: 5  }, parent: { overflow: "visible" } }}
            />
      </View>
        </View> 
    );
}

export default BudgetPersonal;