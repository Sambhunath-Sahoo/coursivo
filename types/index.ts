// Core application types
export interface User {
  id: string
  email: string
  name?: string
  role: 'student' | 'educator'
  educatorId?: string
  tenant?: string
  domain?: string
}

export interface Course {
  id: string
  title: string
  description: string
  educatorId: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Educator {
  id: string
  email: string
  name: string
  domain: string
  domainVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Student {
  id: string
  email: string
  name: string
  educatorId: string
  createdAt: Date
  updatedAt: Date
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface ApiError {
  success: false
  error: string
  details?: any
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface FormData {
  [key: string]: string | number | boolean
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavigationItem[]
}

// Utility types
export type Status = 'idle' | 'loading' | 'success' | 'error'
export type Theme = 'light' | 'dark'
export type NotificationType = 'success' | 'error' | 'warning' | 'info'
