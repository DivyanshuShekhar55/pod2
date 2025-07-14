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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const AddEventScreen = ({ navigation }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    category: '',
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEvent = () => {
    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.time || !eventData.location) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Handle event creation logic here
    console.log('Creating event:', eventData);
    Alert.alert('Success', 'Event created successfully!');
    
    // Navigate back or reset form
    // navigation.goBack();
  };

  const handleGoBack = () => {
    // navigation.goBack();
    console.log('Going back');
  };

  const renderInputField = (
    label,
    field,
    placeholder,
    icon,
    multiline = false,
    keyboardType = 'default'
  ) => {
    const isFocused = focusedField === field;
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
          <Ionicons name={icon} size={20} color={isFocused ? '#8B5CF6' : '#9CA3AF'} />
          <TextInput
            style={[styles.textInput, multiline && styles.textInputMultiline]}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            value={eventData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            onFocus={() => setFocusedField(field)}
            onBlur={() => setFocusedField(null)}
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            keyboardType={keyboardType}
          />
        </View>
      </View>
    );
  };

  const categories = ['Festival', 'Concert', 'Workshop', 'Sports', 'Conference', 'Party'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Event</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Event Title */}
          {renderInputField('Event Title *', 'title', 'Enter event title', 'calendar-outline')}

          {/* Event Description */}
          {renderInputField(
            'Description',
            'description',
            'Tell us about your event...',
            'document-text-outline',
            true
          )}

          {/* Date and Time Row */}
          <View style={styles.rowContainer}>
            <View style={styles.halfInput}>
              {renderInputField('Date *', 'date', 'DD/MM/YYYY', 'calendar')}
            </View>
            <View style={styles.halfInput}>
              {renderInputField('Time *', 'time', 'HH:MM', 'time-outline')}
            </View>
          </View>

          {/* Location */}
          {renderInputField(
            'Location *',
            'location',
            'Enter event location',
            'location-outline'
          )}

          {/* Organizer */}
          {renderInputField(
            'Organizer',
            'organizer',
            'Your name or organization',
            'person-outline'
          )}

          {/* Category Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    eventData.category === category && styles.categoryChipSelected
                  ]}
                  onPress={() => handleInputChange('category', category)}
                >
                  <Text style={[
                    styles.categoryText,
                    eventData.category === category && styles.categoryTextSelected
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bottom spacing for floating button */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Floating Add Event Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddEvent}>
        <Text style={styles.floatingButtonText}>Add Event</Text>
      </TouchableOpacity>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F8FAFC',
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    minHeight: 20,
  },
  textInputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryChipSelected: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFF',
  },
  bottomSpacing: {
    height: 100,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF8A65',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8A65',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
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
    width: 150,
    height: 150,
    backgroundColor: '#8B5CF6',
    top: -30,
    right: -30,
  },
  bubble2: {
    width: 120,
    height: 120,
    backgroundColor: '#F59E0B',
    bottom: 200,
    left: -40,
  },
  bubble3: {
    width: 80,
    height: 80,
    backgroundColor: '#10B981',
    top: '60%',
    right: -20,
  },
});

export default AddEventScreen;