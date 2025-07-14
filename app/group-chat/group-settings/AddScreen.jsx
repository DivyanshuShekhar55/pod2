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
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const AddEventScreen = ({ navigation }) => {
    const router = useRouter()

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    backgroundColor: '#FF8A65', // Default color
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
    router.back()
  };

  const handleDatePress = () => {
    // Open date picker/calendar
    Alert.alert('Date Picker', 'Calendar would open here');
    // You can integrate with a date picker library like react-native-date-picker
  };

  const handleLocationPress = () => {
    // Open map
    Alert.alert('Map', 'Map would open here');
    // You can integrate with react-native-maps or open external map
  };

  const renderInputField = (
    label,
    field,
    placeholder,
    icon,
    multiline = true,
    keyboardType = 'default',
    onPress = null
  ) => {
    const isFocused = focusedField === field;
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TouchableOpacity 
          style={[styles.inputWrapper]}
          onPress={onPress}
          disabled={!onPress}
          activeOpacity={onPress ? 0.7 : 1}
        >
          {/* <Ionicons name={icon} size={20} color={isFocused ? '#8B5CF6' : '#9CA3AF'} /> */}
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
            editable={!onPress}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const backgroundColors = [
    '#FF8A65', // Orange
    '#8B5CF6', // Purple
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#3B82F6', // Blue
  ];

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
          {renderInputField('Event Title', 'title', 'Enter event title', 'calendar-outline', false)}

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
              {renderInputField('Date', 'date', 'Select date', 'calendar', false, 'default', handleDatePress)}
            </View>
            <View style={styles.halfInput}>
              {renderInputField('Time', 'time', 'Select time', 'time-outline', false)}
            </View>
          </View>

          {/* Location */}
          {renderInputField(
            'Location',
            'location',
            'Choose location',
            'location-outline',
            false,
            'default',
            handleLocationPress
          )}

          {/* Background Color Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Event Color</Text>
            <View style={styles.colorContainer}>
              {backgroundColors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorChip,
                    { backgroundColor: color },
                    eventData.backgroundColor === color && styles.colorChipSelected
                  ]}
                  onPress={() => handleInputChange('backgroundColor', color)}
                >
                  {eventData.backgroundColor === color && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
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
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  inputWrapperFocused: {
    borderBottomColor: '#8B5CF6',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    //marginLeft: 12,
    minHeight: 16,
    textAlignVertical: 'bottom',
    
  },
  textInputMultiline: {
    minHeight: 60,
    textAlignVertical: 'bottom',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  halfInput: {
    flex: 1,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    backgroundColor:"transparent",
  },
  colorChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorChipSelected: {
    borderWidth: 3,
    borderColor: '#FFF',
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

});

export default AddEventScreen;