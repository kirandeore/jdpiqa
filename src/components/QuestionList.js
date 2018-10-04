import React from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements'

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 15
    },
    cardTitle: {
        textAlign: 'left'
    },
    answer: {
        lineHeight: 25,
        fontSize: 20,
        textAlign: 'left',
        fontFamily: 'calibri'
    },
    noResultContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
  })

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props)
    }

    renderCard = ({ item, index }) => {
        return (
            <Card title={`Q${ index+1 }: ${ item.question }` }
                containerStyle={ styles.container }
                titleStyle={[ styles.cardTitle, typography.material.subhead ]}
                >
                    <Text
                        style={[ styles.answer, typography.material.thin ]}>
                            { _.replace(item.answer, /<br\/>/g, "\n") }
                    </Text>
            </Card>
        )
    }

    render() {
        const { questions } = this.props
        
        if (!questions) {
            return (
                <View style={ styles.noResultContainer }>
                    <ActivityIndicator size="large" />
                </View>
            )  
        }

        if (_.isEmpty(questions)) {
            return (
                <View style={ styles.noResultContainer }>
                    <Text style={ typography.human.title1 }>
                        No questions found
                    </Text>
                </View>
            )
        }

        return (
          <View>
            <FlatList
                data={ questions }
                keyExtractor={item => item.question}
                renderItem={ this.renderCard }
                />
          </View>
        )
    }
}