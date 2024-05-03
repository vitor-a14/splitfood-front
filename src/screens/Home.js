import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

//Componentes
import GroupItem from "../components/GroupItem";

//MOck
import { useMockData } from "../debug/Mocks";

export default function Home() {
  const navigation = useNavigation();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  //dados do usuário que vieram da tela de login
  //const userData = route.params.userData;

  //mocks
  const { usersMock, groupsMock } = useMockData();

  const userData = {
    cpf: "53299537297",
    username: "Rodrigo Goes",
    email: "orodrigogoes@gmail.com",
    password: "senhaFortissima948",
    role: "string",
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    /*try {
        const response = await fetch('http://localhost:8080/groups/');
        if (!response.ok) {
            throw new Error('Erro na respsota do servidor!');
        }
        const data = await response.json();
        setGroups(data);
        setLoading(false);
    } catch (error) {
        console.error("Erro ao buscar grupos: ", error);
        setLoading(false);
    }*/

    //mock simulando uma requisição bem sucedida do servidor
    setTimeout(() => {
      setGroups(groupsMock); 
      setLoading(false);
    }, 200); // Simula um delay de 200ms da requisição http
  };

  return (
    <View style={styles.homeContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>{userData.username}</Text>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {userData.username.toString().charAt(0)}
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : groups.length > 0 ? (
          <FlatList style={styles.groupList}
            data={groups}
            renderItem={({ item }) => (
              <GroupItem name={item.name} description={item.description} participants={item.users} items={item.items} allUsers={usersMock} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>
            Parece que você não ainda não faz parte de nenhum grupo
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.adButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 180,
  },
  groupList: {
    width: '70%'
  },
  emptyText: {
    width: "%40",
    fontSize: 18,
    textAlign: "center",
    color: "#ccc",
  },
  headerContent: {
    position: "absolute",
    top: "10%",
    backgroundColor: "#ccc",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
  },
  avatarContainer: {
    backgroundColor: "green",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    position: "absolute", 
    bottom: "5%",
    right: "5%", 
    backgroundColor: "red",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  adButtonText: {
    color: "white",
    fontSize: "bold",
    fontSize: 40,
  },
});
