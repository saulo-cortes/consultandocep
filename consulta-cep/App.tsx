import React, { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
const App: React.FC = () => {

    const [cep, setCep] = useState('');
    
    
    return (
    
    <View style={styles.container}>
    
    <Text style={styles.title}>Consulta CEP</Text>
    
    <TextInput
    
    style={styles.input}
    
    placeholder="Digite o CEP"
    
    keyboardType="numeric"
    
    value={cep}
    
    onChangeText={setCep}
    
    />
    
    <Button title="Buscar" onPress={fetchAddress} />
    
    </View>
    
    );
    
    };
    const styles = StyleSheet.create({

        container: {
        
        flex: 1,
        
        justifyContent: 'center',
        
        alignItems: 'center',
        
        padding: 20,
        
        },
        
        title: {
        
        fontSize: 24,
        
        fontWeight: 'bold',
        
        marginBottom: 20,
        
        },
        
        input: {
        
        width: '100%',
        
        height: 40,
        
        borderColor: 'gray',
        
        borderWidth: 1,
        
        paddingHorizontal: 10,
        
        marginBottom: 10,
        
        }
        
        })
        type Address = {

            logradouro: string;
            
            bairro: string;
            
            localidade: string;
            
            uf: string;
            
            }
            
            const [address, setAddress] = useState<Address | null>(null);
            
            const [error, setError] = useState('');
            const fetchAddress = async () => {

                setError('');
                
                setAddress(null);
                
                
                if (cep.length !== 8) {
                
                setError('CEP inválido. Deve conter 8 dígitos.');
                
                return;
                
                }
                
                
                try {
                
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                
                if (response.data.erro) {
                
                setError('CEP não encontrado.');
                
                } else {
                
                setAddress(response.data);
                
                }
                
                } catch (error) {
                
                setError('Erro ao buscar CEP. Verifique sua conexão.');
                
                }
                
                };
                {error ? <Text style={styles.error}>{error}</Text> : null}

                {address && (
                
                <View style={styles.result}>
                
                <Text>Logradouro: {address.logradouro}</Text>
                
                <Text>Bairro: {address.bairro}</Text>
                
                <Text>Cidade: {address.localidade} - {address.uf}</Text>
                
                </View>
                
                )}
                const styles = StyleSheet.create({

                    ...styles,
                    
                    error: {
                    
                    color: 'red',
                    
                    marginTop: 10,
                    
                    },
                    
                    result: {
                    
                    marginTop: 20,
                    
                    alignItems: 'center',
                    
                    },
                    
                    });