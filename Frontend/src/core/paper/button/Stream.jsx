import React from "react";

const Stream = () => {
  return (
    <div>
      {/* <!-- Select Stream --> */}
      <select class="bg-white text-gray-700 w-[20rem]  border  rounded-lg px-4 py-2 focus:outline-none">
        <option value="" disabled selected>
          - Select Stream -
        </option>
        <option value="stream1">Stream 1</option>
        <option value="stream2">Stream 2</option>
        <option value="stream3">Stream 3</option>
      </select>
 
    </div>
  );
};

export default Stream;
