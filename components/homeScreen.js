import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { db } from '../config/config'; // Importando a configuração do Firebase
import { ref, onValue, remove } from 'firebase/database'; // Funções do Firebase

function HomeScreen() {
  const [itens, setItens] = React.useState([]);
  const navigation = useNavigation(); // Usando o hook de navegação
  

  React.useEffect(() => {
    const ItensRef = ref(db, '/contatos');

    onValue(ItensRef, (snapshot) => {
      let data = snapshot.val();
      console.log("Dados recebidos do Firebase:", data);  

      if (data) {
        // Usar Object.entries() para acessar as chaves corretas
        const itensComId = Object.entries(data).map(([key, value]) => ({
          id: key, // A chave única do Firebase
          ...value, // Dados do item
        }));

        setItens(itensComId.reverse()); // Reversão para mostrar o último contato primeiro
      } 
      else {
        setItens([]);
      }
    });
  }, []);


  const excluirContato = (id) => {
    const contatoRef = ref(db, `/contatos/${id}`);
    
    remove(contatoRef)
    .then(() => {
        setItens((prevItens) => prevItens.filter(item => item.id !== id));
        Alert.alert('Sucesso', 'Contato excluído com sucesso!');
    })
    .catch((error) => {
        Alert.alert('Erro', 'Não foi possível excluir o contato');
    });
  };


  return (
    <View style={styles.body}>
      <Text style={styles.title}>Agenda de Contatos</Text>

      <View style={styles.botao}>
        <Button title="Adicionar Contato" onPress={() => navigation.navigate('Adicionar')} />
      </View>

      <ScrollView style={styles.container}>
        {itens.length > 0 ? (
          itens.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.nome}</Text>
              <Text style={styles.subItemText}>Telefone: {item.telefone}</Text>
              <Text style={styles.subItemText}>Email: {item.email}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Editar', { contato: item })}>
                  <Text style={styles.buttonText}>Alterar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => excluirContato(item.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) 
        : 
        (
          <Text style={styles.emptyText}>Não há contatos salvos</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  botao: {
    margin: 20,
    width: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subItemText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;