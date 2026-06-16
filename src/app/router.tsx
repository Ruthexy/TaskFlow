import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/layouts/AppLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { SettingsLayout } from '@/layouts/SettingsLayout'

import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { BoardPage } from '@/pages/BoardPage'
import { CalendarPage } from '@/pages/CalendarPage'
import { TeamPage } from '@/pages/TeamPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { ReportsPage } from '@/pages/ReportsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { ProjectBoardPage } from '@/pages/project/ProjectBoardPage'
import { ProjectTasksPage } from '@/pages/project/ProjectTasksPage'
import { ProjectCalendarPage } from '@/pages/project/ProjectCalendarPage'
import { ProjectSettingsPage } from '@/pages/project/ProjectSettingsPage'

import { ProfileSettings } from '@/features/settings/components/ProfileSettings'
import {
  WorkspaceSettings,
  NotificationSettings,
  AppearanceSettings,
  BillingSettings,
} from '@/features/settings/components/OtherSettings'

export const router = createBrowserRouter([
  // Auth routes
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },

  // Protected app routes
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      {
        path: '/projects/:projectId',
        element: <ProjectDetailPage />,
        children: [
          { index: true, element: <Navigate to="board" replace /> },
          { path: 'board', element: <ProjectBoardPage /> },
          { path: 'tasks', element: <ProjectTasksPage /> },
          { path: 'calendar', element: <ProjectCalendarPage /> },
          { path: 'settings', element: <ProjectSettingsPage /> },
        ],
      },
      { path: '/board', element: <BoardPage /> },
      { path: '/calendar', element: <CalendarPage /> },
      { path: '/team', element: <TeamPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/reports', element: <ReportsPage /> },

      // Settings (nested layout)
      {
        path: '/settings',
        element: <SettingsLayout />,
        children: [
          { index: true, element: <SettingsPage /> },
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'workspace', element: <WorkspaceSettings /> },
          { path: 'notifications', element: <NotificationSettings /> },
          { path: 'appearance', element: <AppearanceSettings /> },
          { path: 'billing', element: <BillingSettings /> },
        ],
      },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
])
