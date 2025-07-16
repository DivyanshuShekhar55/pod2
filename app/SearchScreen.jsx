import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const CommunitySearchScreen = () => {
    const [inviteLink, setInviteLink] = useState('');
    const [name, setName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [distance, setDistance] = useState(2);

    const tags = ['Tech', 'Art', 'Senior', 'Society', 'School'];

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleDistanceChange = (value) => {
        const roundedValue = Math.round(value / 2) * 2;
        setDistance(roundedValue);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Search for Communities</Text>

                    {/* Join Using Invite Link Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Join Using Invite Link</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Paste your invite link"
                                value={inviteLink}
                                onChangeText={setInviteLink}
                                placeholderTextColor="#9CA3AF"
                            />
                            <TouchableOpacity style={styles.linkButton}>
                                <Text style={styles.linkButtonText}>↗</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.orContainer}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.orLine} />
                        </View>
                    </View>

                    {/* Name Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter community name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    {/* Tags Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tags</Text>
                        <View style={styles.tagsContainer}>
                            {tags.map((tag) => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[
                                        styles.tag,
                                        selectedTags.includes(tag) && styles.selectedTag
                                    ]}
                                    onPress={() => toggleTag(tag)}
                                >
                                    <Text style={[
                                        styles.tagText,
                                        selectedTags.includes(tag) && styles.selectedTagText
                                    ]}>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Distance Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Distance</Text>
                        <View style={styles.sliderContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={10}
                                value={distance}
                                onValueChange={handleDistanceChange}
                                minimumTrackTintColor="#8B5CF6"
                                maximumTrackTintColor="#E5E7EB"
                                thumbStyle={styles.sliderThumb}
                                trackStyle={styles.sliderTrack}
                                step={2}
                            />
                            <View style={styles.sliderLabels}>
                                <Text style={styles.sliderLabel}>0KM</Text>
                                <Text style={styles.sliderLabel}>10KM</Text>
                            </View>
                            <Text style={styles.distanceValue}>{distance}KM</Text>
                        </View>
                    </View>

                    {/* Search Button */}
                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Search Communities</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#F9FAFB',
    },
    linkButton: {
        marginLeft: 12,
        width: 50,
        height: 50,
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    linkButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    orText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#F9FAFB',
    },
    selectedTag: {
        backgroundColor: '#c7f65c',
        borderColor: '#c7f65c',
        shadowColor: '#c7f65c',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tagText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    selectedTagText: {
        color: '#000',
        fontWeight: '600',
    },
    sliderContainer: {
        paddingHorizontal: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderThumb: {
        backgroundColor: '#8B5CF6',
        width: 24,
        height: 24,
    },
    sliderTrack: {
        height: 4,
        borderRadius: 2,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingHorizontal: 12,
    },
    sliderLabel: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '500',
    },
    distanceValue: {
        textAlign: 'center',
        fontSize: 16,
        color: '#8B5CF6',
        fontWeight: '600',
        marginTop: 6,
    },
    searchButton: {
        backgroundColor: '#8B5CF6',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#8B5CF6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CommunitySearchScreen;