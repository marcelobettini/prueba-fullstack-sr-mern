import { FC, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './Login.css'
import { useToken } from '../hooks/useToken';

const Login: FC = () => {
    const navigate = useNavigate()
    const { saveTokenToLocalStorage } = useToken()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const password = useRef('');
    password.current = watch("password", "");

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await fetch('http://localhost:3000/api/v1/auth/login', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: data.email, password: data.password })
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || 'Error en el login');
                return;
            }
            const { token, user } = await res.json()
            saveTokenToLocalStorage(token, user)
            reset();
            navigate('/home')
            // Redirección según el rol del usuario
            if (user?.role === 'admin') {
                navigate('/admin');

            } else {
                navigate('/home');

            }

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
        }
    });

    return (
        <div className='container'>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        autoFocus
                        autoComplete='email'
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
                            autoComplete='current-password'
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
                                    value: 6,
                                    message: "Contraseña debe ser mayor a 6 caracteres",
                                },
                            })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div>

                        <label htmlFor='confirmPassword'>Confirma Contraseña:</label>
                        <input
                            autoComplete='current-password'
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



                <button type="submit">Inciar Sesión</button>
            </form>

            <p>¿No tienes una cuenta? <Link to="/register">Registrate</Link></p>
        </div>
    )
};

export default Login;
