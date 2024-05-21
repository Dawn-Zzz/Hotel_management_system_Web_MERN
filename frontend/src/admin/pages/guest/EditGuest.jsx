import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editGuest, viewGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";
import toast from "react-hot-toast";

const EditGuest = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [guest, setGuest] = useState({
    name: "",
    phoneNumber: "",
    IDnumber: "",
    dateOfBirth: "",
    guestCategories: "",
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await viewGuest(id);
      console.log(data);
      guest.name = data.name;
      guest.IDnumber = data.IDnumber;
      guest.dateOfBirth = data.dateOfBirth;
      guest.phoneNumber = data.phoneNumber;
      guest.guestCategories = data.guestCategories;
      // if (data?.code === 0) {
      setData(data);
      // } else {
      //     setData([]);
      // }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async () => {
    console.log(guest);
    try {
      setIsLoading(true);
      const data = await editGuest(id,guest);
      console.log(data);
      if (data.code === 0) {
        
        toast.success(data.message);
        nav("/admin/guest");
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuest({
      ...guest,
      [name]: value,
    });
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
        Edit Guest
      </div>
      <div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">ID Number</p>
          <input
            type="text"
            name="IDnumber"
            defaultValue={data.IDnumber}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Guest Name</p>
          <input
            type="text"
            name="name"
            defaultValue={data.name}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Guest Category</p>
          <select
            name="guestCategories"
            onChange={handleChange}
            id=""
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
            defaultValue={data.guestCategories}
          >
            <option value="Normal">Normal</option>
            <option value="Vip">Vip</option>
          </select>
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Date Of Birth</p>
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={data.dateOfBirth}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="py-2 text-gray-500">
          <p className="text-gray-500">Phone Number</p>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={data.phoneNumber}
            onChange={handleChange}
            className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
          />
        </div>
        <div className="flex flex-col">
          <button onClick={() => {
              editData();
            }}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
            disabled={isLoading}
            >
            Submit
          </button>
          <Link
            to="/admin/guest"
            className="rounded-lg text-red-600 py-2 mt-4 w-32"
          >
            Back to list
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditGuest;
