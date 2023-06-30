import React from "react";

function CategoryChanger() {
  function switcher(e) {
    const x = document.querySelectorAll("#categoryBtn");
    for (let j = 0; j < x.length; j++) {
      x[j].classList.remove("active");
    }
    e.target.classList.add("active");
  }

  return (
    <div className="category-changer">
      <p>Select your level:</p>
      <div className="category-list">
        <button onClick={(e) => switcher(e)} className="active" id="categoryBtn">
          All
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          Beginner
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          Elementary
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          Pre-intermediate
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          Intermediate
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          Advanced
        </button>
        <button onClick={(e) => switcher(e)} id="categoryBtn">
          IELTS
        </button>
      </div>
    </div>
  );
}

export default CategoryChanger;
