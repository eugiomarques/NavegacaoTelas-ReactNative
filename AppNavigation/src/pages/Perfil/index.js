import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const getUsername = async () => {
            const storedUsername = await AsyncStorage.getItem('currentUser');
            setUsername(storedUsername);
        };

        getUsername();
    }, []);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword) {
            alert('Por favor, insira a senha antiga e a nova senha.');
            return;
        }

        try {
            const usersJSON = await AsyncStorage.getItem('users');
            let users = [];
            if (usersJSON !== null) {
                users = JSON.parse(usersJSON);
            }
            const storedUser = users.find(user => user.username === username);

            if (storedUser && storedUser.password === oldPassword) {
                storedUser.password = newPassword;
                await AsyncStorage.setItem('users', JSON.stringify(users));
                alert('Senha alterada com sucesso!');
            } else {
                alert('Senha antiga incorreta.');
            }
        } catch (error) {
            alert('Erro ao alterar a senha.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <Text>Nome de usuário: {username}</Text>
            <TextInput
                style={styles.input}
                placeholder="Senha antiga"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Nova senha"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <Button title="Alterar senha" onPress={handleChangePassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
    },
});
