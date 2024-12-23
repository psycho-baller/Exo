import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  runOnJS,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics'
import type { ReactNode } from 'react';
import { useTheme } from '@acme/ui';

type SwipeableAction = {
  color: string;
  icon: ReactNode;
  onPress: () => void;
};

type SwipeableRowProps = {
  children: React.ReactNode;
  rightAction?: SwipeableAction;
  leftAction?: SwipeableAction;
};

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

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

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>, rightAction: SwipeableAction) {
  const hasReachedThresholdUp = useSharedValue(false);
  const hasReachedThresholdDown = useSharedValue(false);
  const theme = useTheme();

  useAnimatedReaction(
    () => {
      return drag.value;
    },
    (dragValue) => {
      if (Math.abs(dragValue) > 100 && !hasReachedThresholdUp.value) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdUp.value = true;
        hasReachedThresholdDown.value = false;
      } else if (Math.abs(dragValue) < 100 && !hasReachedThresholdDown.value) {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdDown.value = true;
        hasReachedThresholdUp.value = false;
      }
    }
  );

  const derivedDragValue = useDerivedValue(() => {
    return drag.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (Math.abs(derivedDragValue.value) > 100) {
      return {
        backgroundColor: theme.accent?.val,
      };
    }
    return {
      backgroundColor: theme.secondaryBackground?.val,
    };
  });

  const pressHandler = () => {
    rightAction.onPress();
  };

  return (
    <Reanimated.View style={[{ flex: 1 }]}>
      <Reanimated.View style={[styles.rightAction, animatedStyle]}>

        {/* <RectButton style={[styles.action, { backgroundColor: action.color }]}> */}
        {rightAction.icon}
        {/* </RectButton> */}
      </Reanimated.View>

    </Reanimated.View>
  );
}


export const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, rightAction, leftAction }) => {
  const swipeableRowRef = useRef<SwipeableMethods>(null);
  const theme = useTheme();

  // const onSwipeableOpen = useCallback(() => {
  //   close();
  // }, [close]);


  return (
    <Reanimated.View>
      <ReanimatedSwipeable
        ref={swipeableRowRef}
        enableTrackpadTwoFingerGesture
        containerStyle={{ backgroundColor: theme.background?.val }}
        friction={2}
        // overshootRight={false}
        rightThreshold={40}

        renderRightActions={(prog, drag) => rightAction && RightAction(prog, drag, rightAction)}
        // renderLeftActions={(progress, drag, swipeable) => renderLeftActions(progress, drag, swipeable, leftActions)}
        onSwipeableOpen={() => rightAction?.onPress()}
        onSwipeableWillOpen={() => rightAction?.onPress()}
      >
        {children}
      </ReanimatedSwipeable>
    </Reanimated.View>
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
  rightAction: {
    height: 90,
    backgroundColor: '#8b8a8a',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    flex: 1,
  },
});