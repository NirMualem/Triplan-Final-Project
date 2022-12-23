import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { VictoryPie } from 'victory-native';
import { Context as BudgetContext } from '../../context/BudgetContext';
import { styles } from '../ComponentStyle';
const graphicColor = ['#388087', '#6fb3b8', '#badfe7', '#ccf6ef', '#b0f1e7', '#92ebdf', '#40e0d0']; // Colors
const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 0 }, { y: 0 }, { y: 100 }]; // Data used to make the animate prop work
const wantedGraphicData = [{ x: "food", y: 20 }, { x: "attraction", y: 30 }, { x: "test", y: 40 }, { x: "sss", y: 40 }, { x: "dd", y: 40 }]; // Data that we want to display


//function BudgetScreen() {
export const BudgetGroup = ({ data }) => {

    const [graphicData, setGraphicData] = useState(defaultGraphicData);
    const { state } = useContext(BudgetContext);
    //const [groupBudet,setGroupBudget] = useState(state.group);
    
    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
      //  console.log(groupBudet);
       
    }, []);


    const renderItem = ({ item }) => (
        <View> 
            <Text >{item.x}:{item.y} </Text>
        </View>
    )

    return (
        <View>
            <Text style={styles.titleSub}>Group Expenses</Text>
            <View style={styles.line}/>
            <VictoryPie
                data={data}
                width={200}
                height={200}
                labels={({ datum }) => (datum.y === 0 ? "" : datum.x+" "+(datum.y-1)+"$")}
                colorScale={graphicColor}
                innerRadius={30}
                style={{ labels: { fontSize: 8, fontWeight: "bold", padding: 5 }, parent: { overflow: "visible" } }}

            />
      <Text>{"\n"}</Text>
        </View>
    );
}

export default BudgetGroup;