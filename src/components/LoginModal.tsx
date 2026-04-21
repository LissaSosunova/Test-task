import Spinner from './spinner'
import { type ModalProps } from '../shared/interfaces/modal-props'
import { useForm } from 'react-hook-form'
import { type LoginFormData, type RegisterFormData } from '../shared/interfaces/login-form'
import { AuthAPI } from '../api/auth.api'
import { useState } from 'react'
import { useAuth } from '../shared/AuthContext/useAuth'
import { showToast } from '../shared/ui/toast'

export default function LoginModal({ onClose, onSuccess }: ModalProps) {

    const [tab, setTab] = useState<'login' | 'register'>('login');
    
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        setError: setLoginError,
        clearErrors: clearLoginErrors,
        formState: { errors: loginErrors, isSubmitting },
    } = useForm<LoginFormData>()

    const onLoginSubmit = (data: LoginFormData) => {
        clearLoginErrors()
        const response = AuthAPI.login(data)
        if (!response.error) {
            login(response)
            onSuccess()
        } else {
            setLoginError('root.server', {
                message: response.error || 'Invalid credentials',
            })
            showToast.error(response.error || 'Error')
        }
    }
    
    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        watch,
        setError: setRegisterError,
        clearErrors: clearRegisterErrors,
        formState: { errors: registerErrors, isSubmitting: isSubmittingRegister },
    } = useForm<RegisterFormData>()

    const { login } = useAuth()

    const onRegisterSubmit = async (data: RegisterFormData) => {
        clearRegisterErrors()
        const randomNum = Math.floor(Math.random() * 10000000001)
        try {
            const response = AuthAPI.register({
                name: data.name,
                password: data.password,
                role: data.role,
                id: randomNum.toString()
            })

            if (response.error) {
                setRegisterError('root.server', {
                    message: response.error
                })
                showToast.error(response.error)
                return
            }

            login(response)
            onSuccess()
        } catch (error: any) {
            setRegisterError('root.server', {
                message: error?.message || 'Registration error'
            })
            showToast.error(error?.message || 'Registration error')
        }
    }

    const handleTabChange = (newTab: 'login' | 'register') => {
        if (newTab === 'login') {
            clearRegisterErrors()
        } else {
            clearLoginErrors()
        }
        setTab(newTab)
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                {/* Login */}
                {tab === 'login' && (
                    <>
                        <h2>Login /
                            <button
                                type="button"
                                className="btn-tab primary-btn mt-3 ml-1"
                                onClick={() => handleTabChange('register')}
                            >
                                Registration
                            </button>
                        </h2>
                        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                            <div className="grid md:justify-content-center p-0-20">
                                <div className="col-12 ">
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=''
                                            {...loginRegister('name', { 
                                                required: 'Name is required',
                                                onChange: () => clearLoginErrors()
                                            })}
                                        />
                                        {loginErrors.name && <p className="error error-form">{loginErrors.name.message}</p>}
                                    </div>
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...loginRegister('password', {
                                                required: 'Пароль обязателен',
                                                onChange: () => clearLoginErrors()
                                            })}
                                        />
                                        {loginErrors.password && <p className="error error-form">{loginErrors.password.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="actions">
                                <button type="submit" className="btn-main primary-btn mt-3" disabled={isSubmitting}>
                                    {isSubmitting ? <Spinner /> : 'Login'}
                                </button>
                                <button type="button" onClick={onClose} className="btn-main filter-btn mt-3">
                                    Cancel
                                </button>
                            </div>
                            {loginErrors.root?.server?.message && (
                                <p className="error error-form">
                                    {loginErrors.root.server.message}
                                </p>
                            )}
                        </form>
                    </>
                )}
                
                {/* Registration */}
                {tab === 'register' && (
                    <>
                        <h2> 
                            <button
                                type="button"
                                className="btn-tab primary-btn mt-3"
                                onClick={() => { handleTabChange('login') }}
                            >
                                Login
                            </button>
                            &nbsp;&nbsp;/ Registration
                        </h2>

                        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
                            <div className="grid md:justify-content-center p-0-20">
                                <div className="col-12 ">
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=''
                                            {...registerRegister('name', {
                                                required: 'Name is required',
                                                minLength: { value: 3, message: 'Minimum 3 characters' },
                                                onChange: () => clearRegisterErrors()
                                            })}
                                        />
                                        {registerErrors.name && <p className="error error-form">{registerErrors.name.message}</p>}
                                    </div>
                                    
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...registerRegister('password', {
                                                required: 'Пароль обязателен',
                                                minLength: { value: 6, message: 'Minimum 6 characters' },
                                                onChange: () => clearRegisterErrors()
                                            })}
                                        />
                                        {registerErrors.password && <p className="error error-form">{registerErrors.password.message}</p>}
                                    </div>
                                    
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...registerRegister('confirmPassword', {
                                                validate: value =>
                                                    value === watch('password') || "The passwords don't match",
                                                onChange: () => clearRegisterErrors()
                                            })}
                                        />
                                        {registerErrors.confirmPassword && <p className="error error-form">{registerErrors.confirmPassword.message}</p>}
                                    </div>
                                    
                                    <div className="mb-3 input-set max-w-18rem md:min-w-full col">
                                        <label className="form-label form-label1">Register as</label>
                                        <select
                                            className="form-control"
                                            {...registerRegister('role', {
                                                required: 'Role is required',
                                                onChange: () => clearRegisterErrors()
                                            })}
                                        >
                                            <option value="">Select role</option>
                                            <option value="user">User</option>
                                            <option value="manager">Manager</option>
                                        </select>
                                        {registerErrors.role && (
                                            <p className="error error-form">
                                                {registerErrors.role.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="actions">
                                <button type="submit" className="btn-main primary-btn mt-3" disabled={isSubmittingRegister}>
                                    {isSubmittingRegister ? <Spinner /> : 'Register'}
                                </button>
                                <button type="button" onClick={onClose} className="btn-main filter-btn mt-3">
                                    Cancel
                                </button>
                            </div>
                            {registerErrors.root?.server?.message && (
                                <p className="error error-form">
                                    {registerErrors.root.server.message}
                                </p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}