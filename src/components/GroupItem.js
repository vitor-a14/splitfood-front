import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute  } from '@react-navigation/native';

export default function GroupItem({ name, description, participants, items, allUsers, groupData }) {
  const navigation = useNavigation();

  // Function to get username from user ID
  const getUsername = (userId) => {
    const user = allUsers.find((user) => user.cpf === userId);
    return user ? user.username : "Usuário desconhecido";
  };

  // Function to calculate total value consumed by user
  const getTotalValueConsumed = (user) => {
    let totalValue = 0;
    user.consumedItems.forEach((consumedItem) => {
      const itemData = items.find((i) => i.id === consumedItem.id);
      totalValue += itemData ? ((itemData.price / itemData.totalQuantity) * consumedItem.quantity) : 0;
    });
    return totalValue;
  };

  // Function to calculate total value consumed by all participants
  const getTotalGroupValue = () => {
    let totalGroupValue = 0;
    participants.forEach((user) => {
      totalGroupValue += getTotalValueConsumed(user);
    });
    return totalGroupValue.toFixed(2);
  };

  return (
    <TouchableOpacity style={styles.groupItem} onPress={() => {navigation.navigate('GroupView', { groupData: groupData })}}>
      <View style={styles.topRight}>
        <Text style={styles.totalGroupValue}>R$ {getTotalGroupValue()}</Text>
      </View>
      <Text style={styles.groupName}>{name}</Text>
      <Text style={styles.groupDescription}>{description}</Text>
      <View style={styles.usersContainer}>
        {participants.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.user}>
              {getUsername(user.cpf)}
            </Text>
            <Text style={styles.totalValue}>
              R$ {getTotalValueConsumed(user).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  groupItem: {
    padding: 20,
    borderColor: "red", 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 10,
    position: "relative",
  },
  topRight: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  totalGroupValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 15,
    marginTop: 12, 
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupDescription: {
    fontSize: 16,
    color: "#333",
  },
  usersContainer: {
    marginTop: 10,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  user: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
});
