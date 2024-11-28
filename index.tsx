import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/homeScreen';  // Tela inicial
import AdicionaContatos from './components/adicionaContatos';  // Tela para adicionar contatos
import EditarContato from './components/editarContato';  // Tela para editar contatos (ainda não implementada)

const Stack = createStackNavigator();

function App() {
  return (
    /*

      NÃO PRECIDA DO "<NavigationContainer>" POIS JA ESTÁ EM ALGUM LUGAR DESSA PÁGINA. 
      
      O ERRO QUE ESTAVA DANDO QUANDO UTILIZAVA "<NavigationContainer>": Looks like you have nested a 'NavigationContainer' insider 
      another. Normally you need only one container at the at the root of the app, so this was probally error.

    */

    // <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Adicionar" component={AdicionaContatos}/>
        <Stack.Screen name="Editar" component={EditarContato} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;