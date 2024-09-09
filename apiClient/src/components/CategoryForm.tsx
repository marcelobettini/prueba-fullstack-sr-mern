import { FC } from 'react';
import { useForm } from 'react-hook-form'
import { useToken } from '../hooks/useToken';
import useFetchData from '../hooks/useFetchData';
import { iCategory } from '../types/types';
import CategoryList from './CategoryList';
const CategoryForm: FC = () => {
    const { getTokenFromLocalStorage } = useToken()
    const { data, isLoading, error, getData } = useFetchData<iCategory[] | null>('categories')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            type: '',
            coverImage: ''
        },
    });


    const onSubmit = handleSubmit(async (data) => {
        try {
            const token = getTokenFromLocalStorage()
            const res = await fetch('http://localhost:3000/api/v1/categories', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    type: data.type,
                    coverImage: data.coverImage,
                })
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || 'Error al crear categoria');
                return;
            }
            await res.json()
            reset();
            getData('categories')

        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
        }
    });

    return (
        <div className='container'>
            <h1>Agregar Categoría</h1>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <label htmlFor="name">Nombre de categoría:</label>
                    <input
                        autoFocus
                        autoComplete='name'
                        type="text"
                        id="name"
                        aria-required="true"
                        aria-label="Nombre de categoría"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre de la categoría es requerido"
                            },
                            maxLength: { value: 30, message: "No puede tener más de 30 caracteres" }
                        })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </fieldset>

                <fieldset>
                    <label htmlFor="type">Tipo:</label>
                    <select
                        id="type"
                        aria-required="true"
                        aria-label="Tipo de categoría"
                        defaultValue=""
                        {...register("type", {
                            required: {
                                value: true,
                                message: "Debe seleccionar un tipo"
                            }
                        })}
                    >
                        <option value="" disabled>Seleccione opción</option>
                        <option value="image">Imágenes</option>
                        <option value="video">Videos</option>
                        <option value="document">Documentos</option>
                    </select>
                    {errors.type && <span>{errors.type.message}</span>}
                </fieldset>

                <fieldset>
                    <label htmlFor="coverImage">Imagen de Portada:</label>
                    <input
                        type="text"
                        placeholder='URL...'
                        id="coverImage"
                        aria-required="true"
                        aria-label="Imagen de portada"
                        {...register("coverImage", {
                            required: {
                                value: true,
                                message: "La imagen de portada es requerida",
                            },
                        })}
                    />
                    {errors.coverImage && <span>{errors.coverImage.message}</span>}
                </fieldset>
                <button type="submit">Agregar</button>
            </form >

            <CategoryList data={data} isLoading={isLoading} error={error} />

        </div >
    );
};

export default CategoryForm;
