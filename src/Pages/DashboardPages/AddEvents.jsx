// import React from "react";
// import Swal from "sweetalert2";
// import "react-datepicker/dist/react-datepicker.css";

// import useAuth from "../../hooks/useAuth";
// import usePageTitle from "../../hooks/usePageTitle";
// import axios from "axios";
// import { useNavigate } from "react-router";

// const AddMarathon = () => {
//   usePageTitle("Add Marathon");

//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const handleAddMarathon = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());

//     // Build the marathon object from form data
//     const newMarathon = {
//       ...data,
//       name: user?.name || "",
//       createdBy: user?.email,
//       attendeeCount: 0,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/add/event",
//         newMarathon
//       );

//       if (res.data.insertedId) {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Marathon added successfully!",
//           showConfirmButton: false,
//           timer: 1000,
//         });
//         navigate("/dashboard/my-events");
//         form.reset();
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong!", "error");
//     }
//   };

//   return (
//     <div className="px-6 py-8 max-w-5xl mx-auto bg-white shadow rounded-lg">
//       <h2 className="text-3xl text-center font-bold mb-6 text-blue-700">
//         Add New Event
//       </h2>
//       <form onSubmit={handleAddMarathon} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           placeholder="Marathon Title"
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         <input
//           type="text"
//           name="name"
//           value={user?.name}
//           readOnly
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="datetime-local"
//           name="datetime"
//           required
//           className="input input-bordered w-full"
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           required
//           className="textarea textarea-bordered w-full"
//         ></textarea>

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white py-3 cursor-pointer px-8 rounded-lg font-semibold transition"
//         >
//           Add Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddMarathon;
import React from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";
import axios from "axios";
import { useNavigate } from "react-router";

const AddMarathon = () => {
  usePageTitle("Add Marathon");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newMarathon = {
      ...data,
      name: user?.name || "",
      createdBy: user?.email,
      attendeeCount: 0,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/add/event",
        newMarathon
      );
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Marathon added successfully!",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard/my-events");
        form.reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto bg-[#FFF9F0] rounded-xl shadow-md">
      <h2 className="text-4xl font-bold text-center text-[#2F855A] mb-10">
        Add New Event
      </h2>

      <form onSubmit={handleAddMarathon} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-[#2D3748] mb-2"
          >
            Marathon Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter marathon title"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F855A] outline-none"
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#2D3748] mb-2"
          >
            Organizer Name
          </label>
          <input
            type="text"
            name="name"
            value={user?.name}
            readOnly
            className="w-full px-4 py-3 border bg-gray-100 border-gray-300 rounded-lg text-gray-700"
          />
        </div>

        {/* Date & Time */}
        <div>
          <label
            htmlFor="datetime"
            className="block text-sm font-medium text-[#2D3748] mb-2"
          >
            Date & Time
          </label>
          <input
            type="datetime-local"
            name="datetime"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F855A] outline-none"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-[#2D3748] mb-2"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Event location"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F855A] outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-[#2D3748] mb-2"
          >
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Write a short description..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F855A] outline-none resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            className="bg-[#2F855A] hover:bg-[#276749] text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarathon;
