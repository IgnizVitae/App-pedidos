import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Image, ImageBackground, TouchableOpacity, SafeAreaView, AppRegistry } from 'react-native'
import TarefasDatabase from './src/Database/TarefasDatabase';
import Tarefas from './src/Models/Tarefas';
import TarefasComponent from './src/Components/TarefasComponente';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import { Button , TextInput, Text} from 'react-native-paper';



  
export default class App extends Component {



  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log("imagem salva no cash: " + data.uri);
      this.setState({ foto: data.uri })

    }
  };

  constructor(props) {
    super(props)
    this.state = {
      nomeTarefa: "",
      dataInicio: "",
      dataTermino: "",
      status: "",
      foto: "",
      lista: []
    }
    this.Listar()
  }

  Listar = () => {
    const banco = new TarefasDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }

  Cadastrar = (nomeTarefa, dataInicio, dataTermino, Status, foto) => {
    const tarefaNovo = new Tarefas(nomeTarefa, dataInicio, dataTermino, Status, foto);
    const banco = new TarefasDatabase();
    banco.Inserir(tarefaNovo)
    this.Listar()

  }

  Atualizar = (tarefa) => {
    const banco = new TarefasDatabase();
    banco.Atualizar(tarefa)
    this.Listar()
  }

  Remover = (id) => {
    const banco = new TarefasDatabase();
    banco.Remover(id)
    this.Listar()

  }
  



  render() {


    return (



      <ScrollView style={estilo.container}>
        <ImageBackground
          source={require('./src/Imagens/fundo.jpg')}
          style={estilo.img}>



          <View style={estilo.linha2}>

            <View style={estilo.logo}>

              <Image
                source={require('./src/Imagens/logo91.png')} style={{ width: 260, height: 120 }}//logotipo
                  
              />
              <Text> Tingimentos</Text>
            </View>

            




            <View style={estilo.container}>

              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={estilo.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                  console.log(barcodes);
                }}
              />
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <Button icon = "camera" mode="contained" onPress={this.takePicture.bind(this)} style={estilo.capture}>
                Foto
                </Button>

              </View>
                <View>
                
                </View>
               </View>







            {/* Cadastro de itens */}
            <View style={estilo.linha1}>



              <TextInput onChangeText={(valorDigitado) => { this.setState({ dataInicio: valorDigitado }) }} placeholder='Digite o nome do Item' style={estilo.entradasDeDados} />
              <TextInput onChangeText={(valorDigitado) => { this.setState({ dataTermino: valorDigitado }) }} placeholder='Digite a quantidade' style={estilo.entradasDeDados} />
              <TextInput onChangeText={(valorDigitado) => { this.setState({ status: valorDigitado }) }} placeholder='Digite o tipo de serviço' style={estilo.entradasDeDados} />
              <View style={estilo.areaBotao}>
                
                <Button icon = "send" mode="contained" style={estilo.botao} onPress={() => this.Cadastrar(this.state.nomeTarefa, this.state.dataInicio, this.state.dataTermino, this.state.status, this.state.foto)}>
                Salvar
                </Button>
              </View>
              
              
              
            </View>
            {/* Listagem de itens */}
            <ScrollView >
              <Text style={estilo.titulo}>LISTA DE PEDIDOS</Text>
              {
                this.state.lista.map(
                  tarefa => (
                    <TarefasComponent
                      key={tarefa.id}
                      tarefaNovo={tarefa.id}
                      tarefa={tarefa}
                      id={tarefa.id}
                      nomeTarefa={tarefa.nomeTarefa}
                      dataInicio={tarefa.dataInicio}
                      dataTermino={tarefa.dataTermino}
                      status={tarefa.status}
                      foto={tarefa.foto}
                      atualizar={this.Atualizar}
                      deletar={this.Remover}
                    />
                  )
                )
              }

            </ScrollView>

          </View>
        </ImageBackground>
      </ScrollView>


    )
  }
}

const estilo = StyleSheet.create({
  entradasDeDados: {
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 3,
    backgroundColor: '#f0c2ee', //cor do fundo do botão
    height: 35,
    width: 260,
    textAlign: 'center'

  },
  titulo: {
    fontSize: 18,
    margin: 5,
    fontWeight: 'bold',
    textAlign: 'center'

  },
  botao: {
    flex: 0,
    fontWeight: 'bold',
    backgroundColor: '#58d578',
    borderRadius: 20,
    padding: 2,
    paddingHorizontal: 5,
    alignSelf: 'center',
    margin: 5,

  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  linha1: {
    alignItems: 'center',
    justifyContent: 'center',


  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  linha2: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

  },

  container: {
    flex: 1
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',


  },
  img3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    resizeMode: 'cover',


  },
  preview: {
    flex: 1,
    height: 360,
    width: 260,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    fontWeight: 'bold',
    backgroundColor: '#586bd5',
    borderRadius: 20,
    padding: 7,
    paddingHorizontal: 10,
    alignSelf: 'center',
    margin: 10,
  },


})