import React, { useState, useEffect } from 'react'
import { Modal, Text,  SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'


const Formulario = ({
  modalVisible, 
  cerrarModal,
  pacientes, 
  setPacientes, 
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
  guadarCitas
  
}) =>{
  const [id, setId] = useState('')
  const [ paciente, setPaciente] = useState ('')
  const [ correo, setCorreo ] = useState ('')
  const [ telefono, setTelefono] = useState ('')
  const [ fecha, setFecha] = useState ( new Date() )
  const [ motivo, setMotivo] = useState ('')

  useEffect(() => {
    if(Object.keys(pacienteObj).length > 0 ) {
      setId(pacienteObj.id)
      setPaciente(pacienteObj.paciente)
      setCorreo(pacienteObj.correo)
      setTelefono(pacienteObj.telefono)
      setFecha(pacienteObj.fecha)
      setMotivo( pacienteObj.motivo )
    }
  }, [ pacienteObj ])

  const handleCita = () =>{ //Funcion que es llamada al presionar "Agendar Cita"
    if([ paciente, correo, telefono, fecha, motivo ].includes('')){//Si alguno de estos campos esta vacio se ejecuta "Alert"
      Alert.alert(
        'Campos Vacios',
        'Verifica que todos los campos esten completos',
        [{text: 'Aceptar'}]
      )
      return
    }

    const nuevoPaciente = {

      paciente,
      correo,
      telefono,
      fecha,
      motivo,
    }

 
    //Revisar si es un registro nuevo o edicion
    if(id) {
      // Editando
      nuevoPaciente.id = id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPacienteApp({})

  } else {
      // Nuevo Registro
      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
      guadarCitas(JSON.stringify(nuevoPaciente))
      // guadarCitas(JSON.stringify(nuevoPaciente))

  }

    setId()
    cerrarModal()
    setPaciente('')
    setCorreo('')
    setFecha(new Date())
    setTelefono('')
    setMotivo('')
  }

  return (
    <Modal 
        animationType = 'slide'
        visible = { modalVisible }
        >
          <SafeAreaView style = { styles.containerModal }>
            <ScrollView>
                <Pressable 
                  onPress={ () => {
                  setId()
                  setPacienteApp({})
                  cerrarModal()
                  setPaciente('')
                  setCorreo('')
                  setFecha(new Date())
                  setTelefono('')
                  setMotivo('')
                  }} >
                    <Image source={require('../../assets/Close.png')} style={ styles.closeBtn }/>
                </Pressable>

              
                
                <Text style={ styles.nuevaText }>{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
                  <Text style={ styles.citaText}>Cita</Text>
                </Text>


                <View style={ styles.campo }>
                  <Text style={ styles.label } >Nombre del Paciente</Text>
                  <TextInput 
                    style={ styles.input }
                    placeholder = 'Nombre del Paciente'
                    placeholderTextColor={'#bababa'}
                    value = { paciente }
                    onChangeText = { setPaciente }
                  />
                </View>

                <View style={ styles.campo }>
                  <Text style={ styles.label } >Correo</Text>
                  <TextInput 
                    style={ styles.input }
                    placeholder = 'Correo'
                    placeholderTextColor={'#bababa'}
                    keyboardType = 'email-address'
                    value = { correo }
                    onChangeText = { setCorreo }
                  />
                </View>

                <View style={ styles.campo }>
                  <Text style={ styles.label } >Teléfono</Text>
                  <TextInput 
                    style={ styles.input }
                    placeholder = 'Teléfono'
                    placeholderTextColor={'#bababa'}
                    keyboardType = 'phone-pad'
                    value = { telefono }
                    onChangeText = { setTelefono }
                    maxLength = { 12 }
                  />
                </View>

                <View style={ styles.campo }>
                  <Text style={ styles.label } >Fecha</Text>
                  <View style = { styles.dateCont}>
                    <DatePicker 
                      date={ fecha }
                      locale = 'es'
                      onDateChange={ (date) => setFecha(date) }
                      androidMode= 'default'

                    />
                  </View>
                </View>

                <View style={ styles.campo }>
                  <Text style={ styles.label } >Motivo</Text>
                  <TextInput 
                    style={ styles.inputMotivo }
                    placeholder = 'Motivo'
                    placeholderTextColor={'#bababa'}
                    value = { motivo }
                    onChangeText = { setMotivo }
                    multiline = { true }
                    // numberOfLines = { 4 }
                    keyboardType = 'twitter'
                  />
                </View>

                <Pressable
                  style={ styles.confirmarBtn }
                  onPress={ handleCita }     
                >
                  <Text style={ styles.textBtn }>{pacienteObj.id ? 'Editar' : 'Agendar'} Cita </Text>

                </Pressable>

                <Text style={ styles.derechoReservados }> Derechos Reservados </Text>
            </ScrollView>
          </SafeAreaView>
      </Modal>
  )
}
const styles = StyleSheet.create({
    containerModal:{
        backgroundColor: '#c99d9d',
        flex: 1,
      },
    
    closeBtn:{  
        marginTop: 20,
        marginRight: 20,
        alignSelf: 'flex-end',
        width: 20,
        height: 20,
        resizeMode: 'contain',
      },
      nuevaText:{
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 20,
        color: 'white',
        marginHorizontal: 10,
        fontWeight: '400',
      },
      citaText:{
        fontWeight: '800',
      },
      campo:{
        marginHorizontal: 35,
      },
      label:{
        marginLeft: 10,
        marginTop: 20,
        color:'#fff',
        fontSize: 20,
        fontWeight: '500'
      },
      input:{
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 20,
        color: 'grey',
      },
      inputMotivo:{
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 20,
        paddingBottom: 50,
        color: 'grey',
      },
      dateCont:{
        backgroundColor: '#fff',
        borderRadius: 20,
      },
      confirmarBtn:{
        marginTop: 40,
        backgroundColor:'#a16060',
        padding: 15,
        marginHorizontal: 30,
        borderRadius: 22,
      },
      textBtn:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
      },
      derechoReservados:{
        marginTop: 50,
        textAlign: 'center'
      }
})

export default Formulario