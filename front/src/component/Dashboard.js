import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import DataTable from "react-data-table-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { baseUrl } from "../baseUrl";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import Nav from "./Nav";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const header = [
  { label: "Name", key: "Name" },
  { label: "Price", key: "Price" },
  { label: "Description", key: "Description" },
];

const Demo = () => {
  var token = localStorage.getItem("token");
  console.log("token",token);
  var headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  const [user, setUser] = useState("");
  const [item, setItem] = useState("");
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([]);
  const [filterdata, setfilter] = useState([]);
  const [view, setview] = useState({
    Name: "",
    Price: "",
    Description: "",
  });

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    console.log("bxcmnzxb");
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const inputitemEvent = (e) => {
    const { name, value } = e.target;
    setview({ ...view, [name]: value });
  };
  const onInsertItem = (e) => {
    axios
      .post(`${baseUrl}item/insert`, view, { headers })
      .then((res) => {
        alert(res.data.message);
        setview({
          Name: "",
          Price: "",
          Description: "",
        });
        handleClose2();
        getdata();
      })
      .catch((er) => {
        console.log("mnsbdcmjs", er);
        alert(er.response.data.message);
      });
  };

  const csvReport = {
    data: data && data,
    headers: header,
    filename: "Clue_Mediator_Report.csv",
  };

  const viewById1 = async (id) => {
    handleOpen1();
    await axios
      .get(`${baseUrl}item/GetOneItem/${id}`, { headers })
      .then((res) => {
        console.log(res.data.data);
        setview(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const viewById = async (id) => {
    handleOpen();
    await axios
      .get(`${baseUrl}item/GetOneItem/${id}`, { headers })
      .then((res) => {
        console.log(res.data.data);
        setview(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUpdate = async (id) => {
    axios
      .put(`${baseUrl}item/update/${id}`, view, { headers })
      .then((res) => {
        alert(res.data.message);
        handleClose();
        getdata();
      })
      .catch((er) => {
        console.log("mnsbdcmjs", er);
        alert(er.response.data.message);
      });
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `${row.Price}$`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "createdAt",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "updatedAt",
      selector: (row) => row.updatedAt,
      sortable: true,
    },
    {
      name: "action",
      cell: (row) => (
        <>
          <EditIcon
            onClick={() => viewById(row._id)}
            className="mr-3"
          ></EditIcon>
          <VisibilityIcon
            onClick={() => viewById1(row._id)}
            className="mx-3"
          ></VisibilityIcon>
          <DeleteIcon
            onClick={() => deletestaff(row._id)}
            className="mx-3"
          ></DeleteIcon>
        </>
      ),
    },
  ];
  const getdata = async () => {
    try {
      const userCount = await axios.get(`${baseUrl}user/HowManyUser`,{ headers }).then((res)=>{
        setUser(res?.data?.data);
      }).catch((e)=>{
        console.log(e);
      });
      const getAll = await axios.get(`${baseUrl}item/GetAll`).then((res)=>{
        setdata(res?.data?.data);
        setfilter(res?.data?.data);
        
      }).catch((e)=>{
        console.log(e);
        
      });
      const itemcount = await axios.get(`${baseUrl}item/HowManyItem`,{ headers }).then((res)=>{
      
        setItem(res?.data?.data);
        
      }).catch((e)=>{
        console.log(e);
      });
     

    } catch (error) {
      console.log(error);
    }
  };
  console.log("dataaaa0", user);
  useEffect(() => {
    getdata();
  }, []);
  useEffect(() => {
    const result = data.filter((val) => {
      return val.Name.toLowerCase().match(search.toLowerCase());
    });

    setfilter(result);
  }, [search]);

  function deletestaff(_id) {
    fetch(`${baseUrl}item/delete/${_id}`, {
      method: "DELETE",
    }).then((r) => {
      r.json().then((resp) => {
        console.log(resp);
        getdata();
      });
    });
  }
  return (
    <div className="">
      <Nav />
      <div className="max-w-7xl mx-auto">
        <div className="w-[100%] mt-8">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-[95%] m-auto  flex justify-between px-4 box-border  py-6 border-t-[6px] border-[#212A41] ease-in duration-500 hover:scale-105 rounded-lg shadow-lg items-center">
              <div className="inner">
                <h3 className="font-bold text-[#212A41] text-[26px]">{item}</h3>
                <p className="text-[#212A41] text-[14px] uppercase">Items</p>
              </div>
              <div className="icon">
                <CategoryIcon className="bg-[#3DC0DF] text-[#fff] text-[48px] p-1 rounded " />
              </div>
            </div>
            <div className="w-[95%] m-auto  flex justify-between px-4 box-border  py-6 border-t-[6px] border-[#212A41] ease-in duration-500 hover:scale-105 rounded-lg shadow-lg items-center">
              <div className="inner">
                <h3 className="font-bold text-[#212A41] text-[26px]">{user}</h3>
                <p className="text-[#212A41] text-[14px] uppercase">User</p>
              </div>
              <div className="icon">
                <GroupIcon className="bg-[#3DC0DF] text-[#fff] text-[48px] p-1 rounded" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-8 px-3">
          <DataTable
            className="text-[#212A41]"
            title="Items List"
            columns={columns}
            data={filterdata}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="650px"
            highlightOnHover
            subHeader
            subHeaderComponent={
              <div className="d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="search"
                  className="mt-1 py-2 px-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block mr-2 rounded-md sm:text-sm focus:ring-1" 
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button
                  className="bg-success1 border-0 text-white py-2 px-3 rounded mr-3"
                  onClick={handleOpen2}
                >
                  Insert item
                </button>
                <button className="bg-success1 border-0 text-white py-2 px-3 rounded">
                  <CSVLink
                    {...csvReport}
                    className="text-white text-decoration-none"
                  >
                    Export to CSV
                  </CSVLink>
                </button>
              </div>
            }
          />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <div className="">
            <div className="row justify-content-center align-items-center">
              <div className="p-5">
                <h3 className="text-center border-bottom pb-3">Update Item</h3>
                <div className="my-3">
                  <h6>Name</h6>
                  <input
                    type="email"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Name"
                    onChange={inputitemEvent}
                    value={view.Name}
                  ></input>
                </div>
                <div className="my-3">
                  <h6>Price</h6>
                  <input
                    type="text"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Price"
                    onChange={inputitemEvent}
                    value={view.Price}
                  ></input>
                </div>
                <div className="my-3">
                  <h6>Description</h6>
                  <input
                    type="text"
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Description"
                    onChange={inputitemEvent}
                    value={view.Description}
                  ></input>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mt-3">
                    <button
                      className="px-3 py-2 bg-success1 border-0 text-white cursor-pointer"
                      onClick={(e) => onUpdate(view._id)}
                    >
                      SAVE
                    </button>
                  </div>
                  <div
                    className="mt-3 text-center cursor-pointer"
                    onClick={(e) => {
                      handleClose(e);
                    }}
                  >
                    CANCLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <div className="">
            <div className="row justify-content-center align-items-center">
              <div className=" bg-white py-4 rounded">
                <h3 className="text-center border-bottom pb-3">Insert Item</h3>
                <div className="my-3">
                  <h6>Name</h6>
                  <input
                    type="email"
                   className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Name"
                    onChange={inputitemEvent}
                    value={view.Name}
                  ></input>
                </div>
                <div className="my-3">
                  <h6>Price</h6>
                  <input
                    type="text"
                   className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Price"
                    onChange={inputitemEvent}
                    value={view.Price}
                  ></input>
                </div>
                <div className="my-3">
                  <h6>Description</h6>
                  <input
                    type="text"
                   className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                    name="Description"
                    onChange={inputitemEvent}
                    value={view.Description}
                  ></input>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mt-3">
                    <button
                      className="px-3 py-2 bg-success1 border-0 cursor-pointer text-white"
                      onClick={(e) => onInsertItem(view._id)}
                    >
                      SAVE
                    </button>
                  </div>
                  <div
                    className="mt-3 text-center"
                    onClick={(e) => {
                      handleClose2(e);
                    }}
                  >
                    CANCLE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 800 }}>
          <div className="">
            <div className="row justify-content-center py-4 align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-6  col-8 p-5 bg-white rounded">
                <h3 className="text-center border-bottom pb-3">view Item</h3>
                <div className="my-3">Name:{view.Name}</div>
                <hr/>
                <div className="my-3">Price:{view.Price}</div>
                <hr/>
                <div className="my-3">Description:{view.Description}</div>
                <hr/>
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="mt-3 text-center bg-success1 py-2 px-5 text-white cursor-pointer"
                    onClick={(e) => {
                      handleClose1(e);
                    }}
                  >
                    BACK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Demo;
