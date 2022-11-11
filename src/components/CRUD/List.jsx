import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const List = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  // const LoadDetail = (id) => {
  //   navigate("/employee/detail/" + id);
  // };

  // const LoadEdit = (id) => {
  //   navigate("/employee/edit/" + id);
  // };

  // const Removefunction = (id) => {
  //   if (window.confirm("Do you want to remove?")) {
  //     fetch("http://localhost:8000/employee/" + id, {
  //       method: "DELETE",
  //     })
  //       .then((res) => {
  //         alert("Removed successfully.");
  //         window.location.reload();
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // };

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => {
        return res.json()
      })
      .then(data => {
        console.log(data)
        setData(data)
    })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  
  return (
    <div className="container">
      <br></br>
      <div className="card">
        <div className="card-title">
          <h2>List</h2>
        </div>
        <div className="card-body">
          <div>
            <Link to="/crud/create" className="btn btn-success"> create new +</Link>
          </div>
          <table className="table table-default">
            <thead className="bg-dark text-white">
              <tr>
                <td>Gender</td>
                <td>Name</td>
                <td>Title</td>
                <td>First</td>
                <td>Last</td>
              </tr>
            </thead>
            <tbody>
            {data?.results.length > 0 && (
                data.results.map((data, index) => (
                  <tr key={index}>
                    <td>{data.gender}</td>
                    
                    <td>{data.name.title}</td>
                    <td>{data.name.first}</td>
                    <td>{data.name.last}</td>
                  </tr>
                  )
                ))}
                <tr>
                 <td><a onClick={() => { LoadEdit(object.index) }} className="btn btn-success">Edit</a>
                      <a onClick={() => { Removefunction(object.id) }} className="btn btn-danger">Remove</a>
                      {/* <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a> */}
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
