import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react"
import { SafeAreaView, StyleSheet, TextInput, Text, FlatList, StatusBar, Dimensions, View, Platform, Image, Pressable } from "react-native";

export default function CreateGroup() {

    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const {name,setName}=  useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

  //dados do usuário logado
  const route = useRoute();
  const userData = route.params.userData;

    // Somente para testes - trocar os ids e nomes pelos respectivos métodos que chamam do db
    const userList = [
        {id: 1, name: "Mônica Kiyota"},
        {id: 2, name: "Vitor Augusto"},
        {id: 3, name: "Eduardo Bismara"},
        {id: 4, name: "Igor Costa"},
        {id: 5, name: "Vitor Bueno"},
        {id: 6, name: "Emerson Lino"},
        {id: 7, name: "Noah Kiyota"},
        {id: 8, name: "Anthony Kiyota"},
    ];
    
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = userList.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredUsers(filtered);
    };

    const handleSelectUser = (user) => {
        setSearchText('');
        setFilteredUsers([]);
        setSelectedUsers(prevUsers => [...prevUsers, user]);
        console.log("Usuário selecionado:", user); //Teste para ver se selecionou 
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
            <View style={styles.containerHeader}>
                <Text style={styles.textHeader}>Criar Grupo</Text>
                <Pressable onPress={() => navigation.navigate('Home', { userData: userData })}>
                    <Image style={styles.headerIcon} source={require('../../assets/closeIcon.png')}/>
                </Pressable>
            </View>

            <View style={styles.searchBarWrapper}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Procurar por usuário"
                    placeholderTextColor="grey"
                    onChangeText={handleSearch}
                    value={searchText}>
                </TextInput>
                {/* <Image style={styles.searchIcon} source={require('../../assets/searchIcon.png')}/> */}
            </View>
            <FlatList style={styles.nameList}
                data={filteredUsers}
                renderItem={({ item }) => <Text onPress={() => handleSelectUser(item)}>{item.name}</Text>}
                keyExtractor={item => item.id.toString()}
            />

            <View style={styles.containerGrupo}>
                <Text style={styles.labelName}>Nome do grupo</Text>
                <TextInput value={name} style={styles.inputName} placeholder="Digite o nome aqui" autoCorrect={false} onChangeText={setName}/>
                <Text style={styles.textIntegrantes}>Integrantes</Text>
                <View style={styles.groupUsers}>
                    <Image style={styles.userIcon} source={require('../../assets/icone_userGrupo.png')}/>
                    <Text style={styles.textGroup}>Usuário Logado</Text>
                </View>
                {selectedUsers.map((user, index) => (
                <View style={styles.groupUsers} key={index}>
                    <Image style={styles.userIcon} source={require('../../assets/icone_userGrupo.png')}/>
                    <Text style={styles.textGroup}>{user.name}</Text>
                    <Image style={styles.deleteIcon} source={require('../../assets/trash-delete.png')}/>
                </View>))}
                <Pressable style={styles.finishButton}>
                    <Image style={styles.finishButtonIcon} source={require('../../assets/finish.png')}/>
                    <Text style={styles.textFinishButton}>Criar Grupo</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex:1
    },

    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#999999'
    },

    textHeader: {
        fontSize: 30,
        color: '#990000',
        fontWeight: 'bold'
    },

    headerIcon:{
        height: 40,
        width: 40
    },

    searchBar: {
        backgroundColor: '#C0B7B7',
        width: width * 0.80,
        height: height * 0.05,
        marginTop: height * 0.05,
        alignSelf: 'center',
        borderRadius: 50,
        textAlign:'center',
    },

    searchBarWrapper: {
        width: width * 0.80,
        alignSelf: 'center',
        ...Platform.select({
            ios:{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
            },
            android:{
                elevation: 5,
            },
        }),
    },

    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        position: 'absolute'
    },

    nameList: {
        width: width * 0.80,
        alignSelf: 'center',
    },

    containerGrupo: {
        height: height * 0.75,
        marginHorizontal: '10%',
    },

    labelName:{
        fontSize: 20,
    },

    inputName: {
        borderBottomWidth: 1,
        borderColor: '#990000',
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },

    textIntegrantes: {
        marginTop: '10%',
        fontSize: 20,
    },

    groupUsers: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 15,
        marginTop: '5%'
    },

    userIcon: {
        width: 30,
        height: 30,
    },

    deleteIcon: {
        width: 20,
        height: 20,
    },

    textGroup: {
        fontSize: 16,
        alignSelf: 'center'
    },

    finishButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 5,
        marginVertical: '5%'
    },

    finishButtonIcon: {
        width: 40,
        height: 40
    },

    textFinishButton: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
})