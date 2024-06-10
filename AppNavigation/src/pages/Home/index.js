import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [validade, setValidade] = useState('');

    const handleNomeChange = (nome) => {
        setNome(nome);
    };

    const handleQuantidadeChange = (quantidade) => {
        if (!isNaN(quantidade)) {
            setQuantidade(quantidade);
        }
    };

    const handleValidadeChange = (validade) => {
        const numericValidade = validade.replace(/[^0-9]/g, '');
        let formattedValidade = '';

        for (let i = 0; i < numericValidade.length; i++) {
            if (i === 2 || i === 4) {
                formattedValidade += '/';
            }
            formattedValidade += numericValidade[i];
        }

        setValidade(formattedValidade);
    };

    const handleSubmit = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!nome || !quantidade || !validade) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const novoProduto = {
            nome,
            quantidade,
            validade,
        };

        let produtos = await AsyncStorage.getItem('produtos');
        if (!produtos) {
            produtos = [];
        } else {
            produtos = JSON.parse(produtos);
        }

        produtos.push(novoProduto);

        try {
            await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
            Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Houve um erro ao tentar cadastrar o produto.');
        }
    };

    return (
        <View style={styles.container}>
            <Text onPress={()=>navigation.navigate ('Perfil')}>Perfil</Text>
            <Text style={styles.title}>Cadastro de Produtos</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome do produto'
                value={nome}
                onChangeText={handleNomeChange}
            />
            <TextInput
                style={styles.input}
                placeholder='Quantidade do produto'
                value={quantidade}
                onChangeText={handleQuantidadeChange}
                keyboardType='numeric'
            />
            <TextInput
                style={styles.input}
                placeholder='Validade do produto (dd/mm/aaaa)'
                value={validade}
                onChangeText={handleValidadeChange}
                maxLength={10}
            />
            <Button title="Cadastrar Produto" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        margin: 10,
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        borderRadius: 5,
        padding: 5,
    },
});