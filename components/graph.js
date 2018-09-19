import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View, Text, TouchableOpacity } from 'react-native'

class Graph extends React.PureComponent {
    state = {
        
    }

    render() {

        const data = [1, 1.3, 1.5, 1.6, .9, 1.5, 1.3, 1.6]

        const contentInset = { top: 20, bottom: 20 }

        return (
            <View>
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={8}
                    formatLabel={value => `${value}$`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={contentInset}>
                    <Grid />
                </LineChart>
                </View>
            <View 
            style={{flexDirection: 'row'}}>

                    <TouchableOpacity>
                        <Text>1 Week</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text>1 Month</Text>
                    </TouchableOpacity>

                     <TouchableOpacity>
                        <Text>6 Months</Text>
                    </TouchableOpacity>

                     <TouchableOpacity>
                        <Text>1 Year</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

export default Graph;