import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcryptjs'; 

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
        console.log('bcrypt:', bcrypt);

        // Gere um salt e crie um hash da senha
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = {
            username,
            password: hashedPassword, // Armazene a senha como um hash
        };

        try {
            const usersJSON = await AsyncStorage.getItem('users');
            let users = [];
            if (usersJSON !== null) {
                users = JSON.parse(usersJSON);
            }
            // Verifique se o nome de usuário já existe
            if (users.some(user => user.username === username)) {
                alert('Nome de usuário já existe.');
                return;
            }
            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            alert('Usuário registrado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            alert('Erro ao registrar o usuário.');
        }
    };

     // Função para comparar a senha fornecida com a senha criptografada armazenada
     const comparePassword = async (inputPassword, storedHash) => {
        return bcrypt.compareSync(inputPassword, storedHash);
    };

    // Você pode usar a função comparePassword onde for necessário no seu código
    // Por exemplo, durante o processo de login

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Faça seu Registro</Text>
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
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText, styles.loginButtonText]}>Já possui cadastro? Faça seu login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 15,
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#28a745', // Alterado para verde
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#6c757d',
    },
    loginButtonText: {
        color: '#fff',
    },
});