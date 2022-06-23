import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.text}>Olá, usuário!</Text>
          <View style={styles.img}>
            <Image
              style={styles.stretch}
              source={require("../images/run.svg")}
            />
          </View>
        </View>

        <View style={styles.atividades}>
          <View>
            {" "}
            <Text style={styles.textatividades}>Atividades Recomendadas</Text>
          </View>
          <View style={styles.quadrado}>
            <Text style={styles.textcard}>
              Caminhar prelo menos 3 dias da semana.
            </Text>
          </View>
          <View style={styles.quadrado}>
            <Text style={styles.textcard}>
              Caminhar prelo menos 3 dias da semana.
            </Text>
          </View>
          <View style={styles.quadrado}>
            <Text style={styles.textcard}>
              Caminhar prelo menos 3 dias da semana.
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E2951",
    height: "100vh",
  },
  cabecalho: {
    alignItems: "center",
    textAlign: "center",
    paddingTop: 70,
  },

  atividades: {
    backgroundColor: "#2E2951",
    textAlign: "center",
    alignItems: "center",
    top: "30px",
    gap: "10px",
    fontSize: 25,
  },
  quadrado: {
    backgroundColor: "#00FBAB",
    width: "300px",
    height: "40px",
    alignItems: "center",
    borderRadius: "10px",
    gap: "20px",
  },
  text: {
    fontSize: 30,
    color: "white",
    fontFamily: "Poppins",
  },
  textatividades: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "Poppins",
  },
  textcard: {
    fontSize: 13,
    textAlign: "center",
    peddingTop: "20px",
    fontFamily: "Poppins",
    marginTop: "10px",
  },
  stretch: {
    width: "140px",
    height: "140px",
  },
  img: {
    paddingTop: 20,
  },

  ultima: {
    backgroundColor: " #2E2951",
  },
});

export default HomeScreen;
