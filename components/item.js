import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

class Item extends React.Component {
  static propTypes = {
    itens: PropTypes.array.isRequired,
  };

  render() {
    return (
      <View style={styles.listaItens}>
        {this.props.itens.map(({ item }, index) => {
          return (
            <View key={index}>
              <Text style={styles.textItens}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listaItens: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3, // sombra para Android
    shadowColor: "#000", // sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10,
  },
  textItens: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    marginVertical: 5,
    fontWeight: "500",
  },
});

export default Item;
