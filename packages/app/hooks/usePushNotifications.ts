import { useState, useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import {
  registerForPushNotificationsAsync,
  requestNotificationPermissions,
} from '../utils/permissions'

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken
  notification?: Notifications.Notification
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
})
export const sendLocalNotification = async (title: string, body: string) => {
  const hasPermission = await requestNotificationPermissions()

  if (!hasPermission) {
    console.log('No notification permission')
    return
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  })
}

export const usePushNotifications = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>()

  const [notification, setNotification] = useState<Notifications.Notification | undefined>()

  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token)
    })

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current)
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  console.log(expoPushToken)
  return {
    expoPushToken,
    notification,
  }
}
