import { FC, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './Register.css'
import { useToken } from '../hooks/useToken';
const Register: FC = () => {
    const { saveTokenToLocalStorage } = useToken()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'reader'
        },
    });
    const password = useRef('');
    password.current = watch("password", "");

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/register', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.role
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || 'Error en el login');
                return;
            }
            const { token, user } = await res.json()
            saveTokenToLocalStorage(token, user)
            reset();
            // Redirección según el rol del usuario
            console.log("user Role:", user.role)
            if (user.role === 'admin') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/home', { replace: true });
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
        }
    });

    return (
        <div className='container'>
            <h1>Registrar Usuario</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input
                        autoFocus
                        type="text"
                        id="username"
                        aria-required="true"
                        aria-label="Nombre de usuario"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "El nombre de usuario es requerido"
                            },
                            maxLength: { value: 20, message: "No puede tener más de 20 caracteres" }
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </fieldset>

                <fieldset>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El email es requerido"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Email no válido",
                            },
                        })}
                    />
                    {errors.email && <span>{errors.email?.message}</span>}
                </fieldset>

                <fieldset>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            aria-required="true"
                            aria-label="Contraseña"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Contraseña es requerida",
                                },
                                minLength: {
                                    value: 8,
                                    message: "Contraseña debe ser mayor a 8 caracteres",
                                },
                            })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div>

                        <label htmlFor='confirmPassword'>Confirma Contraseña:</label>
                        <input
                            type="password"
                            id='confirmPassword'
                            aria-required="true"
                            aria-label="Contraseña"
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === password.current || "Las contraseñas no coinciden",
                            })}
                        />
                        {errors.confirmPassword && (
                            <span>{errors.confirmPassword.message}</span>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="role">Rol:</label>
                    <select
                        id="role"
                        aria-required="true"
                        aria-label="Rol de usuario"
                        {...register("role")}
                    >
                        <option value="reader">Lector</option>
                        <option value="creator">Creador</option>
                    </select>
                </fieldset>

                <button type="submit">Registrarse</button>
            </form>

            <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión</Link></p>
        </div>
    );
};

export default Register;
