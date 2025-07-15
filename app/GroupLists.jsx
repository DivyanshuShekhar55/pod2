import { View, Text, Image } from 'react-native'
import React from 'react'
import GenericAnimatedFlashList from "../utils/AnimatedScrollRenderer"

const GroupLists = () => {
    const SPACING = 20
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + 3 * SPACING;

    const sampleData = [];

    const object = {
        key: 1,
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        jobTitle: 'Software Engineer',
        email: 'john@example.com',
    }

    const copy = Array.from({length:10}, (_, i)=>({
        ...object,
        key:i+1
    }))

    const renderUserItem = ({ item }) => (
        <>
            <Image
                source={{ uri: item.image }}
                style={{
                    height: AVATAR_SIZE,
                    width: AVATAR_SIZE,
                    borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2,
                }}
            />
            <View>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {item.name}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.7 }}>
                    {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 12, opacity: 0.8, color: "#0099cc" }}>
                    {item.email}
                </Text>
            </View>
        </>
    );

    return (
        <GenericAnimatedFlashList
            data={copy}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.key}
            itemSize={ITEM_SIZE}
            backgroundImage="https://images.pexels.com/photos/3147624/pexels-photo-3147624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            animationConfig={{
                fadeOffset: 0.5,
                scaleOffset: 2,
                backgroundColor: 'rgba(239, 239, 239, 1)',
                borderRadius: 18,
            }}
        />
    )
}

export default GroupLists