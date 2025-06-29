import { useState } from "react";
import DatePicker from "react-datepicker";

const FilterBar = ({ onFilter }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState("");

  const handleClear = () => {
    setSearchText("");
    setSelectedDate(null);
    setDateRange("");
    onFilter({ search: "", date: null, range: "" });
  };

  const handleFilter = () => {
    onFilter({ search: searchText, date: selectedDate, range: dateRange });
  };

  return (
    <div className="flex flex-wrap gap-3 items-center border p-4 rounded-md shadow-sm bg-white">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title or name"
        className="border px-4 py-2 rounded-md w-full md:w-64"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Single Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Pick a date"
        className="border px-4 py-2 rounded-md w-full md:w-48"
        dateFormat="MM-dd-yyyy"
      />

      {/* Predefined Date Range Filter */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="border px-4 py-2 rounded-md w-full md:w-52"
      >
        <option value="">Select a date range</option>
        <option value="today">Today</option>
        <option value="thisWeek">Current Week</option>
        <option value="lastWeek">Last Week</option>
        <option value="thisMonth">Current Month</option>
        <option value="lastMonth">Last Month</option>
      </select>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md font-medium text-gray-800"
      >
        Clear Filters ✕
      </button>

      {/* Apply Filter (optional button) */}
      <button
        onClick={handleFilter}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
      >
        Apply
      </button>
    </div>
  );
};

export default FilterBar;
