import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Alert } from "react-native";

import { push, ref } from 'firebase/database'; // Funções do Firebase
import { db } from '../config/config'; // Importando a configuração do Firebase

const AdicionaContatos = ({ navigation }) => {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');


  const salvaContato = () => {
    const contatosRef = ref(db, '/contatos');

    // Verificando se algum campo está vazio
    if (!nome || !telefone || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return; 
    }

    // Salvando nome, telefone e email no banco de dados
    push(contatosRef, {
      nome: nome,
      telefone: telefone,
      email: email,
    })
    .then(() => {
      Alert.alert('Contato salvo com sucesso!');

      setNome(''); // Limpar os campos após salvar
      setTelefone('');
      setEmail('');
      
      navigation.goBack(); // Volta para a tela anterior após salvar
    })
    .catch((error) => {
      Alert.alert("Erro ao salvar contato! ", error.message);
    });
  };
  

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Adicionar Contato</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          placeholderTextColor="#999"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableHighlight
        style={styles.btn}
        underlayColor={"#0056b3"}
        onPress={salvaContato}
      >
        <Text style={styles.btnText}>Adicionar Contato</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdicionaContatos;