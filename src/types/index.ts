// ─── Primitive Types ──────────────────────────────────────────────────────────
export type ID = string

export type ProjectStatus = 'active' | 'planning' | 'at_risk' | 'completed' | 'archived'
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done'
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low'
export type WorkspaceRole = 'owner' | 'admin' | 'manager' | 'member' | 'viewer'
export type NotifType = 'assignment' | 'mention' | 'comment' | 'completion' | 'invitation'
export type NotifFilter = 'all' | 'unread' | 'mentions' | 'assigned' | 'comments'
export type CalendarViewType = 'month' | 'week' | 'day'
export type ReportPeriod = '7d' | '30d' | 'ytd'
export type Theme = 'light' | 'dark' | 'system'

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: ID
  name: string
  email: string
  avatarUrl: string | null
  role: WorkspaceRole
  timezone: string
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  workspaceName: string
}

// ─── Workspace ────────────────────────────────────────────────────────────────
export interface Workspace {
  id: ID
  name: string
  slug: string
  plan: 'free' | 'pro' | 'enterprise'
  logoUrl: string | null
  ownerId: ID
  memberCount: number
  createdAt: string
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface ProjectMember {
  userId: ID
  name: string
  avatarUrl: string | null
}

export interface Project {
  id: ID
  name: string
  description: string | null
  status: ProjectStatus
  progress: number
  totalTasks: number
  completedTasks: number
  dueDate: string | null
  members: ProjectMember[]
  isFavorited: boolean
  createdById: ID
  createdAt: string
  updatedAt: string
}

export interface CreateProjectPayload {
  name: string
  description?: string
  status: ProjectStatus
  dueDate?: string
  memberIds?: ID[]
}

export interface UpdateProjectPayload extends Partial<CreateProjectPayload> {}

// ─── Tasks ────────────────────────────────────────────────────────────────────
export interface Task {
  id: ID
  projectId: ID
  title: string
  description: string | null
  status: TaskStatus
  priority: TaskPriority
  assigneeId: ID | null
  assignee: Pick<User, 'id' | 'name' | 'avatarUrl'> | null
  dueDate: string | null
  tags: string[]
  columnId: ID
  order: number
  createdById: ID
  createdAt: string
  updatedAt: string
}

export interface CreateTaskPayload {
  projectId?: ID
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: ID
  dueDate?: string
  tags?: string[]
  columnId: ID
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {}

export interface MoveTaskPayload {
  taskId: ID
  targetColumnId: ID
  newOrder: number
}

// ─── Kanban ───────────────────────────────────────────────────────────────────
export interface KanbanColumn {
  id: ID
  name: string
  status: TaskStatus
  order: number
  taskCount: number
  tasks: Task[]
}

// ─── Team ─────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: ID
  userId: ID
  name: string
  email: string
  avatarUrl: string | null
  role: WorkspaceRole
  workload: number
  lastActiveAt: string
}

export interface InvitePayload {
  emails: string[]
  role: WorkspaceRole
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface Notification {
  id: ID
  type: NotifType
  message: string
  actorId: ID
  actorName: string
  actorAvatarUrl: string | null
  resourceId: ID | null
  resourceType: 'task' | 'project' | 'comment' | null
  isRead: boolean
  createdAt: string
}

// ─── Calendar ─────────────────────────────────────────────────────────────────
export interface CalendarEvent {
  id: ID
  title: string
  date: string
  type: 'task' | 'deadline'
  projectId: ID | null
  assigneeId: ID | null
}

// ─── Activity ─────────────────────────────────────────────────────────────────
export interface ActivityItem {
  id: ID
  actorName: string
  actorAvatarUrl: string | null
  action: string
  resourceName: string
  resourceId: ID
  resourceType: 'task' | 'project'
  createdAt: string
}

// ─── Reports ──────────────────────────────────────────────────────────────────
export interface ReportMetrics {
  velocity: number
  velocityDelta: number
  avgCycleTime: number
  cycleTimeDelta: number
  onTimeDelivery: number
  onTimeDelta: number
  activeContributors: number
  rolesCount: number
}

export interface ProductivityPoint {
  week: string
  completionRate: number
}

export interface TeamPerformancePoint {
  day: string
  created: number
  completed: number
}

export interface WorkloadPoint {
  name: string
  workload: number
}

export interface ProjectMixPoint {
  status: ProjectStatus
  count: number
}

export interface ReportOverview {
  metrics: ReportMetrics
  productivityTrend: ProductivityPoint[]
  projectMix: ProjectMixPoint[]
  teamPerformance: TeamPerformancePoint[]
  workloadDistribution: WorkloadPoint[]
}

// ─── Search ───────────────────────────────────────────────────────────────────
export interface SearchResult {
  tasks: Task[]
  projects: Project[]
  members: TeamMember[]
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export interface DashboardMetrics {
  activeProjects: number
  activeProjectsDelta: number
  totalTasks: number
  totalTasksDelta: number
  completed: number
  completedDelta: number
  overdue: number
  overdueDelta: number
}

export interface DashboardData {
  metrics: DashboardMetrics
  recentActivity: ActivityItem[]
  upcomingDeadlines: Array<{
    id: ID
    date: string
    taskName: string
    assigneeName: string
    assigneeAvatarUrl: string | null
  }>
  projectProgress: Array<{
    id: ID
    name: string
    status: ProjectStatus
    progress: number
  }>
  productivityData: TeamPerformancePoint[]
  completionRate: number
  completionRateDelta: number
}

// ─── API ──────────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  code: string
  status: number
}
