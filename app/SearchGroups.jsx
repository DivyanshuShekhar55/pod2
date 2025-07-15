import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Dimensions,
    SafeAreaView,
    Animated,
    Image,
    ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const CommunitySearchScreen = () => {
    const router = useRouter();
    const [pulseAnim] = useState(new Animated.Value(0));

    // Sample community members data
    const communityMembers = [
        {
            id: 1,
            name: "Joe Smith",
            role: "Community Lead",
            distance: "200 m",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            position: { top: 80, left: 50 },
            circleRadius: 120
        },
        {
            id: 2,
            name: "Sarah Johnson",
            role: "Member",
            distance: "350 m",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            position: { bottom: 100, left: 90 },
            circleRadius: 180
        },
        {
            id: 3,
            name: "Mike Davis",
            role: "Member",
            distance: "180 m",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            position: { bottom: 180, right: 60 },
            circleRadius: 180
        }
    ];

    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimation.start();

        return () => pulseAnimation.stop();
    }, []);

    const handleGoBack = () => {
        router.back();
    };

    const handleCancel = () => {
        router.back();
    };

    const renderPulseCircle = (scale, opacity) => (
        <Animated.View
            style={[
                styles.pulseCircle,
                {
                    transform: [{ scale }],
                    opacity,
                }
            ]}
        />
    );

    const renderCommunityMember = (member) => (
        <View key={member.id} style={[styles.memberContainer, member.position]}>
            {/* Static circle for member
            <View style={[styles.staticCircle, { 
                width: member.circleRadius, 
                height: member.circleRadius,
                borderRadius: member.circleRadius / 2,
                marginLeft: -member.circleRadius / 2,
                marginTop: -member.circleRadius / 2,
            }]} /> */}
            <View style={styles.memberAvatar}>
                <Image 
                    source={{ uri: member.avatar }} 
                    style={styles.avatarImage}
                />
            </View>
            {/* {member.id === 1 && (
                <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRole}>{member.role} • {member.distance}</Text>
                </View>
            )} */}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Searching for Communities</Text>
                <View style={styles.headerPlaceholder} />
            </View> */}

            {/* Main Content */}
            <View style={styles.content}>
                {/* Community Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <Ionicons name="people" size={32} color="#FFFFFF" />
                    </View>
                </View>

                {/* Title and Subtitle */}
                <Text style={styles.title}>Searching Communities</Text>
                <Text style={styles.subtitle}>It may take some time</Text>

                {/* Pulse Animation Area */}
                <View style={styles.mapContainer}>
                    {/* Circular map background */}
                    <View style={styles.mapBackground}>
                        <ImageBackground 
                            source={require("../assets/images/map.png")} 
                            style={styles.mapImage}
                            imageStyle={styles.mapImageStyle}
                        >
                            {/* Fade overlay with gradient effect */}
                            <View style={styles.fadeOverlay} />
                        </ImageBackground>
                    </View>
                    
                    <View style={styles.pulseContainer}>
                        {/* Animated Pulse Circles */}
                        {renderPulseCircle(
                            pulseAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 2.5]
                            }),
                            pulseAnim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0.9, 0.4, 0]
                            })
                        )}
                        
                        {renderPulseCircle(
                            pulseAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 2]
                            }),
                            pulseAnim.interpolate({
                                inputRange: [0, 0.7, 1],
                                outputRange: [0.7, 0.3, 0]
                            })
                        )}
                        
                        {renderPulseCircle(
                            pulseAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 1.5]
                            }),
                            pulseAnim.interpolate({
                                inputRange: [0, 0.8, 1],
                                outputRange: [0.5, 0.2, 0]
                            })
                        )}

                        {/* Center Phone Icon */}
                        <View style={styles.centerIcon}>
                            <Ionicons name="phone-portrait" size={24} color="#666" />
                        </View>

                        {/* Community Members */}
                        {communityMembers.map(renderCommunityMember)}
                    </View>
                </View>
            </View>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Ionicons name="close" size={20} color="#9CA3AF" />
                <Text style={styles.cancelText}>Cancel</Text>
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
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    headerPlaceholder: {
        width: 40,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
    },
    iconContainer: {
        marginBottom: 30,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 60,
    },
    mapContainer: {
        position: 'relative',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        overflow: 'hidden',
    },
    mapBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: width * 0.4,
        overflow: 'hidden',
    },
    mapImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    mapImageStyle: {
        borderRadius: width * 0.4,
        resizeMode: 'cover',
    },
    fadeOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(248, 250, 252, 0.75)',
        borderRadius: width * 0.4,
        // Create a radial fade effect
        opacity: 1,
    },
    pulseContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulseCircle: {
        position: 'absolute',
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        borderWidth: 2,
        borderColor: '#22C55E',
        borderStyle: 'dashed',
    },
    centerIcon: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
    },
    memberContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    staticCircle: {
        position: 'absolute',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'solid',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        // Ensure the circle is centered on the member position
        top: '50%',
        left: '50%',
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 5,
        // Center the avatar within the static circle
        position: 'relative',
    },
    avatarImage: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    memberInfo: {
        alignItems: 'center',
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 5,
    },
    memberName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    memberRole: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        paddingVertical: 12,
    },
    cancelText: {
        fontSize: 16,
        color: '#9CA3AF',
        marginLeft: 8,
    },
});

export default CommunitySearchScreen;