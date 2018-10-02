import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Card } from 'react-native-elements'

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderCard = ({ item, index }) => {
        return <Card title={`Q${index+1}: ${item.question}` }
            containerStyle={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 3,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 10,
                marginBottom: 15 }}
                titleStyle={[{ textAlign: 'left'}, global.material.subhead ]}
            >
            <Text style={[{ lineHeight: 25,
                fontSize: 20,
                textAlign: 'left',
                fontFamily: 'calibri'
                }, global.material.thin ]}>{ _.replace(item.answer, /<br\/>/g, "\n") }</Text>
        </Card>
    }

    render() {
        return (
          <View>
            <FlatList
                data={this.props.data}
                keyExtractor={item => item.question}
                renderItem={ this.renderCard }
                />
            </View>
        )
    }
}