import React from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import { formatearFecha } from '../../helpers'

const Paciente = ({
  item, 
  setModalVisible, 
  setPaciente,
  pacienteEditar, 
  pacienteEliminar, 
  setModalPaciente
}) => {
  const { paciente, fecha, id } = item


  return (

    <Pressable
      onLongPress={ () =>{ 
        setModalPaciente(true) 
        setPaciente(item)
      }}
    >
        <View style={ styles.contenedor }>
          <Text style={ styles.label } > Paciente: </Text>
          <Text style={ styles.texto }> { paciente } </Text>
          <Text style={ styles.fecha }> { formatearFecha( fecha )} </Text>

          <View style={ styles.contDos}>
            <Pressable 
            style={[styles.botones, styles.botonEdit]}
            onLongPress={ () => {
              setModalVisible(true)
              pacienteEditar(id)
             }}
            >
              <Text style={styles.botonesTexto}> Editar </Text>
            </Pressable>

            <Pressable 
            style={[styles.botones, styles.botonEliminar]}
            onLongPress={ () => pacienteEliminar(id)}
            >
              <Text style={styles.botonesTexto}> Eliminar </Text>
            </Pressable>
          </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor:{
      backgroundColor: '#a16060',
      borderRadius: 20,
      padding:20,
      marginBottom:20
    },
    label:{
      color:'#fff',
      marginLeft:10,
      fontWeight:'500',
      // textTransform:'uppercase',
      marginBottom: 10,
    },
    texto:{
      color:'#fff',
      marginLeft:25,
      marginBottom: 10,
      fontWeight: 'bold',
      fontSize: 24,
    },
    fecha:{
      color:'#fff',
      marginLeft:10,
    },
    contDos:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop: 15,
    },
    botones:{
      paddingVertical: 5,
      borderRadius: 5,
      paddingHorizontal: 15,
    },
    botonEdit:{
      backgroundColor: '#db9d00',
    },
    botonEliminar:{
      backgroundColor: 'red',
    },
    botonesTexto:{
      fontWeight:'700',
      color:'#fff'
    }
})

export default Paciente