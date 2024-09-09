import { FC } from 'react'
import { iTheme } from '../types/types'

const ThemeUnit: FC<iTheme> = (theme) => {
    return (
        <article style={{ borderBottom: '1px solid' }}>
            <header>
                <h3>{theme.name}</h3>
            </header>
            <ul>
                <li style={{ color: !theme.permissions.videos ? 'tomato' : '' }}>Admite Video: {theme.permissions.videos ? 'SI' : 'NO'}</li>
                <li style={{ color: !theme.permissions.texts ? 'tomato' : '' }}>Admite Texto: {theme.permissions.texts ? 'SI' : 'NO'}</li>
                <li style={{ color: !theme.permissions.images ? 'tomato' : '' }}>Admite Foto: {theme.permissions.images ? 'SI' : 'NO'}</li>
            </ul>
        </article>
    )
}

export default ThemeUnit