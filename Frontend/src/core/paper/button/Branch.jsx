import React from "react";

const Branch = () => {
  return (
    <div>
      {/* branch */}
      <select class="bg-white text-gray-700 w-[20rem] border rounded-lg px-4 py-2 focus:outline-none">
        <option value="" disabled selected>
          - Select Courses -
        </option>
        <option value="course1">Course 1</option>
        <option value="course2">Course 2</option>
        <option value="course3">Course 3</option>
      </select>
    </div>
  );
};

export default Branch;
