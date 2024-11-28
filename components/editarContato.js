import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Alert } from 'react-native';
import { db } from '../config/config'; // Importando a configuração do Firebase
import { ref, update } from 'firebase/database'; // Funções do Firebase

function EditarContato({ route, navigation }) {
  const { contato } = route.params; // Recebendo os dados do contato

  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);
  const [email, setEmail] = useState(contato.email); 


  const atualizarContato = () => {
    const contatoRef = ref(db, `/contatos/${contato.id}`);

    // Verificando se algum campo está vazio
    if (!nome || !telefone || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return; 
    }
    
    update(contatoRef, {
      nome: nome,
      telefone: telefone,
      email: email, 
    })
    .then(() => {
        Alert.alert('Sucesso', 'Contato atualizado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior após atualização
    })
    .catch((error) => {
        Alert.alert('Erro', 'Não foi possível atualizar o contato');
    });
  };
  

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Editar Contato</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
        />
      </View>

      <Button title="Atualizar Contato" onPress={atualizarContato} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default EditarContato;