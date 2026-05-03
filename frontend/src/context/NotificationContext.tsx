import React, { createContext, useContext, useState, useCallback } from 'react'

export type NotifType = 'success' | 'warning' | 'info' | 'error'

export interface AppNotification {
  id: string
  type: NotifType
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  addNotification: (type: NotifType, title: string, message: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  const addNotification = useCallback((type: NotifType, title: string, message: string) => {
    const n: AppNotification = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
    }
    setNotifications(prev => [n, ...prev].slice(0, 50))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications, unreadCount,
      addNotification, markAsRead, markAllAsRead, removeNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
