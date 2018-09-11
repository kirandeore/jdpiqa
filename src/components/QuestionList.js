import React from 'react'
import { Text, FlatList } from 'react-native'
import { Card } from 'react-native-elements'

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props)
        // console.log('global._', global._)
    }

    render() {
        return (
          <FlatList
            data={this.props.data}
            keyExtractor={item => item.question}
            renderItem={({item, index}) => 
                <Card title={`Q${index+1}: ${item.question}` }
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
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10 }}
                        titleStyle={{ textAlign: 'left' }}
                    >
                    <Text style={{ lineHeight: 25, fontSize: 17, textAlign: 'left' }}>{ item.answer }</Text>
                </Card>
            }
            />
        )
    }
}