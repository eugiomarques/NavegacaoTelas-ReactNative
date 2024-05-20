import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
        // Remove todos os caracteres não numéricos
        const numericValidade = validade.replace(/[^0-9]/g, '');
        let formattedValidade = '';

        // Adiciona a barra após o dia e o mês
        for (let i = 0; i < numericValidade.length; i++) {
            if (i === 2 || i === 4) {
                formattedValidade += '/';
            }
            formattedValidade += numericValidade[i];
        }

        setValidade(formattedValidade);
    };

    const handleSubmit = () => {
        // Aqui você pode implementar a lógica para adicionar o produto
        console.log(`Produto adicionado: ${nome}, Quantidade: ${quantidade}, Validade: ${validade}`);
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
