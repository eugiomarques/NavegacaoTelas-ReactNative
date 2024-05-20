import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
    const [matricula, setMatricula] = React.useState('');
    const [senha, setSenha] = React.useState('');

    const handleMatriculaChange = (matricula) => {
        setMatricula(matricula);
    };

    const handleSenhaChange = (senha) => {
        setSenha(senha);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça seu Login ou registre-se.</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite sua matrícula'
                value={matricula}
                onChangeText={handleMatriculaChange}
            />
            <Text style={styles.linkText} onPress={() => navigation.navigate('Registrar')}>Registre-se aqui</Text>
            <TextInput
                style={styles.input}
                placeholder='Digite sua senha'
                value={senha}
                onChangeText={handleSenhaChange}
                secureTextEntry
            />
            <Button title="Entrar aqui" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 16,