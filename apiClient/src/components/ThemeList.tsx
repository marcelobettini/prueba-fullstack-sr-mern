import { iTheme } from "../types/types"
import ThemeUnit from "./ThemeUnit"
interface themeProps {
    data: iTheme[] | null,
    isLoading: boolean,
    error: string | null


}
function ThemeList({ data, isLoading, error }: themeProps) {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    return (
        <section role="list">
            <header>
                <h2>Lista de temas</h2>
            </header>
            {data?.map((theme: any) => (
                <ThemeUnit {...theme} key={theme.id} />
            ))}
        </section>
    )
}
export default ThemeList