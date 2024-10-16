import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent'; // Nhập khẩu CreateEvent

const url = "http://localhost:8080"; // Đường dẫn API cơ bản của bạn

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // State để quản lý trạng thái modal

  // Fetch events từ API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/coupons`); // Thay URL cho phù hợp với API của bạn
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data); // Cập nhật danh sách sự kiện
      } else {
        toast.error("Error: No data returned or data is not an array");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchEvents(); // Gọi hàm fetchEvents khi component được mount
  }, []);

  const handleOpen = () => setOpen(true); // Mở modal
  const handleClose = () => setOpen(false); // Đóng modal

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button 
        className="mb-6 px-6 py-3 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        onClick={handleOpen} // Gọi hàm mở modal khi nút được nhấn
      >
        CREATE NEW EVENT
      </button>
      <CreateEvent open={open} handleClose={handleClose} /> {/* Truyền props vào CreateEvent */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105" key={event.id}>
            <img
              className="h-48 w-full object-cover"
              src={event.imageUrl || "/path/to/placeholder/image.jpg"}
              alt={event.name || "Event Image"}
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/path/to/placeholder/image.jpg";
              }}
            />
            <div className="p-5">
              <h5 className="text-xl font-semibold text-orange-600">{event.name || "No name available"}</h5>
              <p className="text-gray-600">Start Date: <span className="font-medium">{event.startDate || "N/A"}</span></p>
              <p className="text-gray-600">End Date: <span className="font-medium">{event.endDate || "N/A"}</span></p>
              <p className="text-gray-600">Code: <span className="font-medium">{event.code || "No code provided"}</span></p>
              <p className="text-gray-500">{event.description || "No description available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEvents;
