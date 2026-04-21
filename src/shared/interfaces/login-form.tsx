export type RegisterFormData = {
  name: string
  role: 'user' | 'manager'
  password: string
  confirmPassword: string
}

export type LoginFormData = {
  name: string
  password: string
}
