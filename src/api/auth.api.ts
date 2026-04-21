import { type User } from '../shared/interfaces/User';

interface UresResp extends User {
  error: string | null
}

export const AuthAPI = {
  register(data: {
    password: string;
    name: string;
    role: "user" | "manager";
    id: string;
  }): UresResp {
    const localData = JSON.stringify(data)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users && users.some((u: any) => u.name === data.name)) {
      const resp = { ...data, error: 'User Already exist' }
      return resp
    } else {
      users.push(data)
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('user', localData)
      const resp = { ...data, error: null }
      return resp
    }
  },
  
  login(data: {
    password: string;
    name: string;
  }): UresResp {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (!users.length || users.every((u: any) => u.name !== data.name)) {
      const resp = { 
        name: data.name, 
        password: data.password, 
        error: 'User not found'
      }
      console.log('User not found', resp)
      return resp
    }
    
    const user = users.find((u: any) => u.name === data.name)
    
    if (user && user.password !== data.password) {
      const resp = { 
        name: data.name, 
        password: data.password, 
        error: 'error password'
      }
      console.log('error password', resp)
      return resp
    }
    if (user) {
      const resp = { ...user, error: null }
      localStorage.setItem('user', JSON.stringify(user))
      return resp
    }
    return { 
      ...data, error: 'Unknown error'
    }
  }
};