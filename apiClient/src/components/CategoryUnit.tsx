import { FC } from 'react'
import { iCategory } from '../types/types'

const ThemeUnit: FC<iCategory> = (category) => {
    return (
        <article style={{ borderBottom: '1px solid' }}>
            <header>
                <h3>Nombre: {category.name}</h3>
                <h4>Tipo: {category.type}</h4>
            </header>


        </article >
    )
}

export default ThemeUnit