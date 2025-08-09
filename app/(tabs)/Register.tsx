import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { ClientAPI } from '@/scripts/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Erro', 'Nome de usuário é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Erro', 'Senha é obrigatória');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const response = await ClientAPI.create({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      platform: Platform.OS
    });

      if (response.data && response.data.success) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        router.replace('/home');
      } else {
        throw new Error(response.data?.message || 'Erro desconhecido');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Erro ao registrar';
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                      (error.response.status === 409 ? 'Email já cadastrado' : errorMessage);
      } else if (error.message) {
        errorMessage = error.message.includes('timeout') ? 
                      'Tempo de conexão esgotado' : error.message;
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        placeholderTextColor="#888"
        value={formData.name}
        onChangeText={handleChange('name')}
        autoCapitalize="words"
        autoCorrect={false}
        maxLength={30}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={formData.email}
        onChangeText={handleChange('email')}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha (mínimo 6 caracteres)"
        placeholderTextColor="#888"
        value={formData.password}
        onChangeText={handleChange('password')}
        secureTextEntry
        minLength={6}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#888"
        value={formData.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Registrando...' : 'Criar Conta'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já tem uma conta?</Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FF5100',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    color: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#1A1A1A',
  },
  button: {
    height: 50,
    backgroundColor: '#FF5100',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#FF510080',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  loginText: {
    color: '#888',
    marginRight: 5,
  },
  loginLink: {
    color: '#FF5100',
    fontWeight: 'bold',
  },
});