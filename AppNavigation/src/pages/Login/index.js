import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Preencha todos os campos.');
            return;
        }

        try {
            const storedUser = JSON.parse(await AsyncStorage.getItem('user'));

            if (storedUser && storedUser.username === username && storedUser.password === password) {
                alert('Login realizado com sucesso!');
                navigation.navigate('Home');
            } else {
                alert('Usuário ou senha incorretos.');
            }
        } catch (error) {
            alert('Erro ao fazer login.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu Login ou registre-se.</Text>
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
            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Não possui cadastro? Registre-se aqui" onPress={() => navigation.navigate('Registrar')} color="blue" />
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
