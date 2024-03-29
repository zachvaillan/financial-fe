import ClearIcon from '@mui/icons-material/Clear';
import './Table.css';

export const Table = ({ columns, rows, keys, handleDelete, handleOpen }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns?.map((column) => {
            return(
              <th>{column}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => {
          return(
            <tr>
              {keys?.map((key) => {
                return(
                  <td onClick={() => handleOpen(row.id)}>{row[key]}</td>
                )
              })}
              <ClearIcon style={{cursor: 'pointer', color: 'red'}} onClick={() => handleDelete(row.id)} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}