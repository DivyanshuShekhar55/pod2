
import React from "react";
import { View, StyleSheet, StatusBar, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const SPACING = 20;

const AnimatedListItem = ({ 
  children, 
  index, 
  offset, 
  itemSize, 
  animationConfig = {}
}) => {
  const {
    opacityRange = [1, 1, 1, 0],
    scaleRange = [1, 1, 1, 0],
    fadeOffset = 0.5,
    scaleOffset = 2,
    backgroundColor = 'rgba(255, 255, 255, 0.8)',
    borderRadius = 18,
    padding = SPACING,
    marginBottom = SPACING,
  } = animationConfig;

  const opacityInput = [
    -1, 0, itemSize * index, itemSize * (index + fadeOffset)
  ];

  const scaleInput = [
    -1, 0, itemSize * index, itemSize * (index + scaleOffset)
  ];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, opacityInput, opacityRange, 'clamp'),
    transform: [
      {
        scale: interpolate(offset.value, scaleInput, scaleRange, 'clamp')
      }
    ]
  }));

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          marginBottom,
          padding,
          borderRadius,
          backgroundColor,
        },
        animatedStyle
      ]}
    >
      {children}
    </Animated.View>
  );
};

const GenericAnimatedFlashList = ({
  data,
  renderItem,
  keyExtractor,
  itemSize,
  backgroundImage,
  blurRadius = 70,
  animationConfig,
  contentContainerStyle,
  ...flashListProps
}) => {
  const offsetY = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetY.value = event.contentOffset.y;
  });

  const defaultContentContainerStyle = {
    padding: SPACING,
    paddingTop: StatusBar.currentHeight || 42,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {backgroundImage && (
        <Image 
          source={{ uri: backgroundImage }} 
          style={StyleSheet.absoluteFill} 
          blurRadius={blurRadius} 
        />
      )}
      <AnimatedFlashList
        onScroll={scrollHandler}
        data={data}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          ...defaultContentContainerStyle,
          ...contentContainerStyle,
        }}
        estimatedItemSize={itemSize}
        renderItem={({ item, index }) => (
          <AnimatedListItem
            index={index}
            offset={offsetY}
            itemSize={itemSize}
            animationConfig={animationConfig}
          >
            {renderItem({ item, index })}
          </AnimatedListItem>
        )}
        {...flashListProps}
      />
    </View>
  );
};