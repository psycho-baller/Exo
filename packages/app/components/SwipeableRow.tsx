import { useTheme } from '@acme/ui';
import { useRef, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  type SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';
import type { ReactNode } from 'react';

type SwipeableAction = {
  color: string;
  icon: ReactNode;
  onPress: () => void;
};

type SwipeableRowProps = {
  children: React.ReactNode;
  rightActions?: SwipeableAction[];
  leftActions?: SwipeableAction[];
};

const renderAction =
  (action: SwipeableAction, prog: SharedValue<number>, drag: SharedValue<number>, index: number) => {
    const styleAnimation = useAnimatedStyle(() => {
      console.log('[R] showLeftProgress:', prog.value);
      console.log('[R] appliedTranslation:', drag.value);

      return {
        transform: [{
          translateX: drag.value + ((1 + index) * 75)
        }]
      };
    });
    const pressHandler = () => {
      action.onPress();
    };

    return (
      <Reanimated.View
        style={styleAnimation}
      >
        <RectButton style={[styles.action, { backgroundColor: action.color }]} onPress={pressHandler}>
          {action.icon}
        </RectButton>
      </Reanimated.View>
    );
  };
const renderRightActions =
  (progress: SharedValue<number>, drag: SharedValue<number>, swipeable: any, rightActions: SwipeableAction[]) => {
    console.log('rightActions', rightActions);
    return (
      <View style={styles.actionsContainer}>
        {rightActions.map((action, index) =>
          renderAction(action, progress, drag, index)
        )}
      </View>
    );
  }

const renderLeftActions =
  (progress: SharedValue<number>, drag: SharedValue<number>, swipeable: any, leftActions: SwipeableAction[]) => {
    return (
      <View style={styles.actionsContainer}>
        {leftActions.map((action, index) =>
          renderAction(action, progress, drag, index)
        )}
      </View>
    );
  }


export const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, rightActions = [], leftActions = [] }) => {
  // const swipeableRowRef = useRef<typeof Swipeable>(null);

  // const onSwipeableOpen = useCallback(() => {
  //   close();
  // }, [close]);

  return (
    <Swipeable
      // ref={swipeableRowRef}
      enableTrackpadTwoFingerGesture
      friction={2}
      // overshootRight={false}
      // rightThreshold={50}

      renderRightActions={(progress, drag, swipeable) => renderRightActions(progress, drag, swipeable, rightActions)}
      renderLeftActions={(progress, drag, swipeable) => renderLeftActions(progress, drag, swipeable, leftActions)}
      onSwipeableOpen={() => rightActions.at(-1)?.onPress()}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  action: {
    height: '100%',
    width: 75,
    // padding: 20,
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center',
  },
  actionsContainer: {
    alignItems: 'center',

    // height: '100%',
    // width: '100%',
    // flexDirection: 'row',
  },
});