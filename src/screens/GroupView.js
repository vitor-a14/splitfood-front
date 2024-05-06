import React, { useState, useEffect } from "react";
import { useNavigation, useRoute  } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image
} from "react-native";

import backIcon from '../../assets/gobackIcon.png';

//Mock
import { useMockData } from "../debug/Mocks";

export default function GroupView() {
    //dados do grupo que vieram da tela principal
    const navigation = useNavigation();
    const route = useRoute();
    const [group, setGroup] = useState(route.params.groupData);

    //mock
    const { groupsMock, findUserByCPF } = useMockData();
    //const [group, setGroup] = useState(groupsMock[1]);

    const getConsumedItemData = (itemId) => {
        const consumedItem = group.items.find(item => item.id === itemId);
        return consumedItem ? consumedItem : null;
    };
    
    const getTotalConsumed = (userId) => {
        const user = group.users.find(user => user.cpf === userId);
        let totalValue = 0;
        user.consumedItems.forEach(item => {
            totalValue += (getConsumedItemData(item.id).price / getConsumedItemData(item.id).totalQuantity) * item.quantity;
        });
    
        return totalValue.toFixed(2);
    };
    
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image source={backIcon} style={styles.backButtonImage} />
            </Pressable>

            <Text style={styles.groupName}>{group.name}</Text>
            <View style={styles.line}></View>

            <View style={styles.allUsersContainer}>
                <Text style={styles.subtitle}>Participantes</Text>
                {group.users.map((user, index) => ( 
                    <View key={index} style={styles.userContainer}>
                        <Text style={styles.username}>{findUserByCPF(user.cpf).username}</Text>
                        {user.consumedItems.map((consumedItem, idx) => (
                            <View key={idx} style={styles.itemContainer}>
                                <Text style={styles.itemName}>{getConsumedItemData(consumedItem.id).name}: {consumedItem.quantity}</Text>
                                <Text style={styles.itemPrice}>R$ {((getConsumedItemData(consumedItem.id).price / getConsumedItemData(consumedItem.id).totalQuantity) * consumedItem.quantity).toFixed(2)}</Text>
                            </View>
                        ))}
                        <Text style={styles.totalItems}>Total: R$ {getTotalConsumed(user.cpf)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.line}></View>
            <View style={styles.allItemsContainer}>
                <Text style={styles.subtitle}>Pedidos</Text>
                {group.items.map((product, index) => ( 
                    <View key={index} style={styles.productContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text>Quantidade: {product.totalQuantity}</Text>
                        <Text>R$ {product.price.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    line: {
        width: '60%',
        height: 1,
        backgroundColor: '#888',
        marginBottom: 20,
        marginTop: 20,
    },
    allUsersContainer: {
        width: '60%',
    },
    allItemsContainer: {
        width: '60%',
    },
    groupName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
    subtitle: {
        color: '#888',
        marginBottom: 10,
    },
    userContainer: {
        marginBottom: 20,
        padding: 5,
        borderColor: "red", 
        borderWidth: 1, 
        borderRadius: 10, 
        marginBottom: 10,
        position: "relative",
    },
    username: {
        fontWeight: 'bold',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 14,
    },
    itemName: {
        flex: 1,
        marginRight: 10,
    },
    itemPrice: {
        fontWeight: 'bold',
    },
    totalItems: {
        marginTop: 15,
        alignSelf: 'flex-end',
    },
    productContainer: {
        marginBottom: 10,
        padding: 5,
        borderColor: "red", 
        borderWidth: 1, 
        borderRadius: 10, 
        marginBottom: 10,
        position: "relative",
    },
    productName: {
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 25,
        left: 25,
        padding: 10,
        zIndex: 1,
    },
        backButtonImage: {
        ima: "red",
        resizeMode: "contain",
        width: 25,
        height: 25,
    }
});
