import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const EventCard = ({
    title,
    date,
    time,
    location,
    description,
    onPress,
    cardColor = '#8B5CF6' // Default purple color
}) => {
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={onPress} activeOpacity={1}>
            <View style={styles.cardHeader}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateDay}>{date.day}</Text>
                    <Text style={styles.dateMonth}>{date.month}</Text>
                </View>

            </View>

            <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{title}</Text>
                <Text style={styles.eventDesc}> {description}</Text>

                <View style={styles.eventDetails}>
                    <Text style={styles.eventTime}>{time}</Text>

                    <View style={styles.eventLocationContainer}>

                        <Text style={styles.eventLocation} numberOfLines={1}>{location}</Text>

                        <TouchableOpacity>
                            <View style={styles.eventLocationIcon} activeOpacity={0.7}>
                                <Ionicons name='location-outline' size={16} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            {/* Decorative elements */}
            <View style={styles.decorativeElements}>
                <View style={[styles.decorativeShape, styles.shape1]} />
                <View style={[styles.decorativeShape, styles.shape2]} />
                <View style={[styles.decorativeShape, styles.shape3]} />
                <View style={[styles.decorativeShape, styles.shape4]} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width - 32,
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    dateContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        minWidth: 60,
    },
    dateDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 24,
    },
    dateMonth: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    cardContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    eventDesc: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 16,
    },
    eventDetails: {
        marginBottom: 4,
    },
    eventTime: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginBottom: 4,
    },
    eventLocationContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 8,
        borderRadius: 8,
    },
    eventLocation: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        flex:0.9
    },
    eventLocationIcon:{
        flex:0.1
    },
    decorativeElements: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },
    decorativeShape: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 50,
    },
    shape1: {
        width: 80,
        height: 80,
        top: -20,
        right: -20,
    },
    shape2: {
        width: 60,
        height: 60,
        bottom: -10,
        left: -10,
    },
    shape3: {
        width: 40,
        height: 40,
        top: '50%',
        right: 10,
        transform: [{ translateY: -20 }],
    },
    shape4: {
        width: 30,
        height: 30,
        bottom: '30%',
        right: -5,
    },
});

export default EventCard;