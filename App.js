import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
import FightClub from './assets/fightclub.jpg';
import Matrix from './assets/2.jpg';
import Gladiator from './assets/3.jpg';
import Dune from './assets/4.jpg';
import Inception from './assets/5.jpg';
import Interstellar from './assets/6.jpg';
import GangsOfLondon from './assets/7.jpg';
const MOVIES = [
  {
    id: '1',
    title: 'Fight Club',
    description:
      'An insomniac forms an underground fight club that evolves into something much bigger.',
    rating: 4.8,
    image: FightClub,
  },
  {
    id: '2',
    title: 'The Matrix',
    description:
      'A hacker discovers reality is a simulation and fights to free humanity.',
    rating: 4.9,
    image: Matrix,
  },
  {
    id: '3',
    title: 'Gladiator',
    description:
      'A betrayed Roman general seeks revenge against the corrupt emperor.',
    rating: 4.7,
    image: Gladiator,
  },
  {
    id: '4',
    title: 'Dune',
    description:
      'A noble family becomes entangled in a war for control over the desert planet Arrakis.',
    rating: 4.6,
    image: Dune,
  },
  {
    id: '5',
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through dream-sharing technology.',
    rating: 4.9,
    image: Inception,
  },
  {
    id: '6',
    title: 'Interstellar',
    description:
      'Explorers travel through a wormhole in space in an attempt to save humanity.',
    rating: 4.8,
    image: Interstellar,
  },
  {
    id: '7',
    title: 'Gangs of London',
    description:
      'Power struggles erupt between rival gangs after the assassination of London’s crime boss.',
    rating: 4.5,
    image: GangsOfLondon,
  },
];
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  return '⭐'.repeat(fullStars);
};

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>

        <Text style={styles.rating}>
          {renderStars(movie.rating)} ({movie.rating})
        </Text>

        <Text style={styles.description}>{movie.description}</Text>

        <Pressable onPress={() => toggleFavorite(movie.id)}>
          <Text style={styles.favoriteButton}>
            {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
          </Text>
        </Pressable>
      </View>

      <Image source={movie.image} style={styles.image} />
    </View>
  );
};
export default function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  const favoriteMovies = MOVIES.filter((movie) =>
    favorites.includes(movie.id)
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1c1c1c',
            height: 60,
            paddingBottom: 6,
          },
          tabBarActiveTintColor: '#f5c518',
          tabBarInactiveTintColor: '#aaa',
          tabBarLabelStyle: {
            fontSize: 13,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen name="All Movies">
          {() => (
            <View style={styles.screen}>
              <FlatList
                data={MOVIES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MovieCard
                    movie={item}
                    isFavorite={favorites.includes(item.id)}
                    toggleFavorite={toggleFavorite}
                  />
                )}
              />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Favorites">
          {() => (
            <View style={styles.screen}>
              {favoriteMovies.length === 0 ? (
                <Text style={styles.emptyText}>
                  No favorite movies yet ⭐
                </Text>
              ) : (
                <FlatList
                  data={favoriteMovies}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <MovieCard
                      movie={item}
                      isFavorite={true}
                      toggleFavorite={toggleFavorite}
                    />
                  )}
                />
              )}
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    marginVertical: 4,
    color: '#f5c518',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  favoriteButton: {
    marginTop: 4,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});
