import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/add.scss"

const Add = () => {
	const [book, setBook] = useState({
		title: "",
		description: "",
		cover: "",
		price: 0,
	});
  const navigate = useNavigate()

	const handleInput = (e) => {
		const input = e.target.value;
		const inputName = e.target.name;
    if (inputName === "price") {
		  setBook((prev) => ({ ...prev, price: input }));
    } else {
      const sanitizedInput = input.trim().replace(/[^a-z,/_&:'0-9\s.-]+/gi, ``);
			sanitizedInput && setBook((prev) => ({ ...prev, [inputName]: sanitizedInput }));
    }

		if(inputName === "description") {
			e.target.style.removeProperty("height");
			e.target.style.height = e.target.scrollHeight + 2 + "px";
		}
	};

  const handleAdd = async() => {
    try {
      const savedBook = await axios.post("http://localhost:8800/books", book)
      !savedBook?.data?.sqlMessage && navigate("/")
    } catch (err) {
      console.log(err);
    }
	};

	return (
		<section id="add-form">
			<h2 className="add-book_title">Add New Book </h2>
			<form
				className="add-book_form"
				onSubmit={(e) => e.preventDefault()}
			>
				<div className="form_item">
					<input
						type="text"
						className="add-book_input"
						name="title"
						placeholder="Title"
						onChange={handleInput}
					/>
					<label className="add-book_label" htmlFor="title" >Title</label>
				</div>
				<div className="form_item">
					<textarea
						rows="2"
						type="text"
						className="add-book_input add-book_textarea"
						name="description"
						placeholder="Description"
						onChange={handleInput}
					/>
					<label className="add-book_label" htmlFor="description">Description</label>
				</div>
				<div className="form_item">
					<input
						type="text"
						className="add-book_input"
						name="cover"
						placeholder="Cover"
						onChange={handleInput}
					/>
					<label className="add-book_label" htmlFor="cover">Cover</label>
				</div>
				<div className="form_item">
					<input
						type="number"
						className="add-book_input"
						name="price"
						placeholder="Price"
						onChange={handleInput}
						min="0"
					/>
					<label className="add-book_label" htmlFor="price" >Price</label>
				</div>
				<button className="add-book_button" onClick={handleAdd} >Add</button>
			</form>
		</section>
	);
};

export default Add;
