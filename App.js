import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Alert,
  Pressable
} from 'react-native';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
import AsyncStorage from '@react-native-async-storage/async-storage';
// El State funciona principalmente cuando se realiza un cambio,
// React renderiza y actualiza los cambios


const App = () => {

  const [pacientes, setPacientes] = useState([])
  const [ modalVisible, setModalVisible] = useState( false )
  const [ values, setValues ] = useState ('')

  useEffect(() => {
    const obtenerCitasStorage = async () =>{
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
          if(citasStorage ) {
            setPacientes(JSON.parse(citasStorage)),
            console.log(citasStorage)
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCitasStorage();
  },[]);



  const [paciente, setPaciente] = useState({})

  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter( paciente => paciente.id === id)
    setPaciente( pacienteEditar[0] )
  }
  const pacienteEliminar = id => {

    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Una vez eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        { text: 'Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id )
            setPacientes(pacientesActualizados)
            guadarCitas(JSON.stringify(pacientesActualizados))
        }}
      ]
    )
}

  const cerrarModal = () => {
    setModalVisible(false)
  }

  const guadarCitas = async (citasJSON) =>{
      try {
        await AsyncStorage.setItem('citas', citasJSON)
        setValues(citasJSON)
      } catch (error) {
        console.log(error)
      }
  }




  return (
    <SafeAreaView style={ styles.container }>

      <Image 
      source={require('./assets/Iniciador.png')} 
      // style={{ width: 130, height: 130, resizeMode: 'contain'}}
      style={ styles.imagen }
      />

      <Text style={ styles.titulo }>Administrador de citas {''}
        <Text style={ styles.tituloBold }>Ezer</Text>
      </Text>
      <Pressable 
        onPress={ () => setModalVisible ( true ) } 
        style={ styles.boton }><Text style={ styles.textoBoton }> 
        Agendar Cita </Text>
      </Pressable>

      { pacientes.length === 0 ? 
        <Text style={ styles.noPacientes }> No hay citas registradas </Text> 
        : <FlatList 
            style={ styles.listado }
            data={ pacientes }// aqui esta preguntando que variables va a renderizar
            keyExtractor={ (item) => item.id}
            renderItem={ ({item}) => {
                return(
                  <Paciente 
                    item= { item }
                    setModalVisible ={ setModalVisible }
                    setPaciente={setPaciente}
                    pacienteEditar={pacienteEditar}
                    pacienteEliminar = { pacienteEliminar }
                    setModalPaciente = { setModalPaciente }
                  />
                )
              }
            }
      />}
      {/* se esta diciendo que si la longitud de "pacientes" es 0, ejecute lo primero, si no, lo segundo */}

      {modalVisible && (
          <Formulario 
            cerrarModal={cerrarModal}
              pacientes={pacientes}
              setPacientes={setPacientes}
              paciente={paciente}
              setPaciente={setPaciente}
              guadarCitas= {guadarCitas}
          />
      )}
      <Modal
      visible={modalPaciente}
      animationType='fade'
      >
        <InformacionPaciente 
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#BA7D7D',
    flex: 1,
  },
  containerModal:{
    backgroundColor: '#f2c2c2',
    flex: 1,
  },
  titulo:{
    marginTop: 0,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  tituloBold:{
    fontWeight: '900',
    color: '#FFFFFF',
  },
  boton:{
    marginTop: 40,
    backgroundColor:'#FFF3F3',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 22,
    // marginBottom: 10,
  },
  textoBoton:{
    color: '#BA7D7D',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 17,
  },
  imagen:{
    marginTop: 60,
    marginVertical: 20,
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  btn:{
    marginTop: 40,
    backgroundColor:'#BA7D7D',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 22,
  },
  closeBtn:{  
    marginTop: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalText:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    marginHorizontal: 10,
  },
  noPacientes:{
    fontSize: 25,
    textAlign: 'center',
    marginTop: 70,
    fontWeight: '600',
    color:'#e0b2af',
  },
  listado:{
    marginHorizontal: 35,
    marginTop: 30,
  }
})

export default App;
