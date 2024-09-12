import { Paper } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFetchData from "../hooks/useFetchData"

const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'type', headerName: 'Type', width: 100 },
];


const paginationModel = { page: 0, pageSize: 5 };
function ContentList() {
    const { data, error, isLoading } = useFetchData<any>
        ('contents')
    const rows = data && data.map((c: any) => c)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return rows.length && (
        <Paper sx={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row._id}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />

        </Paper>


    )


}

export default ContentList