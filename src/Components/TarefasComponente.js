import React, { Component } from 'react'
import { View,StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button , TextInput, Text} from 'react-native-paper';
export default class TarefasComponente extends Component {

    getEstilo() {
        if (this.props.dataInicio > this.props.dataTermino) {
            return { color: 'green' }
        } else {
            return { color: 'red' }
        }

    }

    render() {
        return (
            <View style={{ margin: 5, flex:1, backgroundColor: 'pink', alignItems:'center',borderRadius:5}}>

                <Text>Nome do item: {this.props.dataInicio}</Text>
                <Text>Quantidade: {this.props.dataTermino}</Text>
                <Text style={this.getEstilo()}>Tipo de Serviço: {this.props.status}</Text>
                <Image
                    style={{ width: 160, height: 120 }}
                    source={{ uri: this.props.foto }}
                />

                <View>
                    
                    <Button icon = "delete-sweep" mode="contained" style={estilo.botao2} onPress={() => this.props.deletar(this.props.id)}>
                Remover
                </Button>
                </View>
            </View>
        )
    }
}


const estilo = StyleSheet.create({
    entradasDeDados: {
        borderRadius: 15,
        borderColor: 'grey',
        borderWidth: 1,
        margin: 3,
        backgroundColor: '#f0c2ee',
        height: 35,
        width: 260,
        textAlign: 'center'

    },



    botao: {
        width: 80,
        backgroundColor: '#a14bdb',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 55,
        padding: 5,
        elevation: 5,
        fontWeight: 'bold',
        magin: 5
    },
    botao2: {
        flex: 0,
        fontWeight: 'bold',
        backgroundColor: '#d55858',
        borderRadius: 20,
        padding: 2,
        paddingHorizontal: 5,
        alignSelf: 'center',
        margin: 5,
    },
    areaBotao: {
        flex: 0,
        fontWeight: 'bold',
        backgroundColor: '#a14bdb',
        borderRadius: 20,
        padding: 7,
        paddingHorizontal: 10,
        alignSelf: 'center',
        margin: 10,
    },
    container: {
        flex: 1,

    }

})