import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { db } from "./AtividadesScreen";
import { useState, useEffect } from "react";

export default function Profile() {
  const [atividades, setAtividades] = useState([]);

  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS atividades (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, descricao TEXT, esforco REAL, data DATETIME)",
        [],
        (sqlTxn, res) => {
          console.log("tabela criada com sucesso");
        }
      ),
        (error) => {
          console.log("erro ao criar a tabela" + error.message);
        };
    });
  };

  const getAtividades = () => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT * FROM atividades ORDER BY id DESC",
        [],
        (sqlTxn, res) => {
          console.log("atividades carregadas com sucesso");

          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                nome: item.nome,
                descricao: item.descricao,
                esforco: item.esforco,
                data: item.data,
              });
            }

            setAtividades(results);
          }
        },

        (error) => {
          console.log("erro ao buscar as atividades" + error.message);
        }
      );
    });
  };

  function CardAtividade({ item }) {
    console.log(item.id);
    const deleteAtividade = () => {
      db.transaction((txn) => {
        txn.executeSql(
          "DELETE FROM atividades WHERE id = ?",
          [item.id],
          (sqlTxn, res) => {
            console.log("atividade deletada com sucesso");
            setAtividades([]);
            getAtividades();
          },

          (error) => {
            console.log("erro ao deletar as atividades" + error.message);
          }
        );
      });
    };

    return (
      <View style={styles.cardDiv}>
        <View style={styles.cardId}>
          <Text style={styles.id}>{item.id}</Text>
        </View>
        <View style={styles.cardConteudo}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <View style={styles.flex}>
            <Text style={styles.esforco}>{item.esforco}&#128293;</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        </View>
        {/* <Button color="red" title="Deletar" onPress={deleteAtividade} /> */}
        <Pressable style={styles.cardButton} onPress={deleteAtividade}>
          <Text style={styles.cardButtonText}>🗑</Text>
        </Pressable>
      </View>
    );
  }

  useEffect(async () => {
    await createTables();
    await getAtividades();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Image style={styles.img} source={require("../images/exercicio.svg")} />
        <Text style={styles.nome}>Nome de usuário</Text>
        <Text style={styles.user}>@username</Text>

        <View style={styles.card}>
          <View style={styles.texto}>
            <Text style={styles.numero}>Numero de Atividades: </Text>
          </View>
          <View>
            <Text style={styles.contar}>{atividades.length}</Text>
          </View>
          <View style={styles.texto}>
            <Text style={styles.numero}>Maior streak:</Text>
          </View>
          <View>
            <Text style={styles.contar}>0</Text>
          </View>
          <View style={styles.texto}>
            <Text style={styles.numero}>Recorde de atividades:</Text>
          </View>
          <View>
            <Text style={styles.contar}>0</Text>
          </View>
        </View>
      </View>
    </View>
  );
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
  img: {
    width: "100px",
    height: "100px",
  },
  nome: {
    fontSize: 25,
    color: "#00FBAB",
    fontFamily: "Poppins",
  },
  user: {
    fontSize: 20,
    color: "#00FBAB",
    fontFamily: "Poppins",
  },
  card: {
    backgroundColor: "#1B1537",
    borderRadius: "20px",
    width: "90%",
    minHeight: "250px",
    display: "flex",
    marginTop: "20px",
  },
  numero: {
    color: "white",
    fontFamily: "Poppins",
    fontSize: "20px",
  },
  contar: {
    color: "#00FBAB",
    peddingLeft: "0px",
  
    fontSize: "30px",
    width: "100%",
  },
  texto: {
    paddingTop: "20px",
  },
});
