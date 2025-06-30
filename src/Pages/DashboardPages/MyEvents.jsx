// import { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import Loading from "../Shared/Loading";
// import usePageTitle from "../../hooks/usePageTitle";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import axios from "axios";

// const MyEvents = () => {
//   usePageTitle("My Events");
//   const { user } = useAuth();
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   console.log(user);
//   useEffect(() => {
//     if (user?.email) {
//       axios(`https://event-hub-server-one.vercel.app/my-events?email=${user.email}`)
//         .then((res) => {
//           setEvents(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch events:", err);
//           setLoading(false);
//         });
//     }
//   }, [user?.email]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const updatedData = {
//       title: form.title.value,
//       location: form.location.value,
//       description: form.description.value,
//       datetime: form.datetime.value,
//       name: form.name.value,
//     };

//     axios
//       .put(`https://event-hub-server-one.vercel.app/my-events/${selectedEvent._id}`, updatedData)
//       .then((res) => {
//         if (res.data.modifiedCount > 0) {
//           setEvents((prev) =>
//             prev.map((event) =>
//               event._id === selectedEvent._id
//                 ? { ...event, ...updatedData }
//                 : event
//             )
//           );
//           setShowUpdateModal(false);
//           setSelectedEvent(null);
//           Swal.fire("Updated!", "Your event has been updated.", "success");
//         } else {
//           Swal.fire("No Change", "No update was made to the event.", "info");
//         }
//       })
//       .catch((err) => {
//         console.error("Update error:", err);
//         Swal.fire("Error", "Failed to update event.", "error");
//       });
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`https://event-hub-server-one.vercel.app/my-events/${id}`)
//           .then(() => {
//             setEvents((prev) => prev.filter((e) => e._id !== id));
//             Swal.fire("Deleted!", "Your event has been deleted.", "success");
//           })
//           .catch((err) => {
//             console.error("Delete error:", err);
//             Swal.fire("Error", "Failed to delete event.", "error");
//           });
//       }
//     });
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="px-6 py-8 max-w-5xl mx-auto bg-white shadow rounded-lg">
//       <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
//         My Created Events
//       </h2>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-500">No events found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border border-gray-200 rounded-lg">
//             <thead className="bg-blue-100 text-blue-800 text-sm uppercase">
//               <tr>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left">Name</th>
//                 <th className="px-4 py-3 text-left">Date & Time</th>
//                 <th className="px-4 py-3 text-left">Location</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event) => (
//                 <tr key={event._id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3 font-medium text-gray-800">
//                     {event.title}
//                   </td>
//                   <td className="px-4 py-3">{event.name}</td>
//                   <td className="px-4 py-3">
//                     {new Date(event.datetime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3">{event.location}</td>
//                   <td className="px-4 py-3 text-center space-x-3">
//                     <button
//                       onClick={() => {
//                         setSelectedEvent(event);
//                         setShowUpdateModal(true);
//                       }}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="Edit"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(event._id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showUpdateModal && selectedEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
//           <form
//             onSubmit={handleUpdate}
//             className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
//           >
//             <h3 className="col-span-2 text-xl font-semibold text-blue-700 text-center mb-2">
//               Update Event
//             </h3>

//             <input
//               type="text"
//               name="title"
//               defaultValue={selectedEvent.title}
//               readOnly
//               className="col-span-2 bg-gray-100 px-3 py-2 rounded border"
//             />
//             <input
//               type="text"
//               name="location"
//               defaultValue={selectedEvent.location}
//               required
//               className="px-3 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="description"
//               defaultValue={selectedEvent.description}
//               required
//               className="col-span-2 px-3 py-2 border rounded"
//             />
//             <input
//               type="datetime-local"
//               name="datetime"
//               defaultValue={selectedEvent.datetime?.slice(0, 16)}
//               required
//               className="col-span-2 px-3 py-2 border rounded"
//             />
//             <input
//               type="text"
//               name="name"
//               defaultValue={selectedEvent.name}
//               readOnly
//               className="col-span-2 bg-gray-100 px-3 py-2 rounded border"
//             />

//             <div className="col-span-2 flex justify-end gap-4 mt-2">
//               <button
//                 type="button"
//                 onClick={() => setShowUpdateModal(false)}
//                 className="px-4 py-2 bg-gray-200 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyEvents;
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Shared/Loading";
import usePageTitle from "../../hooks/usePageTitle";
import Swal from "sweetalert2";
import axios from "axios";

const MyEvents = () => {
  usePageTitle("My Events");
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios(
        `https://event-hub-server-one.vercel.app/my-events?email=${user.email}`
      )
        .then((res) => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch events:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      location: form.location.value,
      description: form.description.value,
      datetime: form.datetime.value,
      name: form.name.value,
    };

    axios
      .put(
        `https://event-hub-server-one.vercel.app/my-events/${selectedEvent._id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          setEvents((prev) =>
            prev.map((event) =>
              event._id === selectedEvent._id
                ? { ...event, ...updatedData }
                : event
            )
          );
          setShowUpdateModal(false);
          setSelectedEvent(null);
          Swal.fire("Updated!", "Your event has been updated.", "success");
        } else {
          Swal.fire("No Change", "No update was made to the event.", "info");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        Swal.fire("Error", "Failed to update event.", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2F855A",
      cancelButtonColor: "#E53E3E",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://event-hub-server-one.vercel.app/my-events/${id}`)
          .then(() => {
            setEvents((prev) => prev.filter((e) => e._id !== id));
            Swal.fire("Deleted!", "Your event has been deleted.", "success");
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire("Error", "Failed to delete event.", "error");
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto bg-[#FFF9F0] rounded-xl shadow-md">
      <h2 className="text-4xl font-bold text-center text-[#2F855A] mb-8">
        My Created Events
      </h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-[#F6C26B] text-[#2D3748] uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Date & Time</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr
                  key={event._id}
                  className={`border-t ${
                    idx % 2 === 0 ? "bg-[#F9F9F6]" : "bg-white"
                  } hover:bg-[#F6C26B]/10`}
                >
                  <td className="px-4 py-3 font-medium text-[#2D3748]">
                    {event.title}
                  </td>
                  <td className="px-4 py-3">{event.name}</td>
                  <td className="px-4 py-3">
                    {new Date(event.datetime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3 text-center space-x-4">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowUpdateModal(true);
                      }}
                      className="text-[#2F855A] hover:text-[#1B5E3C]"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-[#E53E3E] hover:text-red-700"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showUpdateModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <h3 className="col-span-2 text-xl font-bold text-[#2F855A] text-center mb-2">
              Update Event
            </h3>

            <input
              type="text"
              name="title"
              defaultValue={selectedEvent.title}
              readOnly
              className="col-span-2 bg-gray-100 px-3 py-2 rounded border"
            />
            <input
              type="text"
              name="location"
              defaultValue={selectedEvent.location}
              required
              className="px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="description"
              defaultValue={selectedEvent.description}
              required
              className="col-span-2 px-3 py-2 border rounded"
            />
            <input
              type="datetime-local"
              name="datetime"
              defaultValue={selectedEvent.datetime?.slice(0, 16)}
              required
              className="col-span-2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="name"
              defaultValue={selectedEvent.name}
              readOnly
              className="col-span-2 bg-gray-100 px-3 py-2 rounded border"
            />

            <div className="col-span-2 flex justify-end gap-4 mt-2">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2F855A] text-white rounded hover:bg-[#276749]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
