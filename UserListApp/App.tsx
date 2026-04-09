import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

// Type untuk user (TypeScript)
type User = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Filter search
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>User List</Text>

      {/* Search */}
      <TextInput
        style={styles.input}
        placeholder="Search user..."
        value={search}
        onChangeText={setSearch}
      />

      {/* List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.city}>{item.address.city}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 3
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  email: {
    color: 'gray'
  },
  city: {
    marginTop: 5,
    fontStyle: 'italic'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});