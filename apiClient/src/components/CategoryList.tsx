import { iCategory } from "../types/types"
import CategoryUnit from "./CategoryUnit"
interface categoryProps {
    data: iCategory[] | null,
    isLoading: boolean,
    error: string | null


}
function CategoryList({ data, isLoading, error }: categoryProps) {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    return (
        <section role="list">
            <header>
                <h2>Lista de categorías</h2>
            </header>
            {data?.map((category: iCategory) => (
                <CategoryUnit {...category} key={category.id} />
            ))}
        </section>
    )
}
export default CategoryList