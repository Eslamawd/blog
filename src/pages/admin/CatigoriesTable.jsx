import { useEffect } from 'react';
import AdminSidebar from "./AdminSidebar";
import { useSelector, useDispatch } from "react-redux";
import "./admin-table.css";
import  swal  from "sweetalert";
import { featchCategories, deleteOneCategory } from '../../redux/apiCalls/categoryApiCall';


const CategoriesTable = () => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)

    useEffect(() => {
        dispatch(featchCategories())

    }, [])

       // delete categories Hundler 
       const deletCategoriesHundler = (categoryId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Categories!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((isOk) => {
            if (isOk) {
                dispatch(deleteOneCategory(categoryId))
            
            } 
          });
      }
    return (
       <sectiom className="table-container">
        <AdminSidebar />
        <div className="table-wrapper">
            <h1 className="table-title">
                Categoriess
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Categories Title</th>
                        <th>Acthion</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                <b>{item.title}</b>
                            </td>
                            <td>
                                <div className="table-button-group">

                                    <button onClick={() => deletCategoriesHundler(item._id)}>
                                        Delete Categories
                                    </button>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </sectiom>
    );
};

export default CategoriesTable;