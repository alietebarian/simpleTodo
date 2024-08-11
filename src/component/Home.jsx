import React, { useState, useEffect } from "react";

export default function Home() {
  // Load initial state from localStorage or default to an empty list
  const [workData, setWorkData] = useState("");
  const [workList, setWorkList] = useState(() => {
    // Load the workList from localStorage
    const storedWorkList = localStorage.getItem("workList");
    return storedWorkList ? JSON.parse(storedWorkList) : [];
  });

  const [editIndex, setEditIndex] = useState(-1); // For tracking which item is being edited
  const [editText, setEditText] = useState(""); // For storing the new text while editing

  // Save the workList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("workList", JSON.stringify(workList));
  }, [workList]);

  const handleAddWork = () => {
    if (workData.trim()) {
      // Add new item to the list with default workDone status as false
      setWorkList([...workList, { text: workData, workDone: false }]);
      setWorkData(""); // Clear the input field
    }
  };

  const toggleWorkDone = (index) => {
    // Create a new list with toggled workDone status for the specific item
    const updatedWorkList = workList.map((item, i) =>
      i === index ? { ...item, workDone: !item.workDone } : item
    );
    setWorkList(updatedWorkList);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(workList[index].text); // Set current text to edit input
  };

  const handleSaveEdit = (index) => {
    const updatedWorkList = workList.map((item, i) =>
      i === index ? { ...item, text: editText } : item
    );
    setWorkList(updatedWorkList);
    setEditIndex(-1); // Reset editing state
    setEditText(""); // Clear edit text
  };

  const handleDelete = (index) => {
    // Create a new list without the item at the specified index
    const updatedWorkList = workList.filter((_, i) => i !== index);
    setWorkList(updatedWorkList);
  };

  return (
    <div className="w-[60%] min-h-80 bg-blue-300 m-auto mt-28 p-8 rounded-sm">
      <div className="flex pb-5 justify-center">
        <button
          type="button"
          onClick={handleAddWork} // Add event handler
          className="border-2 border-red-300 px-3 py-2 bg-red-300 rounded-md cursor-pointer hover:bg-red-500 hover:border-red-500"
        >
          افزودن
        </button>
        <input
          type="text"
          placeholder="ایجاد کار جدید ...."
          className="px-3 focus:outline-none w-[33%] rounded-sm bg-slate-100"
          value={workData}
          onChange={(e) => setWorkData(e.target.value)}
        />
      </div>
      <hr className="pb-5" />
      {workList.length > 0 ? (
        workList.map((item, index) => (
          <div key={index} className="flex py-5 justify-between">
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border px-3 py-2 rounded-sm w-full mr-2"
              />
            ) : (
              <h3>{item.text}</h3>
            )}
            <div className="flex">
              {editIndex === index ? (
                <button
                  onClick={() => handleSaveEdit(index)}
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded-md cursor-pointer"
                >
                  ذخیره
                </button>
              ) : (
                <p
                  className="m-auto ml-2 cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  ویرایش
                </p>
              )}
              <span
                className={`${
                  item.workDone
                    ? "border-2 border-green-500 bg-green-500 px-14 rounded-sm py-2"
                    : "border-2 border-red-500 bg-red-500 px-14 rounded-sm py-2"
                }`}
                onClick={() => toggleWorkDone(index)}
              >
                {item.workDone ? "کار انجام شده است" : "درحال انجام کار ..."}
              </span>
              <button
                onClick={() => handleDelete(index)}
                className="mx-2 px-3  py-1 bg-red-500 text-white rounded-md cursor-pointer"
              >
                حذف
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="font-bold">لیست خالی است</p>
      )}
    </div>
  );
}
