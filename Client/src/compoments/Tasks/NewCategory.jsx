import React from "react";
import { useState } from "preact/hooks";
import { styles } from "../../utils/styles";
export default function NewCategory({
  addCategoryShow,
  SetAddCategoryShow,
  categories,
  setCategories,
}) {
  const [ShowErrorAddCategory, setShowErrorAddCategory] = useState(false);
  const [NewCategory, setNewCategory] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };
  const saveNewCategory = async (data) => {
    let missionData = {
      id: "",
      Name: data,
    };

    await fetch("/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(missionData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }else {
          throw new Error("Error insert New Category");
        }
      })
      .then((data) => {
        const responseData = data;
          SetAddCategoryShow(false);
          let tempCategory = categories;
          tempCategory.push(responseData);
          localStorage.setItem("categories", JSON.stringify(tempCategory));
          setCategories(JSON.parse(localStorage.getItem("categories")));
      }).catch((error) => {
          setShowErrorAddCategory(true);
          setTimeout(() => {
            setShowErrorAddCategory(false);
          }, 5000);
        });
  };

  const handleAddClick = () => {
    saveNewCategory(NewCategory);
  };

  return (
    <div
      style={styles.gradient_background}
      className="max-w-md mx-25 p-5  text-white rounded-lg shadow-lg mb-3"
    >
      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">
          Fill new category name:
        </label>
        <input
          type="text"
          id="category"
          value={NewCategory}
          onChange={handleInputChange}
          className="  text-black rounded px-3 py-2"
          required
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleAddClick}
        >
          Add Category
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            SetAddCategoryShow(false);
          }}
        >
          Cancel
        </button>
      </div>
      <div>
        {ShowErrorAddCategory && (
          <p className="text-red-600 mt-4">
            The category exists, please try again
          </p>
        )}
      </div>
    </div>
  );
}
