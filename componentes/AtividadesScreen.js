import "react-native-gesture-handler";
import React from "react";
import { useState, useEffect} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useHover, useFocus, useActive } from "react-native-web-hooks";
import { openDatabase } from "expo-sqlite";

const Stack = createStackNavigator();

export const db = openDatabase({
  name: "bancoDeDados",
});

const AtividadesScreen = () => {
  const [atividade, setAtividade] = useState({
    nome: "",
    descricao: "",
    esforco: "",
    data: "",
  });

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

  const addAtividade = () => {
    if (!atividade) {
      alert("Entre com a atividade");
      return false;
    }

    db.transaction((txn) => {
      txn.executeSql(
        "INSERT INTO atividades (nome,descricao, esforco, data) VALUES (?,?,?,?)",
        [
          atividade.nome,
          atividade.descricao,
          atividade.esforco,
          atividade.data,
        ],
        (sqlTxn, res) => {
          console.log(`${atividade} atividade adicionada com sucesso`);
          getAtividades();
          setAtividade({
            nome: "",
            descricao: "",
            esforco: 0,
            data: "",
          });
        },

        (error) => {
          console.log("Atividade:" + atividade);
          console.log("erro na inserção da atividade" + error.message);
        }
      );
      console.log(atividade);
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
          <View  style={styles.flex}>
          <Text style={styles.esforco}>{item.esforco}&#128293;</Text>
          <Text style={styles.data}>&#128197; {item.data}</Text>
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
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <Text style={styles.title}>Nova Atividade</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          placeholder="Nome da Atividade"
          style={styles.input}
          value={atividade.nome}
          placeholderTextColor={"#595192"}
          id="nome"
          onChangeText={(novoNome) =>
            setAtividade({ ...atividade, nome: novoNome })
          }
        />

        <Text style={styles.label}>Descriçao</Text>
        <TextInput
          placeholder="Descriçao da Atividade"
          style={styles.input}
          value={atividade.descricao}
          placeholderTextColor={"#595192"}
          id="descricao"
          onChangeText={(novaDescricao) =>
            setAtividade({ ...atividade, descricao: novaDescricao })
          }
        />

        <View style={styles.esforcodata}>
          <Text style={styles.label}>Esforço</Text>
          <TextInput
            placeholder="Esforço"
            value={atividade.esforco}
            style={styles.input}
            placeholderTextColor={"#595192"}
            id="esforco"
            onChangeText={(novoEsforco) =>
              setAtividade({ ...atividade, esforco: novoEsforco })
            }
          />

          <Text style={styles.label}>Data</Text>
          <TextInput
            placeholder="Data"
            style={styles.input}
            value={atividade.data}
            placeholderTextColor={"#595192"}
            id="data"
            onChangeText={(novaData) =>
              setAtividade({ ...atividade, data: novaData })
            }
          />
        </View>

        {/* <Button title="Cadastrar Atividade" onPress={addAtividade}/> */}
        <Pressable style={styles.button} onPress={addAtividade}>
          <Text style={styles.buttonText}>Cadastrar Atividade</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Minhas Atividades</Text>
      
      <FlatList
        data={atividades}
        renderItem={CardAtividade}
        style={styles.flatList}
        key={(cat) => cat.id}
      />
    </View></ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll:{
    minHeight: '100%'

  },
  container: {
    backgroundColor: "#2E2951",
    display: "flex",
    minHeight: '118%',
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "800",
    fontSize: "1.5rem",
  },
  form: {
    marginTop: "5px",
    width: "90%",
  },
  label: {
    color: "white",
    fontFamily: "Poppins",
    marginLeft: "10px",
    fontSize: "1rem",
  },
  input: {
    background: "transparent",
    borderColor: "#00FBAB",
    borderWidth: "1.8px",
    borderRadius: "20px",
    paddingLeft: "5px",
    fontFamily: "Poppins",
    color: "white",
  },
  esforcodata: {
    display: "flex",
  },
  button: {
    backgroundColor: "#00FBAB",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5px",
    marginTop: "10px",
  },
  buttonText: {
    color: "#2E2951",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  flatList: {
    width: "90%",
  },
  cardDiv: {
    backgroundColor: "#00FBAB",
    display: "flex",
    flexDirection: "row",
    borderRadius: "10px",
    marginBottom: '5px'
  },
  cardId: {
    width: "20%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardConteudo: {
    width: "70%",
    height: "100%",
    paddingVertical: '5px',
    borderLeftColor: '#2E2951',
  },
  cardButton: {
    width: "10%",
    height: "100%",
    backgroundColor: '#129269',
    borderRadius: '10px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '0px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardButtonText:{
color: 'white',
fontFamily: 'Poppins',
fontWeight: '600'


  },
  flex:{
display: 'flex',
flexDirection: 'row',
columnGap: '10px'
  },
  nome:{
color: '#2E2951',
fontSize: '1rem',
fontFamily: 'Poppins',
fontWeight: '700'

  },
  data:{

    color: '#2E2951',
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    fontWeight: '600'

  },
  esforco:{

    color: '#2E2951',
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    fontWeight: '600'

  },
  descricao:{

    color: '#2E2951',
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    fontWeight: '500'

  },
  id:{
    color: '#2E2951',
    fontFamily: 'Poppins',
    fontWeight: '500'


  }
});
export default AtividadesScreen;
