import React from 'react'
import{ Text, SafeAreaView, View, Pressable, StyleSheet, Image } from 'react-native'
import { formatearFecha } from '../../helpers'


const InformacionPaciente = ({paciente, setPaciente, setModalPaciente}) => {

  return (
    <SafeAreaView
      style={ styles.contenedor }
    >
      <View>
        <Pressable
          onPress={()=> {
            setModalPaciente (false)
            setPaciente({})
          }}
          style={ styles.cerrar }
        >
          <Image source={require('../../assets/Close.png')} style={ styles.closeBtn }/>
        </Pressable>
      </View>
       <Text style={ styles.titulo }>Informacion del {''} 
           <Text style={ styles.tituloBold }>Paciente</Text>
       </Text>
       <View
        style={ styles.contenido }
       >
         <View style={ styles.campo }>
           <Text style={ styles.dato }> Nombre:</Text>
           <Text style={ styles.conTexto}>{paciente.paciente}</Text>
         </View>

         <View style={ styles.campo }>
           <Text style={ styles.dato }> Correo:</Text>
           <Text style={ styles.correo}>{paciente.correo}</Text>
         </View>

         <View style={ styles.campo }>
           <Text style={ styles.dato }> Teléfono:</Text>
           <Text style={ styles.conTexto}>{paciente.telefono}</Text>
         </View>

         <View style={ styles.campo }>
           <Text style={ styles.dato }> Fecha:</Text>
           <Text style={ styles.conTexto }>{formatearFecha(paciente.fecha)}</Text>
         </View>

         <View style={ styles.campo }>
           <Text style={ styles.dato }> Motivo:</Text>
           <Text style={ styles.conTexto}>{paciente.motivo}</Text>
        </View>

       </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#c99d9d',
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
  titulo:{
    marginTop: 45,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
    marginHorizontal: 10,
    fontWeight: '400',
  },
  tituloBold:{
    fontWeight: '800',
  },
  contenido:{
    backgroundColor:'#ffeded',
    alignContent:'center',
    marginHorizontal: 30,
    borderRadius: 10,
    padding:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }, 
  conTexto:{
    color:'#a1a1a1',
    fontSize:20,
    fontWeight:'500',
    marginLeft:15
  },
  correo:{
    color:'#a1a1a1',
    fontSize:15,
    fontWeight:'500',
    marginLeft:15
  },
  dato:{
    color:'#a1a1a1',
    fontSize:13,
    fontWeight:'200'
  },
  campo:{
    marginBottom:10,
  }


})

export default InformacionPaciente