import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import EventCard from '../../../components/EventCard';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [searchText, setSearchText] = useState('');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Festival Dance',
      description: 'Jorou william',
      time: '6:00PM',
      location: 'Kadupugur, Sukabumi, India, World < milky way da da dum',
      date: { day: '22', month: 'July' },
      cardColor: '#8B5CF6',
    },
    {
      id: 2,
      title: 'Music Concert',
      description: 'Band Performance',
      time: '19:00 PM',
      location: 'City Central',
      date: { day: '15', month: 'Aug' },
      cardColor: '#F59E0B',
    },
    {
      id: 3,
      title: 'Music Concert',
      description: 'Band Performance',
      time: '19:00 PM',
      location: 'City Central',
      date: { day: '15', month: 'Aug' },
      cardColor: '#EA48C9',
    },
  ];

  const handleEventPress = (event) => {
    console.log('Event pressed:', event.title);
  };

  const handleAddEvent = () => {
    console.log('Add event pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search event, date ..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Event Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Events</Text>
        </View>

        {/* Event Cards */}
        <View style={styles.eventsContainer}>
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              cardColor={event.cardColor}
              onPress={() => handleEventPress(event)}
            />
          ))}
        </View>

        {/* Upcoming Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
        </View>

        {/* Add some spacing at the bottom */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>+</Text>
          <Text style={styles.addButtonLabel}>Add Event</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📅</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👥</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Decorative Background Elements */}
      <View style={styles.backgroundDecoration}>
        <View style={[styles.decorativeBubble, styles.bubble1]} />
        <View style={[styles.decorativeBubble, styles.bubble2]} />
        <View style={[styles.decorativeBubble, styles.bubble3]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    paddingTop:16,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventsContainer: {
    paddingBottom: 20,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8A65',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#FF8A65',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonLabel: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
  navItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  navIcon: {
    fontSize: 20,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: -1,
  },
  decorativeBubble: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.1,
  },
  bubble1: {
    width: 200,
    height: 200,
    backgroundColor: '#8B5CF6',
    top: -50,
    right: -50,
  },
  bubble2: {
    width: 150,
    height: 150,
    backgroundColor: '#F59E0B',
    bottom: 100,
    left: -30,
  },
  bubble3: {
    width: 100,
    height: 100,
    backgroundColor: '#10B981',
    top: '40%',
    right: -20,
  },
});

export default App;