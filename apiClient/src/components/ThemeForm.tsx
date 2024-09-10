import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { useToken } from '../hooks/useToken';
import ThemeList from './ThemeList';
import useFetchData from "../hooks/useFetchData"
import { iTheme } from "../types/types"
const ThemeForm: FC = () => {
    const { getTokenFromLocalStorage } = useToken()
    const { data, isLoading, error, getData } = useFetchData<iTheme[] | null>('themes')
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            permissions: {
                images: false,
                videos: false,
                texts: false,
            },

        },
    });


    const onSubmit = handleSubmit(async (data) => {
        try {
            const token = getTokenFromLocalStorage()
            const res = await fetch('http://localhost:3000/api/v1/themes', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    permissions: data.permissions,
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || 'Error al crear categoria');
                return;
            }
            await res.json()
            reset();
            getData('themes')

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
        }
    });

    return (
        <div className='container'>
            <h1>Agregar Tema</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="themeName">Nombre del tema:</label>
                    <input
                        autoFocus
                        type="text"
                        id="themeName"
                        aria-required="true"
                        aria-label="Nombre del tema"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre del tema es requerido"
                            },
                            maxLength: { value: 30, message: "No puede tener más de 30 caracteres" }
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </fieldset>

                <fieldset>
                    <h3>Tipo de contenido admitido</h3>
                    <label>
                        <Controller
                            name="permissions.images"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        Imágenes
                    </label>
                    <label>
                        <Controller
                            name="permissions.videos"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        Videos
                    </label>
                    <label>
                        <Controller
                            name="permissions.texts"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                            )}
                        />
                        Textos
                    </label>
                </fieldset>
                <button type="submit">Agregar</button>
            </form >

            <ThemeList data={data} isLoading={isLoading} error={error} />

        </div >
    );
};

export default ThemeForm;