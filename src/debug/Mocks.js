import React, { useState } from 'react';

export const useMockData = () => {
  const [usersMock, setUsersMock] = useState([
    {
      cpf: "user",
      username: "Vitor Augusto",
      password: "password",
      role: "string",
    },
    {
      cpf: "532993812740",
      username: "Carlos Dias",
      password: "SEnhaFOrte129*",
      role: "string",
    },
    {
      cpf: "9876543210",
      username: "Ana Maria",
      password: "Senha1234",
      role: "string",
    },
    {
      cpf: "1234567890",
      username: "Carlos Silva",
      password: "MinhaSenha123",
      role: "string",
    },
    {
      cpf: "0987654321",
      username: "Mariana Oliveira",
      password: "Mar123",
      role: "string",
    },
    {
      cpf: "5678901234",
      username: "Paulo Souza",
      password: "Senha123!",
      role: "string",
    },
  ]);

  const [groupsMock, setGroupsMock] = useState([
    {
      id: 1,
      name: "Rodizio de Pizza",
      description: "Noite do aniversário do Rafa",
      creator_id: "532993812740",
      status: "active",
      
      users: [
        {
          cpf: "532993812740",
          consumedItems: [{id: 0, quantity: 2}]
        },
        {
          cpf: "9876543210",
          consumedItems: [{id: 0, quantity: 2}]
        },
        {
          cpf: "1234567890",
          consumedItems: [{id: 0, quantity: 4}, {id: 1, quantity: 1}]
        },
      ],
      items: [
        {id: 0, name: "Pizza", totalQuantity: 8, price: 94},
        {id: 1, name: "Coca-Cola", totalQuantity: 1, price: 16}
      ]
    },
    {
      id: 2,
      name: "Churrasco",
      description: "Comemoração de fim de semestre",
      creator_id: "9876543210",
      status: "active",
      users: [
        {
          cpf: "9876543210",
          consumedItems: [{id: 0, quantity: 4}, {id: 1, quantity: 1}]
        },
        {
          cpf: "1234567890",
          consumedItems: [{id: 0, quantity: 3}]
        },
        {
          cpf: "0987654321",
          consumedItems: [{id: 0, quantity: 1}]
        },
      ],
      items: [
        {id: 0, name: "Carne", totalQuantity: 8, price: 72},
        {id: 1, name: "Coca-Cola", totalQuantity: 1, price: 16}
      ]
    },
    {
      id: 3,
      name: "Comemoração no Trabalho",
      description: "Resultados do faturamento",
      creator_id: "1234567890",
      status: "active",
      users: [
        {
          cpf: "532993812740",
          consumedItems: [{id: 0, quantity: 5}, {id: 1, quantity: 1}]
        },
        {
          cpf: "1234567890",
          consumedItems: [{id: 0, quantity: 25}]
        },
        {
          cpf: "5678901234",
          consumedItems: [{id: 0, quantity: 20}, {id: 1, quantity: 1}]
        },
      ],
      items: [
        {id: 0, name: "Caixa de salgados", totalQuantity: 50, price: 64},
        {id: 1, name: "Fanta laranja", totalQuantity: 2, price: 16}
      ]
    },
  ]);

  const findUserByCPF = (cpf) => {
    return usersMock.find(user => user.cpf === cpf);
  };

  const findUserByUsername = (username) => {
    return usersMock.find(user => user.username === username);
  };

  const createNewGroup = (name, description, creator_id, status, users, items) => {
    const newGroup = {
      id: groupsMock.length + 1,
      name,
      description,
      creator_id,
      status,
      users,
      items
    };
  
    setGroupsMock(prevGroups => [...prevGroups, newGroup]);
  };
  
  const getUsersInGroup = (groupId) => {
    const group = groupsMock.find(group => group.id === groupId);
    if (group) {
      let user = group.users.map(user => findUserByCPF(user.cpf));
      user.password = '';
      return user;
    }
    return [];
  };

  return { usersMock, groupsMock, findUserByCPF, findUserByUsername, createNewGroup, getUsersInGroup };
};
