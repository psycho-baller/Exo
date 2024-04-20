/// <reference types="react" />
import type { GetProps } from 'tamagui';

export declare const Page: import('tamagui').TamaguiComponent<
  | (Omit<
      import('react-native').ViewProps,
      | 'style'
      | 'pointerEvents'
      | 'display'
      | 'children'
      | 'onLayout'
      | keyof import('react-native').GestureResponderHandlers
    > &
      import('@tamagui/web').ExtendBaseStackProps &
      import('@tamagui/web').WebOnlyPressEvents &
      import('@tamagui/web').TamaguiComponentPropsBaseBase & {
        style?: import('@tamagui/web').StyleProp<
          | import('react-native').ViewStyle
          | import('react').CSSProperties
          | (import('react').CSSProperties & import('react-native').ViewStyle)
        >;
      } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
      import('@tamagui/web').WithShorthands<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
      > &
      import('@tamagui/web').PseudoProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          >
      > &
      import('@tamagui/web').MediaProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          > &
          import('@tamagui/web').PseudoProps<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
              import('@tamagui/web').WithShorthands<
                import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
              >
          >
      > & {
        onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
        onStartShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderEnd?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderGrant?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderReject?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderMove?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderRelease?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderStart?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderTerminationRequest?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderTerminate?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onStartShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        elevationAndroid?: string | number | undefined;
        rel?: any;
        download?: any;
        dataSet?: Record<string, string | number | null | undefined> | undefined;
        onScrollShouldSetResponder?: unknown;
        onScrollShouldSetResponderCapture?: unknown;
        onSelectionChangeShouldSetResponder?: unknown;
        onSelectionChangeShouldSetResponderCapture?: unknown;
        href?: string | undefined;
        hrefAttrs?:
          | {
              target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
              rel?: string | undefined;
              download?: boolean | undefined;
            }
          | undefined;
      } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
      Omit<
        import('tamagui').StackProps,
        | 'transform'
        | 'style'
        | 'space'
        | 'zIndex'
        | 'maxWidth'
        | 'minWidth'
        | 'maxHeight'
        | 'minHeight'
        | 'userSelect'
        | 'cursor'
        | 'pointerEvents'
        | 'alignContent'
        | 'alignItems'
        | 'alignSelf'
        | 'bottom'
        | 'backgroundColor'
        | 'borderBottomColor'
        | 'borderBottomLeftRadius'
        | 'borderBottomRightRadius'
        | 'borderBottomWidth'
        | 'borderLeftColor'
        | 'borderLeftWidth'
        | 'borderColor'
        | 'borderRadius'
        | 'borderStyle'
        | 'borderRightWidth'
        | 'borderRightColor'
        | 'borderTopColor'
        | 'borderTopLeftRadius'
        | 'borderTopRightRadius'
        | 'borderTopWidth'
        | 'borderWidth'
        | 'display'
        | 'flex'
        | 'flexBasis'
        | 'flexDirection'
        | 'flexGrow'
        | 'flexShrink'
        | 'flexWrap'
        | 'height'
        | 'justifyContent'
        | 'left'
        | 'margin'
        | 'marginBottom'
        | 'marginLeft'
        | 'marginRight'
        | 'marginTop'
        | 'marginHorizontal'
        | 'marginVertical'
        | 'opacity'
        | 'overflow'
        | 'padding'
        | 'paddingBottom'
        | 'paddingLeft'
        | 'position'
        | 'paddingRight'
        | 'paddingTop'
        | 'paddingHorizontal'
        | 'paddingVertical'
        | 'right'
        | 'shadowColor'
        | 'shadowRadius'
        | 'shadowOffset'
        | 'shadowOpacity'
        | 'top'
        | 'width'
        | 'children'
        | 'onLayout'
        | 'onStartShouldSetResponder'
        | 'onMoveShouldSetResponder'
        | 'onResponderEnd'
        | 'onResponderGrant'
        | 'onResponderReject'
        | 'onResponderMove'
        | 'onResponderRelease'
        | 'onResponderStart'
        | 'onResponderTerminationRequest'
        | 'onResponderTerminate'
        | 'onStartShouldSetResponderCapture'
        | 'onMoveShouldSetResponderCapture'
        | 'hitSlop'
        | 'id'
        | 'removeClippedSubviews'
        | 'testID'
        | 'nativeID'
        | 'collapsable'
        | 'needsOffscreenAlphaCompositing'
        | 'renderToHardwareTextureAndroid'
        | 'focusable'
        | 'shouldRasterizeIOS'
        | 'isTVSelectable'
        | 'hasTVPreferredFocus'
        | 'tvParallaxProperties'
        | 'tvParallaxShiftDistanceX'
        | 'tvParallaxShiftDistanceY'
        | 'tvParallaxTiltAngle'
        | 'tvParallaxMagnification'
        | 'onTouchStart'
        | 'onTouchMove'
        | 'onTouchEnd'
        | 'onTouchCancel'
        | 'onTouchEndCapture'
        | 'onPointerEnter'
        | 'onPointerEnterCapture'
        | 'onPointerLeave'
        | 'onPointerLeaveCapture'
        | 'onPointerMove'
        | 'onPointerMoveCapture'
        | 'onPointerCancel'
        | 'onPointerCancelCapture'
        | 'onPointerDown'
        | 'onPointerDownCapture'
        | 'onPointerUp'
        | 'onPointerUpCapture'
        | 'accessible'
        | 'accessibilityActions'
        | 'accessibilityLabel'
        | 'aria-label'
        | 'accessibilityRole'
        | 'accessibilityState'
        | 'aria-busy'
        | 'aria-checked'
        | 'aria-disabled'
        | 'aria-expanded'
        | 'aria-selected'
        | 'aria-labelledby'
        | 'accessibilityHint'
        | 'accessibilityValue'
        | 'aria-valuemax'
        | 'aria-valuemin'
        | 'aria-valuenow'
        | 'aria-valuetext'
        | 'onAccessibilityAction'
        | 'importantForAccessibility'
        | 'aria-hidden'
        | 'aria-live'
        | 'aria-modal'
        | 'role'
        | 'accessibilityLiveRegion'
        | 'accessibilityLabelledBy'
        | 'accessibilityElementsHidden'
        | 'accessibilityViewIsModal'
        | 'onAccessibilityEscape'
        | 'onAccessibilityTap'
        | 'onMagicTap'
        | 'accessibilityIgnoresInvertColors'
        | 'accessibilityLanguage'
        | 'gap'
        | 'columnGap'
        | 'rowGap'
        | 'contain'
        | 'touchAction'
        | 'outlineColor'
        | 'outlineOffset'
        | 'outlineStyle'
        | 'outlineWidth'
        | 'spaceDirection'
        | 'separator'
        | 'animation'
        | 'animateOnly'
        | 'borderBlockColor'
        | 'borderBlockEndColor'
        | 'borderBlockStartColor'
        | 'borderBottomEndRadius'
        | 'borderBottomStartRadius'
        | 'borderCurve'
        | 'borderEndColor'
        | 'borderEndEndRadius'
        | 'borderEndStartRadius'
        | 'borderStartColor'
        | 'borderStartEndRadius'
        | 'borderStartStartRadius'
        | 'borderTopEndRadius'
        | 'borderTopStartRadius'
        | 'aspectRatio'
        | 'borderEndWidth'
        | 'borderStartWidth'
        | 'end'
        | 'marginEnd'
        | 'marginStart'
        | 'paddingEnd'
        | 'paddingStart'
        | 'start'
        | 'direction'
        | 'transformMatrix'
        | 'rotation'
        | 'scaleX'
        | 'scaleY'
        | 'translateX'
        | 'translateY'
        | `$${string}`
        | `$${number}`
        | `$theme-${string}`
        | `$theme-${number}`
        | 'ref'
        | 'tag'
        | 'x'
        | 'y'
        | 'perspective'
        | 'scale'
        | 'skewX'
        | 'skewY'
        | 'matrix'
        | 'rotate'
        | 'rotateY'
        | 'rotateX'
        | 'rotateZ'
        | 'theme'
        | 'group'
        | 'onFocus'
        | 'onPress'
        | 'onLongPress'
        | 'onPressIn'
        | 'onPressOut'
        | 'onHoverIn'
        | 'onHoverOut'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'onMouseDown'
        | 'onMouseUp'
        | 'onBlur'
        | 'target'
        | 'asChild'
        | 'dangerouslySetInnerHTML'
        | 'debug'
        | 'disabled'
        | 'className'
        | 'themeShallow'
        | 'themeInverse'
        | 'untilMeasured'
        | 'componentName'
        | 'tabIndex'
        | 'disableOptimization'
        | 'forceStyle'
        | 'disableClassName'
        | 'onScroll'
        | 'hoverStyle'
        | 'pressStyle'
        | 'focusStyle'
        | 'exitStyle'
        | 'enterStyle'
        | 'rel'
        | 'download'
        | 'dataSet'
        | 'onScrollShouldSetResponder'
        | 'onScrollShouldSetResponderCapture'
        | 'onSelectionChangeShouldSetResponder'
        | 'onSelectionChangeShouldSetResponderCapture'
        | 'href'
        | 'hrefAttrs'
        | 'elevationAndroid'
        | 'key'
      > & {
        readonly fullscreen?: boolean | undefined;
        readonly elevation?: number | import('tamagui').SizeTokens | undefined;
      } & import('@tamagui/web').PseudoProps<
        Partial<
          Omit<
            import('react-native').ViewProps,
            | 'style'
            | 'pointerEvents'
            | 'display'
            | 'children'
            | 'onLayout'
            | keyof import('react-native').GestureResponderHandlers
          > &
            import('@tamagui/web').ExtendBaseStackProps &
            import('@tamagui/web').WebOnlyPressEvents &
            import('@tamagui/web').TamaguiComponentPropsBaseBase & {
              style?: import('@tamagui/web').StyleProp<
                | import('react-native').ViewStyle
                | import('react').CSSProperties
                | (import('react').CSSProperties & import('react-native').ViewStyle)
              >;
            } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
            import('@tamagui/web').WithShorthands<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
            > &
            import('@tamagui/web').PseudoProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                >
            > &
            import('@tamagui/web').MediaProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                > &
                import('@tamagui/web').PseudoProps<
                  import('@tamagui/web').WithThemeValues<
                    import('@tamagui/web').StackStylePropsBase
                  > &
                    import('@tamagui/web').WithShorthands<
                      import('@tamagui/web').WithThemeValues<
                        import('@tamagui/web').StackStylePropsBase
                      >
                    >
                >
            > & {
              onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
              onStartShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderEnd?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderGrant?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderReject?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderMove?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderRelease?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderStart?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderTerminationRequest?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderTerminate?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onStartShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              elevationAndroid?: string | number | undefined;
              rel?: any;
              download?: any;
              dataSet?: Record<string, string | number | null | undefined> | undefined;
              onScrollShouldSetResponder?: unknown;
              onScrollShouldSetResponderCapture?: unknown;
              onSelectionChangeShouldSetResponder?: unknown;
              onSelectionChangeShouldSetResponderCapture?: unknown;
              href?: string | undefined;
              hrefAttrs?:
                | {
                    target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
                    rel?: string | undefined;
                    download?: boolean | undefined;
                  }
                | undefined;
            } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
            Omit<
              import('tamagui').StackProps,
              | 'transform'
              | 'style'
              | 'space'
              | 'zIndex'
              | 'maxWidth'
              | 'minWidth'
              | 'maxHeight'
              | 'minHeight'
              | 'userSelect'
              | 'cursor'
              | 'pointerEvents'
              | 'alignContent'
              | 'alignItems'
              | 'alignSelf'
              | 'bottom'
              | 'backgroundColor'
              | 'borderBottomColor'
              | 'borderBottomLeftRadius'
              | 'borderBottomRightRadius'
              | 'borderBottomWidth'
              | 'borderLeftColor'
              | 'borderLeftWidth'
              | 'borderColor'
              | 'borderRadius'
              | 'borderStyle'
              | 'borderRightWidth'
              | 'borderRightColor'
              | 'borderTopColor'
              | 'borderTopLeftRadius'
              | 'borderTopRightRadius'
              | 'borderTopWidth'
              | 'borderWidth'
              | 'display'
              | 'flex'
              | 'flexBasis'
              | 'flexDirection'
              | 'flexGrow'
              | 'flexShrink'
              | 'flexWrap'
              | 'height'
              | 'justifyContent'
              | 'left'
              | 'margin'
              | 'marginBottom'
              | 'marginLeft'
              | 'marginRight'
              | 'marginTop'
              | 'marginHorizontal'
              | 'marginVertical'
              | 'opacity'
              | 'overflow'
              | 'padding'
              | 'paddingBottom'
              | 'paddingLeft'
              | 'position'
              | 'paddingRight'
              | 'paddingTop'
              | 'paddingHorizontal'
              | 'paddingVertical'
              | 'right'
              | 'shadowColor'
              | 'shadowRadius'
              | 'shadowOffset'
              | 'shadowOpacity'
              | 'top'
              | 'width'
              | 'children'
              | 'onLayout'
              | 'onStartShouldSetResponder'
              | 'onMoveShouldSetResponder'
              | 'onResponderEnd'
              | 'onResponderGrant'
              | 'onResponderReject'
              | 'onResponderMove'
              | 'onResponderRelease'
              | 'onResponderStart'
              | 'onResponderTerminationRequest'
              | 'onResponderTerminate'
              | 'onStartShouldSetResponderCapture'
              | 'onMoveShouldSetResponderCapture'
              | 'hitSlop'
              | 'id'
              | 'removeClippedSubviews'
              | 'testID'
              | 'nativeID'
              | 'collapsable'
              | 'needsOffscreenAlphaCompositing'
              | 'renderToHardwareTextureAndroid'
              | 'focusable'
              | 'shouldRasterizeIOS'
              | 'isTVSelectable'
              | 'hasTVPreferredFocus'
              | 'tvParallaxProperties'
              | 'tvParallaxShiftDistanceX'
              | 'tvParallaxShiftDistanceY'
              | 'tvParallaxTiltAngle'
              | 'tvParallaxMagnification'
              | 'onTouchStart'
              | 'onTouchMove'
              | 'onTouchEnd'
              | 'onTouchCancel'
              | 'onTouchEndCapture'
              | 'onPointerEnter'
              | 'onPointerEnterCapture'
              | 'onPointerLeave'
              | 'onPointerLeaveCapture'
              | 'onPointerMove'
              | 'onPointerMoveCapture'
              | 'onPointerCancel'
              | 'onPointerCancelCapture'
              | 'onPointerDown'
              | 'onPointerDownCapture'
              | 'onPointerUp'
              | 'onPointerUpCapture'
              | 'accessible'
              | 'accessibilityActions'
              | 'accessibilityLabel'
              | 'aria-label'
              | 'accessibilityRole'
              | 'accessibilityState'
              | 'aria-busy'
              | 'aria-checked'
              | 'aria-disabled'
              | 'aria-expanded'
              | 'aria-selected'
              | 'aria-labelledby'
              | 'accessibilityHint'
              | 'accessibilityValue'
              | 'aria-valuemax'
              | 'aria-valuemin'
              | 'aria-valuenow'
              | 'aria-valuetext'
              | 'onAccessibilityAction'
              | 'importantForAccessibility'
              | 'aria-hidden'
              | 'aria-live'
              | 'aria-modal'
              | 'role'
              | 'accessibilityLiveRegion'
              | 'accessibilityLabelledBy'
              | 'accessibilityElementsHidden'
              | 'accessibilityViewIsModal'
              | 'onAccessibilityEscape'
              | 'onAccessibilityTap'
              | 'onMagicTap'
              | 'accessibilityIgnoresInvertColors'
              | 'accessibilityLanguage'
              | 'gap'
              | 'columnGap'
              | 'rowGap'
              | 'contain'
              | 'touchAction'
              | 'outlineColor'
              | 'outlineOffset'
              | 'outlineStyle'
              | 'outlineWidth'
              | 'spaceDirection'
              | 'separator'
              | 'animation'
              | 'animateOnly'
              | 'borderBlockColor'
              | 'borderBlockEndColor'
              | 'borderBlockStartColor'
              | 'borderBottomEndRadius'
              | 'borderBottomStartRadius'
              | 'borderCurve'
              | 'borderEndColor'
              | 'borderEndEndRadius'
              | 'borderEndStartRadius'
              | 'borderStartColor'
              | 'borderStartEndRadius'
              | 'borderStartStartRadius'
              | 'borderTopEndRadius'
              | 'borderTopStartRadius'
              | 'aspectRatio'
              | 'borderEndWidth'
              | 'borderStartWidth'
              | 'end'
              | 'marginEnd'
              | 'marginStart'
              | 'paddingEnd'
              | 'paddingStart'
              | 'start'
              | 'direction'
              | 'transformMatrix'
              | 'rotation'
              | 'scaleX'
              | 'scaleY'
              | 'translateX'
              | 'translateY'
              | `$${string}`
              | `$${number}`
              | `$theme-${string}`
              | `$theme-${number}`
              | 'ref'
              | 'tag'
              | 'x'
              | 'y'
              | 'perspective'
              | 'scale'
              | 'skewX'
              | 'skewY'
              | 'matrix'
              | 'rotate'
              | 'rotateY'
              | 'rotateX'
              | 'rotateZ'
              | 'theme'
              | 'group'
              | 'onFocus'
              | 'onPress'
              | 'onLongPress'
              | 'onPressIn'
              | 'onPressOut'
              | 'onHoverIn'
              | 'onHoverOut'
              | 'onMouseEnter'
              | 'onMouseLeave'
              | 'onMouseDown'
              | 'onMouseUp'
              | 'onBlur'
              | 'target'
              | 'asChild'
              | 'dangerouslySetInnerHTML'
              | 'debug'
              | 'disabled'
              | 'className'
              | 'themeShallow'
              | 'themeInverse'
              | 'untilMeasured'
              | 'componentName'
              | 'tabIndex'
              | 'disableOptimization'
              | 'forceStyle'
              | 'disableClassName'
              | 'onScroll'
              | 'hoverStyle'
              | 'pressStyle'
              | 'focusStyle'
              | 'exitStyle'
              | 'enterStyle'
              | 'rel'
              | 'download'
              | 'dataSet'
              | 'onScrollShouldSetResponder'
              | 'onScrollShouldSetResponderCapture'
              | 'onSelectionChangeShouldSetResponder'
              | 'onSelectionChangeShouldSetResponderCapture'
              | 'href'
              | 'hrefAttrs'
              | 'elevationAndroid'
              | 'key'
            > & {
              readonly fullscreen?: boolean | undefined;
              readonly elevation?: number | import('tamagui').SizeTokens | undefined;
            }
        >
      > &
      import('@tamagui/web').MediaProps<
        Partial<
          Omit<
            import('react-native').ViewProps,
            | 'style'
            | 'pointerEvents'
            | 'display'
            | 'children'
            | 'onLayout'
            | keyof import('react-native').GestureResponderHandlers
          > &
            import('@tamagui/web').ExtendBaseStackProps &
            import('@tamagui/web').WebOnlyPressEvents &
            import('@tamagui/web').TamaguiComponentPropsBaseBase & {
              style?: import('@tamagui/web').StyleProp<
                | import('react-native').ViewStyle
                | import('react').CSSProperties
                | (import('react').CSSProperties & import('react-native').ViewStyle)
              >;
            } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
            import('@tamagui/web').WithShorthands<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
            > &
            import('@tamagui/web').PseudoProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                >
            > &
            import('@tamagui/web').MediaProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                > &
                import('@tamagui/web').PseudoProps<
                  import('@tamagui/web').WithThemeValues<
                    import('@tamagui/web').StackStylePropsBase
                  > &
                    import('@tamagui/web').WithShorthands<
                      import('@tamagui/web').WithThemeValues<
                        import('@tamagui/web').StackStylePropsBase
                      >
                    >
                >
            > & {
              onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
              onStartShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderEnd?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderGrant?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderReject?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderMove?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderRelease?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderStart?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderTerminationRequest?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderTerminate?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onStartShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              elevationAndroid?: string | number | undefined;
              rel?: any;
              download?: any;
              dataSet?: Record<string, string | number | null | undefined> | undefined;
              onScrollShouldSetResponder?: unknown;
              onScrollShouldSetResponderCapture?: unknown;
              onSelectionChangeShouldSetResponder?: unknown;
              onSelectionChangeShouldSetResponderCapture?: unknown;
              href?: string | undefined;
              hrefAttrs?:
                | {
                    target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
                    rel?: string | undefined;
                    download?: boolean | undefined;
                  }
                | undefined;
            } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
            Omit<
              import('tamagui').StackProps,
              | 'transform'
              | 'style'
              | 'space'
              | 'zIndex'
              | 'maxWidth'
              | 'minWidth'
              | 'maxHeight'
              | 'minHeight'
              | 'userSelect'
              | 'cursor'
              | 'pointerEvents'
              | 'alignContent'
              | 'alignItems'
              | 'alignSelf'
              | 'bottom'
              | 'backgroundColor'
              | 'borderBottomColor'
              | 'borderBottomLeftRadius'
              | 'borderBottomRightRadius'
              | 'borderBottomWidth'
              | 'borderLeftColor'
              | 'borderLeftWidth'
              | 'borderColor'
              | 'borderRadius'
              | 'borderStyle'
              | 'borderRightWidth'
              | 'borderRightColor'
              | 'borderTopColor'
              | 'borderTopLeftRadius'
              | 'borderTopRightRadius'
              | 'borderTopWidth'
              | 'borderWidth'
              | 'display'
              | 'flex'
              | 'flexBasis'
              | 'flexDirection'
              | 'flexGrow'
              | 'flexShrink'
              | 'flexWrap'
              | 'height'
              | 'justifyContent'
              | 'left'
              | 'margin'
              | 'marginBottom'
              | 'marginLeft'
              | 'marginRight'
              | 'marginTop'
              | 'marginHorizontal'
              | 'marginVertical'
              | 'opacity'
              | 'overflow'
              | 'padding'
              | 'paddingBottom'
              | 'paddingLeft'
              | 'position'
              | 'paddingRight'
              | 'paddingTop'
              | 'paddingHorizontal'
              | 'paddingVertical'
              | 'right'
              | 'shadowColor'
              | 'shadowRadius'
              | 'shadowOffset'
              | 'shadowOpacity'
              | 'top'
              | 'width'
              | 'children'
              | 'onLayout'
              | 'onStartShouldSetResponder'
              | 'onMoveShouldSetResponder'
              | 'onResponderEnd'
              | 'onResponderGrant'
              | 'onResponderReject'
              | 'onResponderMove'
              | 'onResponderRelease'
              | 'onResponderStart'
              | 'onResponderTerminationRequest'
              | 'onResponderTerminate'
              | 'onStartShouldSetResponderCapture'
              | 'onMoveShouldSetResponderCapture'
              | 'hitSlop'
              | 'id'
              | 'removeClippedSubviews'
              | 'testID'
              | 'nativeID'
              | 'collapsable'
              | 'needsOffscreenAlphaCompositing'
              | 'renderToHardwareTextureAndroid'
              | 'focusable'
              | 'shouldRasterizeIOS'
              | 'isTVSelectable'
              | 'hasTVPreferredFocus'
              | 'tvParallaxProperties'
              | 'tvParallaxShiftDistanceX'
              | 'tvParallaxShiftDistanceY'
              | 'tvParallaxTiltAngle'
              | 'tvParallaxMagnification'
              | 'onTouchStart'
              | 'onTouchMove'
              | 'onTouchEnd'
              | 'onTouchCancel'
              | 'onTouchEndCapture'
              | 'onPointerEnter'
              | 'onPointerEnterCapture'
              | 'onPointerLeave'
              | 'onPointerLeaveCapture'
              | 'onPointerMove'
              | 'onPointerMoveCapture'
              | 'onPointerCancel'
              | 'onPointerCancelCapture'
              | 'onPointerDown'
              | 'onPointerDownCapture'
              | 'onPointerUp'
              | 'onPointerUpCapture'
              | 'accessible'
              | 'accessibilityActions'
              | 'accessibilityLabel'
              | 'aria-label'
              | 'accessibilityRole'
              | 'accessibilityState'
              | 'aria-busy'
              | 'aria-checked'
              | 'aria-disabled'
              | 'aria-expanded'
              | 'aria-selected'
              | 'aria-labelledby'
              | 'accessibilityHint'
              | 'accessibilityValue'
              | 'aria-valuemax'
              | 'aria-valuemin'
              | 'aria-valuenow'
              | 'aria-valuetext'
              | 'onAccessibilityAction'
              | 'importantForAccessibility'
              | 'aria-hidden'
              | 'aria-live'
              | 'aria-modal'
              | 'role'
              | 'accessibilityLiveRegion'
              | 'accessibilityLabelledBy'
              | 'accessibilityElementsHidden'
              | 'accessibilityViewIsModal'
              | 'onAccessibilityEscape'
              | 'onAccessibilityTap'
              | 'onMagicTap'
              | 'accessibilityIgnoresInvertColors'
              | 'accessibilityLanguage'
              | 'gap'
              | 'columnGap'
              | 'rowGap'
              | 'contain'
              | 'touchAction'
              | 'outlineColor'
              | 'outlineOffset'
              | 'outlineStyle'
              | 'outlineWidth'
              | 'spaceDirection'
              | 'separator'
              | 'animation'
              | 'animateOnly'
              | 'borderBlockColor'
              | 'borderBlockEndColor'
              | 'borderBlockStartColor'
              | 'borderBottomEndRadius'
              | 'borderBottomStartRadius'
              | 'borderCurve'
              | 'borderEndColor'
              | 'borderEndEndRadius'
              | 'borderEndStartRadius'
              | 'borderStartColor'
              | 'borderStartEndRadius'
              | 'borderStartStartRadius'
              | 'borderTopEndRadius'
              | 'borderTopStartRadius'
              | 'aspectRatio'
              | 'borderEndWidth'
              | 'borderStartWidth'
              | 'end'
              | 'marginEnd'
              | 'marginStart'
              | 'paddingEnd'
              | 'paddingStart'
              | 'start'
              | 'direction'
              | 'transformMatrix'
              | 'rotation'
              | 'scaleX'
              | 'scaleY'
              | 'translateX'
              | 'translateY'
              | `$${string}`
              | `$${number}`
              | `$theme-${string}`
              | `$theme-${number}`
              | 'ref'
              | 'tag'
              | 'x'
              | 'y'
              | 'perspective'
              | 'scale'
              | 'skewX'
              | 'skewY'
              | 'matrix'
              | 'rotate'
              | 'rotateY'
              | 'rotateX'
              | 'rotateZ'
              | 'theme'
              | 'group'
              | 'onFocus'
              | 'onPress'
              | 'onLongPress'
              | 'onPressIn'
              | 'onPressOut'
              | 'onHoverIn'
              | 'onHoverOut'
              | 'onMouseEnter'
              | 'onMouseLeave'
              | 'onMouseDown'
              | 'onMouseUp'
              | 'onBlur'
              | 'target'
              | 'asChild'
              | 'dangerouslySetInnerHTML'
              | 'debug'
              | 'disabled'
              | 'className'
              | 'themeShallow'
              | 'themeInverse'
              | 'untilMeasured'
              | 'componentName'
              | 'tabIndex'
              | 'disableOptimization'
              | 'forceStyle'
              | 'disableClassName'
              | 'onScroll'
              | 'hoverStyle'
              | 'pressStyle'
              | 'focusStyle'
              | 'exitStyle'
              | 'enterStyle'
              | 'rel'
              | 'download'
              | 'dataSet'
              | 'onScrollShouldSetResponder'
              | 'onScrollShouldSetResponderCapture'
              | 'onSelectionChangeShouldSetResponder'
              | 'onSelectionChangeShouldSetResponderCapture'
              | 'href'
              | 'hrefAttrs'
              | 'elevationAndroid'
              | 'key'
            > & {
              readonly fullscreen?: boolean | undefined;
              readonly elevation?: number | import('tamagui').SizeTokens | undefined;
            }
        >
      >)
  | (Omit<
      import('react-native').ViewProps,
      | 'style'
      | 'pointerEvents'
      | 'display'
      | 'children'
      | 'onLayout'
      | keyof import('react-native').GestureResponderHandlers
    > &
      import('@tamagui/web').ExtendBaseStackProps &
      import('@tamagui/web').WebOnlyPressEvents &
      import('@tamagui/web').TamaguiComponentPropsBaseBase & {
        style?: import('@tamagui/web').StyleProp<
          | import('react-native').ViewStyle
          | import('react').CSSProperties
          | (import('react').CSSProperties & import('react-native').ViewStyle)
        >;
      } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
      import('@tamagui/web').WithShorthands<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
      > &
      import('@tamagui/web').PseudoProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          >
      > &
      import('@tamagui/web').MediaProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          > &
          import('@tamagui/web').PseudoProps<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
              import('@tamagui/web').WithShorthands<
                import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
              >
          >
      > & {
        onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
        onStartShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderEnd?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderGrant?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderReject?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderMove?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderRelease?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderStart?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderTerminationRequest?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderTerminate?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onStartShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        elevationAndroid?: string | number | undefined;
        rel?: any;
        download?: any;
        dataSet?: Record<string, string | number | null | undefined> | undefined;
        onScrollShouldSetResponder?: unknown;
        onScrollShouldSetResponderCapture?: unknown;
        onSelectionChangeShouldSetResponder?: unknown;
        onSelectionChangeShouldSetResponderCapture?: unknown;
        href?: string | undefined;
        hrefAttrs?:
          | {
              target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
              rel?: string | undefined;
              download?: boolean | undefined;
            }
          | undefined;
      } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
      Omit<
        import('tamagui').StackProps,
        | 'transform'
        | 'style'
        | 'space'
        | 'zIndex'
        | 'maxWidth'
        | 'minWidth'
        | 'maxHeight'
        | 'minHeight'
        | 'userSelect'
        | 'cursor'
        | 'pointerEvents'
        | 'alignContent'
        | 'alignItems'
        | 'alignSelf'
        | 'bottom'
        | 'backgroundColor'
        | 'borderBottomColor'
        | 'borderBottomLeftRadius'
        | 'borderBottomRightRadius'
        | 'borderBottomWidth'
        | 'borderLeftColor'
        | 'borderLeftWidth'
        | 'borderColor'
        | 'borderRadius'
        | 'borderStyle'
        | 'borderRightWidth'
        | 'borderRightColor'
        | 'borderTopColor'
        | 'borderTopLeftRadius'
        | 'borderTopRightRadius'
        | 'borderTopWidth'
        | 'borderWidth'
        | 'display'
        | 'flex'
        | 'flexBasis'
        | 'flexDirection'
        | 'flexGrow'
        | 'flexShrink'
        | 'flexWrap'
        | 'height'
        | 'justifyContent'
        | 'left'
        | 'margin'
        | 'marginBottom'
        | 'marginLeft'
        | 'marginRight'
        | 'marginTop'
        | 'marginHorizontal'
        | 'marginVertical'
        | 'opacity'
        | 'overflow'
        | 'padding'
        | 'paddingBottom'
        | 'paddingLeft'
        | 'position'
        | 'paddingRight'
        | 'paddingTop'
        | 'paddingHorizontal'
        | 'paddingVertical'
        | 'right'
        | 'shadowColor'
        | 'shadowRadius'
        | 'shadowOffset'
        | 'shadowOpacity'
        | 'top'
        | 'width'
        | 'children'
        | 'onLayout'
        | 'onStartShouldSetResponder'
        | 'onMoveShouldSetResponder'
        | 'onResponderEnd'
        | 'onResponderGrant'
        | 'onResponderReject'
        | 'onResponderMove'
        | 'onResponderRelease'
        | 'onResponderStart'
        | 'onResponderTerminationRequest'
        | 'onResponderTerminate'
        | 'onStartShouldSetResponderCapture'
        | 'onMoveShouldSetResponderCapture'
        | 'hitSlop'
        | 'id'
        | 'removeClippedSubviews'
        | 'testID'
        | 'nativeID'
        | 'collapsable'
        | 'needsOffscreenAlphaCompositing'
        | 'renderToHardwareTextureAndroid'
        | 'focusable'
        | 'shouldRasterizeIOS'
        | 'isTVSelectable'
        | 'hasTVPreferredFocus'
        | 'tvParallaxProperties'
        | 'tvParallaxShiftDistanceX'
        | 'tvParallaxShiftDistanceY'
        | 'tvParallaxTiltAngle'
        | 'tvParallaxMagnification'
        | 'onTouchStart'
        | 'onTouchMove'
        | 'onTouchEnd'
        | 'onTouchCancel'
        | 'onTouchEndCapture'
        | 'onPointerEnter'
        | 'onPointerEnterCapture'
        | 'onPointerLeave'
        | 'onPointerLeaveCapture'
        | 'onPointerMove'
        | 'onPointerMoveCapture'
        | 'onPointerCancel'
        | 'onPointerCancelCapture'
        | 'onPointerDown'
        | 'onPointerDownCapture'
        | 'onPointerUp'
        | 'onPointerUpCapture'
        | 'accessible'
        | 'accessibilityActions'
        | 'accessibilityLabel'
        | 'aria-label'
        | 'accessibilityRole'
        | 'accessibilityState'
        | 'aria-busy'
        | 'aria-checked'
        | 'aria-disabled'
        | 'aria-expanded'
        | 'aria-selected'
        | 'aria-labelledby'
        | 'accessibilityHint'
        | 'accessibilityValue'
        | 'aria-valuemax'
        | 'aria-valuemin'
        | 'aria-valuenow'
        | 'aria-valuetext'
        | 'onAccessibilityAction'
        | 'importantForAccessibility'
        | 'aria-hidden'
        | 'aria-live'
        | 'aria-modal'
        | 'role'
        | 'accessibilityLiveRegion'
        | 'accessibilityLabelledBy'
        | 'accessibilityElementsHidden'
        | 'accessibilityViewIsModal'
        | 'onAccessibilityEscape'
        | 'onAccessibilityTap'
        | 'onMagicTap'
        | 'accessibilityIgnoresInvertColors'
        | 'accessibilityLanguage'
        | 'gap'
        | 'columnGap'
        | 'rowGap'
        | 'contain'
        | 'touchAction'
        | 'outlineColor'
        | 'outlineOffset'
        | 'outlineStyle'
        | 'outlineWidth'
        | 'spaceDirection'
        | 'separator'
        | 'animation'
        | 'animateOnly'
        | 'borderBlockColor'
        | 'borderBlockEndColor'
        | 'borderBlockStartColor'
        | 'borderBottomEndRadius'
        | 'borderBottomStartRadius'
        | 'borderCurve'
        | 'borderEndColor'
        | 'borderEndEndRadius'
        | 'borderEndStartRadius'
        | 'borderStartColor'
        | 'borderStartEndRadius'
        | 'borderStartStartRadius'
        | 'borderTopEndRadius'
        | 'borderTopStartRadius'
        | 'aspectRatio'
        | 'borderEndWidth'
        | 'borderStartWidth'
        | 'end'
        | 'marginEnd'
        | 'marginStart'
        | 'paddingEnd'
        | 'paddingStart'
        | 'start'
        | 'direction'
        | 'transformMatrix'
        | 'rotation'
        | 'scaleX'
        | 'scaleY'
        | 'translateX'
        | 'translateY'
        | `$${string}`
        | `$${number}`
        | `$theme-${string}`
        | `$theme-${number}`
        | 'ref'
        | 'tag'
        | 'x'
        | 'y'
        | 'perspective'
        | 'scale'
        | 'skewX'
        | 'skewY'
        | 'matrix'
        | 'rotate'
        | 'rotateY'
        | 'rotateX'
        | 'rotateZ'
        | 'theme'
        | 'group'
        | 'onFocus'
        | 'onPress'
        | 'onLongPress'
        | 'onPressIn'
        | 'onPressOut'
        | 'onHoverIn'
        | 'onHoverOut'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'onMouseDown'
        | 'onMouseUp'
        | 'onBlur'
        | 'target'
        | 'asChild'
        | 'dangerouslySetInnerHTML'
        | 'debug'
        | 'disabled'
        | 'className'
        | 'themeShallow'
        | 'themeInverse'
        | 'untilMeasured'
        | 'componentName'
        | 'tabIndex'
        | 'disableOptimization'
        | 'forceStyle'
        | 'disableClassName'
        | 'onScroll'
        | 'hoverStyle'
        | 'pressStyle'
        | 'focusStyle'
        | 'exitStyle'
        | 'enterStyle'
        | 'rel'
        | 'download'
        | 'dataSet'
        | 'onScrollShouldSetResponder'
        | 'onScrollShouldSetResponderCapture'
        | 'onSelectionChangeShouldSetResponder'
        | 'onSelectionChangeShouldSetResponderCapture'
        | 'href'
        | 'hrefAttrs'
        | 'elevationAndroid'
        | 'key'
      > & {
        readonly fullscreen?: boolean | undefined;
        readonly elevation?: number | import('tamagui').SizeTokens | undefined;
      } & import('@tamagui/web').PseudoProps<
        Partial<
          Omit<
            import('react-native').ViewProps,
            | 'style'
            | 'pointerEvents'
            | 'display'
            | 'children'
            | 'onLayout'
            | keyof import('react-native').GestureResponderHandlers
          > &
            import('@tamagui/web').ExtendBaseStackProps &
            import('@tamagui/web').WebOnlyPressEvents &
            import('@tamagui/web').TamaguiComponentPropsBaseBase & {
              style?: import('@tamagui/web').StyleProp<
                | import('react-native').ViewStyle
                | import('react').CSSProperties
                | (import('react').CSSProperties & import('react-native').ViewStyle)
              >;
            } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
            import('@tamagui/web').WithShorthands<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
            > &
            import('@tamagui/web').PseudoProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                >
            > &
            import('@tamagui/web').MediaProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                > &
                import('@tamagui/web').PseudoProps<
                  import('@tamagui/web').WithThemeValues<
                    import('@tamagui/web').StackStylePropsBase
                  > &
                    import('@tamagui/web').WithShorthands<
                      import('@tamagui/web').WithThemeValues<
                        import('@tamagui/web').StackStylePropsBase
                      >
                    >
                >
            > & {
              onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
              onStartShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderEnd?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderGrant?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderReject?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderMove?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderRelease?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderStart?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderTerminationRequest?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderTerminate?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onStartShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              elevationAndroid?: string | number | undefined;
              rel?: any;
              download?: any;
              dataSet?: Record<string, string | number | null | undefined> | undefined;
              onScrollShouldSetResponder?: unknown;
              onScrollShouldSetResponderCapture?: unknown;
              onSelectionChangeShouldSetResponder?: unknown;
              onSelectionChangeShouldSetResponderCapture?: unknown;
              href?: string | undefined;
              hrefAttrs?:
                | {
                    target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
                    rel?: string | undefined;
                    download?: boolean | undefined;
                  }
                | undefined;
            } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
            Omit<
              import('tamagui').StackProps,
              | 'transform'
              | 'style'
              | 'space'
              | 'zIndex'
              | 'maxWidth'
              | 'minWidth'
              | 'maxHeight'
              | 'minHeight'
              | 'userSelect'
              | 'cursor'
              | 'pointerEvents'
              | 'alignContent'
              | 'alignItems'
              | 'alignSelf'
              | 'bottom'
              | 'backgroundColor'
              | 'borderBottomColor'
              | 'borderBottomLeftRadius'
              | 'borderBottomRightRadius'
              | 'borderBottomWidth'
              | 'borderLeftColor'
              | 'borderLeftWidth'
              | 'borderColor'
              | 'borderRadius'
              | 'borderStyle'
              | 'borderRightWidth'
              | 'borderRightColor'
              | 'borderTopColor'
              | 'borderTopLeftRadius'
              | 'borderTopRightRadius'
              | 'borderTopWidth'
              | 'borderWidth'
              | 'display'
              | 'flex'
              | 'flexBasis'
              | 'flexDirection'
              | 'flexGrow'
              | 'flexShrink'
              | 'flexWrap'
              | 'height'
              | 'justifyContent'
              | 'left'
              | 'margin'
              | 'marginBottom'
              | 'marginLeft'
              | 'marginRight'
              | 'marginTop'
              | 'marginHorizontal'
              | 'marginVertical'
              | 'opacity'
              | 'overflow'
              | 'padding'
              | 'paddingBottom'
              | 'paddingLeft'
              | 'position'
              | 'paddingRight'
              | 'paddingTop'
              | 'paddingHorizontal'
              | 'paddingVertical'
              | 'right'
              | 'shadowColor'
              | 'shadowRadius'
              | 'shadowOffset'
              | 'shadowOpacity'
              | 'top'
              | 'width'
              | 'children'
              | 'onLayout'
              | 'onStartShouldSetResponder'
              | 'onMoveShouldSetResponder'
              | 'onResponderEnd'
              | 'onResponderGrant'
              | 'onResponderReject'
              | 'onResponderMove'
              | 'onResponderRelease'
              | 'onResponderStart'
              | 'onResponderTerminationRequest'
              | 'onResponderTerminate'
              | 'onStartShouldSetResponderCapture'
              | 'onMoveShouldSetResponderCapture'
              | 'hitSlop'
              | 'id'
              | 'removeClippedSubviews'
              | 'testID'
              | 'nativeID'
              | 'collapsable'
              | 'needsOffscreenAlphaCompositing'
              | 'renderToHardwareTextureAndroid'
              | 'focusable'
              | 'shouldRasterizeIOS'
              | 'isTVSelectable'
              | 'hasTVPreferredFocus'
              | 'tvParallaxProperties'
              | 'tvParallaxShiftDistanceX'
              | 'tvParallaxShiftDistanceY'
              | 'tvParallaxTiltAngle'
              | 'tvParallaxMagnification'
              | 'onTouchStart'
              | 'onTouchMove'
              | 'onTouchEnd'
              | 'onTouchCancel'
              | 'onTouchEndCapture'
              | 'onPointerEnter'
              | 'onPointerEnterCapture'
              | 'onPointerLeave'
              | 'onPointerLeaveCapture'
              | 'onPointerMove'
              | 'onPointerMoveCapture'
              | 'onPointerCancel'
              | 'onPointerCancelCapture'
              | 'onPointerDown'
              | 'onPointerDownCapture'
              | 'onPointerUp'
              | 'onPointerUpCapture'
              | 'accessible'
              | 'accessibilityActions'
              | 'accessibilityLabel'
              | 'aria-label'
              | 'accessibilityRole'
              | 'accessibilityState'
              | 'aria-busy'
              | 'aria-checked'
              | 'aria-disabled'
              | 'aria-expanded'
              | 'aria-selected'
              | 'aria-labelledby'
              | 'accessibilityHint'
              | 'accessibilityValue'
              | 'aria-valuemax'
              | 'aria-valuemin'
              | 'aria-valuenow'
              | 'aria-valuetext'
              | 'onAccessibilityAction'
              | 'importantForAccessibility'
              | 'aria-hidden'
              | 'aria-live'
              | 'aria-modal'
              | 'role'
              | 'accessibilityLiveRegion'
              | 'accessibilityLabelledBy'
              | 'accessibilityElementsHidden'
              | 'accessibilityViewIsModal'
              | 'onAccessibilityEscape'
              | 'onAccessibilityTap'
              | 'onMagicTap'
              | 'accessibilityIgnoresInvertColors'
              | 'accessibilityLanguage'
              | 'gap'
              | 'columnGap'
              | 'rowGap'
              | 'contain'
              | 'touchAction'
              | 'outlineColor'
              | 'outlineOffset'
              | 'outlineStyle'
              | 'outlineWidth'
              | 'spaceDirection'
              | 'separator'
              | 'animation'
              | 'animateOnly'
              | 'borderBlockColor'
              | 'borderBlockEndColor'
              | 'borderBlockStartColor'
              | 'borderBottomEndRadius'
              | 'borderBottomStartRadius'
              | 'borderCurve'
              | 'borderEndColor'
              | 'borderEndEndRadius'
              | 'borderEndStartRadius'
              | 'borderStartColor'
              | 'borderStartEndRadius'
              | 'borderStartStartRadius'
              | 'borderTopEndRadius'
              | 'borderTopStartRadius'
              | 'aspectRatio'
              | 'borderEndWidth'
              | 'borderStartWidth'
              | 'end'
              | 'marginEnd'
              | 'marginStart'
              | 'paddingEnd'
              | 'paddingStart'
              | 'start'
              | 'direction'
              | 'transformMatrix'
              | 'rotation'
              | 'scaleX'
              | 'scaleY'
              | 'translateX'
              | 'translateY'
              | `$${string}`
              | `$${number}`
              | `$theme-${string}`
              | `$theme-${number}`
              | 'ref'
              | 'tag'
              | 'x'
              | 'y'
              | 'perspective'
              | 'scale'
              | 'skewX'
              | 'skewY'
              | 'matrix'
              | 'rotate'
              | 'rotateY'
              | 'rotateX'
              | 'rotateZ'
              | 'theme'
              | 'group'
              | 'onFocus'
              | 'onPress'
              | 'onLongPress'
              | 'onPressIn'
              | 'onPressOut'
              | 'onHoverIn'
              | 'onHoverOut'
              | 'onMouseEnter'
              | 'onMouseLeave'
              | 'onMouseDown'
              | 'onMouseUp'
              | 'onBlur'
              | 'target'
              | 'asChild'
              | 'dangerouslySetInnerHTML'
              | 'debug'
              | 'disabled'
              | 'className'
              | 'themeShallow'
              | 'themeInverse'
              | 'untilMeasured'
              | 'componentName'
              | 'tabIndex'
              | 'disableOptimization'
              | 'forceStyle'
              | 'disableClassName'
              | 'onScroll'
              | 'hoverStyle'
              | 'pressStyle'
              | 'focusStyle'
              | 'exitStyle'
              | 'enterStyle'
              | 'rel'
              | 'download'
              | 'dataSet'
              | 'onScrollShouldSetResponder'
              | 'onScrollShouldSetResponderCapture'
              | 'onSelectionChangeShouldSetResponder'
              | 'onSelectionChangeShouldSetResponderCapture'
              | 'href'
              | 'hrefAttrs'
              | 'elevationAndroid'
              | 'key'
            > & {
              readonly fullscreen?: boolean | undefined;
              readonly elevation?: number | import('tamagui').SizeTokens | undefined;
            }
        >
      > &
      import('@tamagui/web').MediaProps<
        Partial<
          Omit<
            import('react-native').ViewProps,
            | 'style'
            | 'pointerEvents'
            | 'display'
            | 'children'
            | 'onLayout'
            | keyof import('react-native').GestureResponderHandlers
          > &
            import('@tamagui/web').ExtendBaseStackProps &
            import('@tamagui/web').WebOnlyPressEvents &
            import('@tamagui/web').TamaguiComponentPropsBaseBase & {
              style?: import('@tamagui/web').StyleProp<
                | import('react-native').ViewStyle
                | import('react').CSSProperties
                | (import('react').CSSProperties & import('react-native').ViewStyle)
              >;
            } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
            import('@tamagui/web').WithShorthands<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
            > &
            import('@tamagui/web').PseudoProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                >
            > &
            import('@tamagui/web').MediaProps<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
                import('@tamagui/web').WithShorthands<
                  import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
                > &
                import('@tamagui/web').PseudoProps<
                  import('@tamagui/web').WithThemeValues<
                    import('@tamagui/web').StackStylePropsBase
                  > &
                    import('@tamagui/web').WithShorthands<
                      import('@tamagui/web').WithThemeValues<
                        import('@tamagui/web').StackStylePropsBase
                      >
                    >
                >
            > & {
              onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
              onStartShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponder?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderEnd?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderGrant?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderReject?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderMove?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderRelease?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderStart?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onResponderTerminationRequest?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onResponderTerminate?:
                | ((event: import('react-native').GestureResponderEvent) => void)
                | undefined;
              onStartShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              onMoveShouldSetResponderCapture?:
                | ((event: import('react-native').GestureResponderEvent) => boolean)
                | undefined;
              elevationAndroid?: string | number | undefined;
              rel?: any;
              download?: any;
              dataSet?: Record<string, string | number | null | undefined> | undefined;
              onScrollShouldSetResponder?: unknown;
              onScrollShouldSetResponderCapture?: unknown;
              onSelectionChangeShouldSetResponder?: unknown;
              onSelectionChangeShouldSetResponderCapture?: unknown;
              href?: string | undefined;
              hrefAttrs?:
                | {
                    target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
                    rel?: string | undefined;
                    download?: boolean | undefined;
                  }
                | undefined;
            } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
            Omit<
              import('tamagui').StackProps,
              | 'transform'
              | 'style'
              | 'space'
              | 'zIndex'
              | 'maxWidth'
              | 'minWidth'
              | 'maxHeight'
              | 'minHeight'
              | 'userSelect'
              | 'cursor'
              | 'pointerEvents'
              | 'alignContent'
              | 'alignItems'
              | 'alignSelf'
              | 'bottom'
              | 'backgroundColor'
              | 'borderBottomColor'
              | 'borderBottomLeftRadius'
              | 'borderBottomRightRadius'
              | 'borderBottomWidth'
              | 'borderLeftColor'
              | 'borderLeftWidth'
              | 'borderColor'
              | 'borderRadius'
              | 'borderStyle'
              | 'borderRightWidth'
              | 'borderRightColor'
              | 'borderTopColor'
              | 'borderTopLeftRadius'
              | 'borderTopRightRadius'
              | 'borderTopWidth'
              | 'borderWidth'
              | 'display'
              | 'flex'
              | 'flexBasis'
              | 'flexDirection'
              | 'flexGrow'
              | 'flexShrink'
              | 'flexWrap'
              | 'height'
              | 'justifyContent'
              | 'left'
              | 'margin'
              | 'marginBottom'
              | 'marginLeft'
              | 'marginRight'
              | 'marginTop'
              | 'marginHorizontal'
              | 'marginVertical'
              | 'opacity'
              | 'overflow'
              | 'padding'
              | 'paddingBottom'
              | 'paddingLeft'
              | 'position'
              | 'paddingRight'
              | 'paddingTop'
              | 'paddingHorizontal'
              | 'paddingVertical'
              | 'right'
              | 'shadowColor'
              | 'shadowRadius'
              | 'shadowOffset'
              | 'shadowOpacity'
              | 'top'
              | 'width'
              | 'children'
              | 'onLayout'
              | 'onStartShouldSetResponder'
              | 'onMoveShouldSetResponder'
              | 'onResponderEnd'
              | 'onResponderGrant'
              | 'onResponderReject'
              | 'onResponderMove'
              | 'onResponderRelease'
              | 'onResponderStart'
              | 'onResponderTerminationRequest'
              | 'onResponderTerminate'
              | 'onStartShouldSetResponderCapture'
              | 'onMoveShouldSetResponderCapture'
              | 'hitSlop'
              | 'id'
              | 'removeClippedSubviews'
              | 'testID'
              | 'nativeID'
              | 'collapsable'
              | 'needsOffscreenAlphaCompositing'
              | 'renderToHardwareTextureAndroid'
              | 'focusable'
              | 'shouldRasterizeIOS'
              | 'isTVSelectable'
              | 'hasTVPreferredFocus'
              | 'tvParallaxProperties'
              | 'tvParallaxShiftDistanceX'
              | 'tvParallaxShiftDistanceY'
              | 'tvParallaxTiltAngle'
              | 'tvParallaxMagnification'
              | 'onTouchStart'
              | 'onTouchMove'
              | 'onTouchEnd'
              | 'onTouchCancel'
              | 'onTouchEndCapture'
              | 'onPointerEnter'
              | 'onPointerEnterCapture'
              | 'onPointerLeave'
              | 'onPointerLeaveCapture'
              | 'onPointerMove'
              | 'onPointerMoveCapture'
              | 'onPointerCancel'
              | 'onPointerCancelCapture'
              | 'onPointerDown'
              | 'onPointerDownCapture'
              | 'onPointerUp'
              | 'onPointerUpCapture'
              | 'accessible'
              | 'accessibilityActions'
              | 'accessibilityLabel'
              | 'aria-label'
              | 'accessibilityRole'
              | 'accessibilityState'
              | 'aria-busy'
              | 'aria-checked'
              | 'aria-disabled'
              | 'aria-expanded'
              | 'aria-selected'
              | 'aria-labelledby'
              | 'accessibilityHint'
              | 'accessibilityValue'
              | 'aria-valuemax'
              | 'aria-valuemin'
              | 'aria-valuenow'
              | 'aria-valuetext'
              | 'onAccessibilityAction'
              | 'importantForAccessibility'
              | 'aria-hidden'
              | 'aria-live'
              | 'aria-modal'
              | 'role'
              | 'accessibilityLiveRegion'
              | 'accessibilityLabelledBy'
              | 'accessibilityElementsHidden'
              | 'accessibilityViewIsModal'
              | 'onAccessibilityEscape'
              | 'onAccessibilityTap'
              | 'onMagicTap'
              | 'accessibilityIgnoresInvertColors'
              | 'accessibilityLanguage'
              | 'gap'
              | 'columnGap'
              | 'rowGap'
              | 'contain'
              | 'touchAction'
              | 'outlineColor'
              | 'outlineOffset'
              | 'outlineStyle'
              | 'outlineWidth'
              | 'spaceDirection'
              | 'separator'
              | 'animation'
              | 'animateOnly'
              | 'borderBlockColor'
              | 'borderBlockEndColor'
              | 'borderBlockStartColor'
              | 'borderBottomEndRadius'
              | 'borderBottomStartRadius'
              | 'borderCurve'
              | 'borderEndColor'
              | 'borderEndEndRadius'
              | 'borderEndStartRadius'
              | 'borderStartColor'
              | 'borderStartEndRadius'
              | 'borderStartStartRadius'
              | 'borderTopEndRadius'
              | 'borderTopStartRadius'
              | 'aspectRatio'
              | 'borderEndWidth'
              | 'borderStartWidth'
              | 'end'
              | 'marginEnd'
              | 'marginStart'
              | 'paddingEnd'
              | 'paddingStart'
              | 'start'
              | 'direction'
              | 'transformMatrix'
              | 'rotation'
              | 'scaleX'
              | 'scaleY'
              | 'translateX'
              | 'translateY'
              | `$${string}`
              | `$${number}`
              | `$theme-${string}`
              | `$theme-${number}`
              | 'ref'
              | 'tag'
              | 'x'
              | 'y'
              | 'perspective'
              | 'scale'
              | 'skewX'
              | 'skewY'
              | 'matrix'
              | 'rotate'
              | 'rotateY'
              | 'rotateX'
              | 'rotateZ'
              | 'theme'
              | 'group'
              | 'onFocus'
              | 'onPress'
              | 'onLongPress'
              | 'onPressIn'
              | 'onPressOut'
              | 'onHoverIn'
              | 'onHoverOut'
              | 'onMouseEnter'
              | 'onMouseLeave'
              | 'onMouseDown'
              | 'onMouseUp'
              | 'onBlur'
              | 'target'
              | 'asChild'
              | 'dangerouslySetInnerHTML'
              | 'debug'
              | 'disabled'
              | 'className'
              | 'themeShallow'
              | 'themeInverse'
              | 'untilMeasured'
              | 'componentName'
              | 'tabIndex'
              | 'disableOptimization'
              | 'forceStyle'
              | 'disableClassName'
              | 'onScroll'
              | 'hoverStyle'
              | 'pressStyle'
              | 'focusStyle'
              | 'exitStyle'
              | 'enterStyle'
              | 'rel'
              | 'download'
              | 'dataSet'
              | 'onScrollShouldSetResponder'
              | 'onScrollShouldSetResponderCapture'
              | 'onSelectionChangeShouldSetResponder'
              | 'onSelectionChangeShouldSetResponderCapture'
              | 'href'
              | 'hrefAttrs'
              | 'elevationAndroid'
              | 'key'
            > & {
              readonly fullscreen?: boolean | undefined;
              readonly elevation?: number | import('tamagui').SizeTokens | undefined;
            }
        >
      >),
  import('tamagui').TamaguiElement,
  Omit<
    import('react-native').ViewProps,
    | 'style'
    | 'pointerEvents'
    | 'display'
    | 'children'
    | 'onLayout'
    | keyof import('react-native').GestureResponderHandlers
  > &
    import('@tamagui/web').ExtendBaseStackProps &
    import('@tamagui/web').WebOnlyPressEvents &
    import('@tamagui/web').TamaguiComponentPropsBaseBase & {
      style?: import('@tamagui/web').StyleProp<
        | import('react-native').ViewStyle
        | import('react').CSSProperties
        | (import('react').CSSProperties & import('react-native').ViewStyle)
      >;
    } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
    import('@tamagui/web').WithShorthands<
      import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
    > &
    import('@tamagui/web').PseudoProps<
      import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
        import('@tamagui/web').WithShorthands<
          import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
        >
    > &
    import('@tamagui/web').MediaProps<
      import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
        import('@tamagui/web').WithShorthands<
          import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
        > &
        import('@tamagui/web').PseudoProps<
          import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
            import('@tamagui/web').WithShorthands<
              import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
            >
        >
    > & {
      onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
      onStartShouldSetResponder?:
        | ((event: import('react-native').GestureResponderEvent) => boolean)
        | undefined;
      onMoveShouldSetResponder?:
        | ((event: import('react-native').GestureResponderEvent) => boolean)
        | undefined;
      onResponderEnd?: ((event: import('react-native').GestureResponderEvent) => void) | undefined;
      onResponderGrant?:
        | ((event: import('react-native').GestureResponderEvent) => void)
        | undefined;
      onResponderReject?:
        | ((event: import('react-native').GestureResponderEvent) => void)
        | undefined;
      onResponderMove?: ((event: import('react-native').GestureResponderEvent) => void) | undefined;
      onResponderRelease?:
        | ((event: import('react-native').GestureResponderEvent) => void)
        | undefined;
      onResponderStart?:
        | ((event: import('react-native').GestureResponderEvent) => void)
        | undefined;
      onResponderTerminationRequest?:
        | ((event: import('react-native').GestureResponderEvent) => boolean)
        | undefined;
      onResponderTerminate?:
        | ((event: import('react-native').GestureResponderEvent) => void)
        | undefined;
      onStartShouldSetResponderCapture?:
        | ((event: import('react-native').GestureResponderEvent) => boolean)
        | undefined;
      onMoveShouldSetResponderCapture?:
        | ((event: import('react-native').GestureResponderEvent) => boolean)
        | undefined;
      elevationAndroid?: string | number | undefined;
      rel?: any;
      download?: any;
      dataSet?: Record<string, string | number | null | undefined> | undefined;
      onScrollShouldSetResponder?: unknown;
      onScrollShouldSetResponderCapture?: unknown;
      onSelectionChangeShouldSetResponder?: unknown;
      onSelectionChangeShouldSetResponderCapture?: unknown;
      href?: string | undefined;
      hrefAttrs?:
        | {
            target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
            rel?: string | undefined;
            download?: boolean | undefined;
          }
        | undefined;
    } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
    Omit<
      import('tamagui').StackProps,
      | 'transform'
      | 'style'
      | 'space'
      | 'zIndex'
      | 'maxWidth'
      | 'minWidth'
      | 'maxHeight'
      | 'minHeight'
      | 'userSelect'
      | 'cursor'
      | 'pointerEvents'
      | 'alignContent'
      | 'alignItems'
      | 'alignSelf'
      | 'bottom'
      | 'backgroundColor'
      | 'borderBottomColor'
      | 'borderBottomLeftRadius'
      | 'borderBottomRightRadius'
      | 'borderBottomWidth'
      | 'borderLeftColor'
      | 'borderLeftWidth'
      | 'borderColor'
      | 'borderRadius'
      | 'borderStyle'
      | 'borderRightWidth'
      | 'borderRightColor'
      | 'borderTopColor'
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'borderTopWidth'
      | 'borderWidth'
      | 'display'
      | 'flex'
      | 'flexBasis'
      | 'flexDirection'
      | 'flexGrow'
      | 'flexShrink'
      | 'flexWrap'
      | 'height'
      | 'justifyContent'
      | 'left'
      | 'margin'
      | 'marginBottom'
      | 'marginLeft'
      | 'marginRight'
      | 'marginTop'
      | 'marginHorizontal'
      | 'marginVertical'
      | 'opacity'
      | 'overflow'
      | 'padding'
      | 'paddingBottom'
      | 'paddingLeft'
      | 'position'
      | 'paddingRight'
      | 'paddingTop'
      | 'paddingHorizontal'
      | 'paddingVertical'
      | 'right'
      | 'shadowColor'
      | 'shadowRadius'
      | 'shadowOffset'
      | 'shadowOpacity'
      | 'top'
      | 'width'
      | 'children'
      | 'onLayout'
      | 'onStartShouldSetResponder'
      | 'onMoveShouldSetResponder'
      | 'onResponderEnd'
      | 'onResponderGrant'
      | 'onResponderReject'
      | 'onResponderMove'
      | 'onResponderRelease'
      | 'onResponderStart'
      | 'onResponderTerminationRequest'
      | 'onResponderTerminate'
      | 'onStartShouldSetResponderCapture'
      | 'onMoveShouldSetResponderCapture'
      | 'hitSlop'
      | 'id'
      | 'removeClippedSubviews'
      | 'testID'
      | 'nativeID'
      | 'collapsable'
      | 'needsOffscreenAlphaCompositing'
      | 'renderToHardwareTextureAndroid'
      | 'focusable'
      | 'shouldRasterizeIOS'
      | 'isTVSelectable'
      | 'hasTVPreferredFocus'
      | 'tvParallaxProperties'
      | 'tvParallaxShiftDistanceX'
      | 'tvParallaxShiftDistanceY'
      | 'tvParallaxTiltAngle'
      | 'tvParallaxMagnification'
      | 'onTouchStart'
      | 'onTouchMove'
      | 'onTouchEnd'
      | 'onTouchCancel'
      | 'onTouchEndCapture'
      | 'onPointerEnter'
      | 'onPointerEnterCapture'
      | 'onPointerLeave'
      | 'onPointerLeaveCapture'
      | 'onPointerMove'
      | 'onPointerMoveCapture'
      | 'onPointerCancel'
      | 'onPointerCancelCapture'
      | 'onPointerDown'
      | 'onPointerDownCapture'
      | 'onPointerUp'
      | 'onPointerUpCapture'
      | 'accessible'
      | 'accessibilityActions'
      | 'accessibilityLabel'
      | 'aria-label'
      | 'accessibilityRole'
      | 'accessibilityState'
      | 'aria-busy'
      | 'aria-checked'
      | 'aria-disabled'
      | 'aria-expanded'
      | 'aria-selected'
      | 'aria-labelledby'
      | 'accessibilityHint'
      | 'accessibilityValue'
      | 'aria-valuemax'
      | 'aria-valuemin'
      | 'aria-valuenow'
      | 'aria-valuetext'
      | 'onAccessibilityAction'
      | 'importantForAccessibility'
      | 'aria-hidden'
      | 'aria-live'
      | 'aria-modal'
      | 'role'
      | 'accessibilityLiveRegion'
      | 'accessibilityLabelledBy'
      | 'accessibilityElementsHidden'
      | 'accessibilityViewIsModal'
      | 'onAccessibilityEscape'
      | 'onAccessibilityTap'
      | 'onMagicTap'
      | 'accessibilityIgnoresInvertColors'
      | 'accessibilityLanguage'
      | 'gap'
      | 'columnGap'
      | 'rowGap'
      | 'contain'
      | 'touchAction'
      | 'outlineColor'
      | 'outlineOffset'
      | 'outlineStyle'
      | 'outlineWidth'
      | 'spaceDirection'
      | 'separator'
      | 'animation'
      | 'animateOnly'
      | 'borderBlockColor'
      | 'borderBlockEndColor'
      | 'borderBlockStartColor'
      | 'borderBottomEndRadius'
      | 'borderBottomStartRadius'
      | 'borderCurve'
      | 'borderEndColor'
      | 'borderEndEndRadius'
      | 'borderEndStartRadius'
      | 'borderStartColor'
      | 'borderStartEndRadius'
      | 'borderStartStartRadius'
      | 'borderTopEndRadius'
      | 'borderTopStartRadius'
      | 'aspectRatio'
      | 'borderEndWidth'
      | 'borderStartWidth'
      | 'end'
      | 'marginEnd'
      | 'marginStart'
      | 'paddingEnd'
      | 'paddingStart'
      | 'start'
      | 'direction'
      | 'transformMatrix'
      | 'rotation'
      | 'scaleX'
      | 'scaleY'
      | 'translateX'
      | 'translateY'
      | `$${string}`
      | `$${number}`
      | `$theme-${string}`
      | `$theme-${number}`
      | 'ref'
      | 'tag'
      | 'x'
      | 'y'
      | 'perspective'
      | 'scale'
      | 'skewX'
      | 'skewY'
      | 'matrix'
      | 'rotate'
      | 'rotateY'
      | 'rotateX'
      | 'rotateZ'
      | 'theme'
      | 'group'
      | 'onFocus'
      | 'onPress'
      | 'onLongPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onHoverIn'
      | 'onHoverOut'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onMouseDown'
      | 'onMouseUp'
      | 'onBlur'
      | 'target'
      | 'asChild'
      | 'dangerouslySetInnerHTML'
      | 'debug'
      | 'disabled'
      | 'className'
      | 'themeShallow'
      | 'themeInverse'
      | 'untilMeasured'
      | 'componentName'
      | 'tabIndex'
      | 'disableOptimization'
      | 'forceStyle'
      | 'disableClassName'
      | 'onScroll'
      | 'hoverStyle'
      | 'pressStyle'
      | 'focusStyle'
      | 'exitStyle'
      | 'enterStyle'
      | 'rel'
      | 'download'
      | 'dataSet'
      | 'onScrollShouldSetResponder'
      | 'onScrollShouldSetResponderCapture'
      | 'onSelectionChangeShouldSetResponder'
      | 'onSelectionChangeShouldSetResponderCapture'
      | 'href'
      | 'hrefAttrs'
      | 'elevationAndroid'
      | 'key'
    >,
  {
    readonly fullscreen?: boolean | undefined;
    readonly elevation?: number | import('tamagui').SizeTokens | undefined;
  },
  {
    displayName: string | undefined;
    __baseProps: Omit<
      import('react-native').ViewProps,
      | 'style'
      | 'pointerEvents'
      | 'display'
      | 'children'
      | 'onLayout'
      | keyof import('react-native').GestureResponderHandlers
    > &
      import('@tamagui/web').ExtendBaseStackProps &
      import('@tamagui/web').WebOnlyPressEvents &
      import('@tamagui/web').TamaguiComponentPropsBaseBase & {
        style?: import('@tamagui/web').StyleProp<
          | import('react-native').ViewStyle
          | import('react').CSSProperties
          | (import('react').CSSProperties & import('react-native').ViewStyle)
        >;
      } & import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
      import('@tamagui/web').WithShorthands<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
      > & {
        onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
        onStartShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderEnd?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderGrant?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderReject?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderMove?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderRelease?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderStart?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderTerminationRequest?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderTerminate?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onStartShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        elevationAndroid?: string | number | undefined;
        rel?: any;
        download?: any;
        dataSet?: Record<string, string | number | null | undefined> | undefined;
        onScrollShouldSetResponder?: unknown;
        onScrollShouldSetResponderCapture?: unknown;
        onSelectionChangeShouldSetResponder?: unknown;
        onSelectionChangeShouldSetResponderCapture?: unknown;
        href?: string | undefined;
        hrefAttrs?:
          | {
              target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
              rel?: string | undefined;
              download?: boolean | undefined;
            }
          | undefined;
      } & {
        style?: import('@tamagui/web').StyleProp<
          | import('react-native').ViewStyle
          | import('react').CSSProperties
          | (import('react').CSSProperties & import('react-native').ViewStyle)
        >;
      } & import('@tamagui/web').PseudoProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          >
      > &
      import('@tamagui/web').MediaProps<
        import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
          import('@tamagui/web').WithShorthands<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
          > &
          import('@tamagui/web').PseudoProps<
            import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase> &
              import('@tamagui/web').WithShorthands<
                import('@tamagui/web').WithThemeValues<import('@tamagui/web').StackStylePropsBase>
              >
          >
      > & {
        onLayout?: ((event: import('react-native').LayoutChangeEvent) => void) | undefined;
        onStartShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponder?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderEnd?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderGrant?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderReject?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderMove?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderRelease?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderStart?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onResponderTerminationRequest?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onResponderTerminate?:
          | ((event: import('react-native').GestureResponderEvent) => void)
          | undefined;
        onStartShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        onMoveShouldSetResponderCapture?:
          | ((event: import('react-native').GestureResponderEvent) => boolean)
          | undefined;
        elevationAndroid?: string | number | undefined;
        rel?: any;
        download?: any;
        dataSet?: Record<string, string | number | null | undefined> | undefined;
        onScrollShouldSetResponder?: unknown;
        onScrollShouldSetResponderCapture?: unknown;
        onSelectionChangeShouldSetResponder?: unknown;
        onSelectionChangeShouldSetResponderCapture?: unknown;
        href?: string | undefined;
        hrefAttrs?:
          | {
              target?: 'top' | '_blank' | '_self' | '_top' | 'blank' | 'self' | undefined;
              rel?: string | undefined;
              download?: boolean | undefined;
            }
          | undefined;
      } & import('react').RefAttributes<import('tamagui').TamaguiElement> &
      Omit<
        import('tamagui').StackProps,
        | 'transform'
        | 'style'
        | 'space'
        | 'zIndex'
        | 'maxWidth'
        | 'minWidth'
        | 'maxHeight'
        | 'minHeight'
        | 'userSelect'
        | 'cursor'
        | 'pointerEvents'
        | 'alignContent'
        | 'alignItems'
        | 'alignSelf'
        | 'bottom'
        | 'backgroundColor'
        | 'borderBottomColor'
        | 'borderBottomLeftRadius'
        | 'borderBottomRightRadius'
        | 'borderBottomWidth'
        | 'borderLeftColor'
        | 'borderLeftWidth'
        | 'borderColor'
        | 'borderRadius'
        | 'borderStyle'
        | 'borderRightWidth'
        | 'borderRightColor'
        | 'borderTopColor'
        | 'borderTopLeftRadius'
        | 'borderTopRightRadius'
        | 'borderTopWidth'
        | 'borderWidth'
        | 'display'
        | 'flex'
        | 'flexBasis'
        | 'flexDirection'
        | 'flexGrow'
        | 'flexShrink'
        | 'flexWrap'
        | 'height'
        | 'justifyContent'
        | 'left'
        | 'margin'
        | 'marginBottom'
        | 'marginLeft'
        | 'marginRight'
        | 'marginTop'
        | 'marginHorizontal'
        | 'marginVertical'
        | 'opacity'
        | 'overflow'
        | 'padding'
        | 'paddingBottom'
        | 'paddingLeft'
        | 'position'
        | 'paddingRight'
        | 'paddingTop'
        | 'paddingHorizontal'
        | 'paddingVertical'
        | 'right'
        | 'shadowColor'
        | 'shadowRadius'
        | 'shadowOffset'
        | 'shadowOpacity'
        | 'top'
        | 'width'
        | 'children'
        | 'onLayout'
        | 'onStartShouldSetResponder'
        | 'onMoveShouldSetResponder'
        | 'onResponderEnd'
        | 'onResponderGrant'
        | 'onResponderReject'
        | 'onResponderMove'
        | 'onResponderRelease'
        | 'onResponderStart'
        | 'onResponderTerminationRequest'
        | 'onResponderTerminate'
        | 'onStartShouldSetResponderCapture'
        | 'onMoveShouldSetResponderCapture'
        | 'hitSlop'
        | 'id'
        | 'removeClippedSubviews'
        | 'testID'
        | 'nativeID'
        | 'collapsable'
        | 'needsOffscreenAlphaCompositing'
        | 'renderToHardwareTextureAndroid'
        | 'focusable'
        | 'shouldRasterizeIOS'
        | 'isTVSelectable'
        | 'hasTVPreferredFocus'
        | 'tvParallaxProperties'
        | 'tvParallaxShiftDistanceX'
        | 'tvParallaxShiftDistanceY'
        | 'tvParallaxTiltAngle'
        | 'tvParallaxMagnification'
        | 'onTouchStart'
        | 'onTouchMove'
        | 'onTouchEnd'
        | 'onTouchCancel'
        | 'onTouchEndCapture'
        | 'onPointerEnter'
        | 'onPointerEnterCapture'
        | 'onPointerLeave'
        | 'onPointerLeaveCapture'
        | 'onPointerMove'
        | 'onPointerMoveCapture'
        | 'onPointerCancel'
        | 'onPointerCancelCapture'
        | 'onPointerDown'
        | 'onPointerDownCapture'
        | 'onPointerUp'
        | 'onPointerUpCapture'
        | 'accessible'
        | 'accessibilityActions'
        | 'accessibilityLabel'
        | 'aria-label'
        | 'accessibilityRole'
        | 'accessibilityState'
        | 'aria-busy'
        | 'aria-checked'
        | 'aria-disabled'
        | 'aria-expanded'
        | 'aria-selected'
        | 'aria-labelledby'
        | 'accessibilityHint'
        | 'accessibilityValue'
        | 'aria-valuemax'
        | 'aria-valuemin'
        | 'aria-valuenow'
        | 'aria-valuetext'
        | 'onAccessibilityAction'
        | 'importantForAccessibility'
        | 'aria-hidden'
        | 'aria-live'
        | 'aria-modal'
        | 'role'
        | 'accessibilityLiveRegion'
        | 'accessibilityLabelledBy'
        | 'accessibilityElementsHidden'
        | 'accessibilityViewIsModal'
        | 'onAccessibilityEscape'
        | 'onAccessibilityTap'
        | 'onMagicTap'
        | 'accessibilityIgnoresInvertColors'
        | 'accessibilityLanguage'
        | 'gap'
        | 'columnGap'
        | 'rowGap'
        | 'contain'
        | 'touchAction'
        | 'outlineColor'
        | 'outlineOffset'
        | 'outlineStyle'
        | 'outlineWidth'
        | 'spaceDirection'
        | 'separator'
        | 'animation'
        | 'animateOnly'
        | 'borderBlockColor'
        | 'borderBlockEndColor'
        | 'borderBlockStartColor'
        | 'borderBottomEndRadius'
        | 'borderBottomStartRadius'
        | 'borderCurve'
        | 'borderEndColor'
        | 'borderEndEndRadius'
        | 'borderEndStartRadius'
        | 'borderStartColor'
        | 'borderStartEndRadius'
        | 'borderStartStartRadius'
        | 'borderTopEndRadius'
        | 'borderTopStartRadius'
        | 'aspectRatio'
        | 'borderEndWidth'
        | 'borderStartWidth'
        | 'end'
        | 'marginEnd'
        | 'marginStart'
        | 'paddingEnd'
        | 'paddingStart'
        | 'start'
        | 'direction'
        | 'transformMatrix'
        | 'rotation'
        | 'scaleX'
        | 'scaleY'
        | 'translateX'
        | 'translateY'
        | `$${string}`
        | `$${number}`
        | `$theme-${string}`
        | `$theme-${number}`
        | 'ref'
        | 'tag'
        | 'x'
        | 'y'
        | 'perspective'
        | 'scale'
        | 'skewX'
        | 'skewY'
        | 'matrix'
        | 'rotate'
        | 'rotateY'
        | 'rotateX'
        | 'rotateZ'
        | 'theme'
        | 'group'
        | 'onFocus'
        | 'onPress'
        | 'onLongPress'
        | 'onPressIn'
        | 'onPressOut'
        | 'onHoverIn'
        | 'onHoverOut'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'onMouseDown'
        | 'onMouseUp'
        | 'onBlur'
        | 'target'
        | 'asChild'
        | 'dangerouslySetInnerHTML'
        | 'debug'
        | 'disabled'
        | 'className'
        | 'themeShallow'
        | 'themeInverse'
        | 'untilMeasured'
        | 'componentName'
        | 'tabIndex'
        | 'disableOptimization'
        | 'forceStyle'
        | 'disableClassName'
        | 'onScroll'
        | 'hoverStyle'
        | 'pressStyle'
        | 'focusStyle'
        | 'exitStyle'
        | 'enterStyle'
        | 'rel'
        | 'download'
        | 'dataSet'
        | 'onScrollShouldSetResponder'
        | 'onScrollShouldSetResponderCapture'
        | 'onSelectionChangeShouldSetResponder'
        | 'onSelectionChangeShouldSetResponderCapture'
        | 'href'
        | 'hrefAttrs'
        | 'elevationAndroid'
        | 'key'
      >;
    __variantProps: void & {
      readonly fullscreen?: boolean | undefined;
      readonly elevation?: number | import('tamagui').SizeTokens | undefined;
    };
  }
>;
export type PageProps = GetProps<typeof Page>;
//# sourceMappingURL=Page.d.ts.map
