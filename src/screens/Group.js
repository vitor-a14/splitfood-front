import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
//Componentes
import GroupItem from "../components/GroupItem";
//MOck
import { useMockData } from "../debug/Mocks";

export default function Group() {
  const userData = {
    cpf: "53299537297",
    username: "Rodrigo Goes",
    email: "orodrigogoes@gmail.com",
    password: "senhaFortissima948",
    role: "string",
  };
  const { usersMock, groupsMock } = useMockData();
  useEffect(() => {
    fetchGroups();
  }, []);
  const fetchGroups = async () => {
    setTimeout(() => {
      setGroups(groupsMock); 
      setLoading(false);
    }, 200);
  };
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>Meus Grupos</Text>
        </View>

        <View style={styles.userContainer}>
          <Image style={styles.userIcon} source={require('../../assets/icone_userGrupo.png')}/>
          <Text style={styles.userName}>{userData.username}</Text>
        </View>

        <View style={styles.containerCards}>
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
            Parece que você não ainda não faz parte de nenhum grupo !
          </Text>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#999999'
  },

  textHeader: {
    fontSize: 25,
    color: '#990000',
    fontWeight: 'bold'
  },

  userContainer: {
    marginTop: height * 0.05,
    borderBottomWidth: 1,
    marginLeft: width * 0.05,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: width * 0.05,
  },

  userIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    marginRight: 10
  },

  userName: {
    fontSize: 20
  },

  containerCards: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.10
  },
})