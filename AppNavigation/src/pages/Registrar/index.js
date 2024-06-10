import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registrar({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setUsername('');
            setPassword('');
        });
    }, [navigation]);

    const handleRegister = async () => {
        if (!username || !password) {
            alert('Preencha todos os campos.');
            return;
        }

        const newUser = {
            username,
            password,
        };

        try {
            const usersJSON = await AsyncStorage.getItem('users');
            let users = [];
            if (usersJSON !== null) {
                users = JSON.parse(usersJSON);
            }
            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            alert('Usuário registrado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            alert('Erro ao registrar o usuário.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu Registro ou entre no seu login.</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome de usuário"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Registrar" onPress={handleRegister} />
            <Button title="Já possui cadastro? Faça seu login" onPress={() => navigation.navigate('Login')} color="blue" />
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
