import { useParams, useNavigate} from 'react-router-dom'
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/add.scss"

const Update = () => {
	const [book, setBook] = useState({
		title: "",
		description: "",
		cover: "",
		price: 0,
	});
  const navigate = useNavigate()
  const params = useParams()

	const handleInput = (e) => {
		const input = e.target.value;
		const inputName = e.target.name;
    if (inputName === "price") {
		  setBook((prev) => ({ ...prev, price: input }));
    } else {
      const sanitizedInput = input.trim().replace(/[^a-z,/:&_'0-9\s.-]+/gi, ``);
			sanitizedInput && setBook((prev) => ({ ...prev, [inputName]: sanitizedInput }));
    }

		if(inputName === "description") {
			e.target.style.removeProperty("height");
			e.target.style.height = e.target.scrollHeight + 2 + "px";
		}
	};

  useEffect(() => {
    const fetchBook = async() => {
      try {
        const bookRes = await axios.get(`http://localhost:8800/books/${params.id}`)
        setBook(...bookRes.data)
        document.getElementById("book-price").defaultValue = bookRes.data.price;
      } catch (err) {
        console.log(err);
      }
    }
    fetchBook()
  }, [params])

  const handleUpdate = async(e) => {
    try {
      const savedBook = await axios.put(`http://localhost:8800/books/${book.id}`, book)
      !savedBook?.data?.sqlMessage && navigate("/")
    } catch (err) {
      console.log(err);
    }
	};

	return (
		<section id="add-form">
			<h2 className="add-book_title">Update Book</h2>
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
            defaultValue={book.title}
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
            defaultValue={book.description}
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
            defaultValue={book.cover}
						onChange={handleInput}
					/>
					<label className="add-book_label" htmlFor="cover">Cover</label>
				</div>
				<div className="form_item">
					<input
            id='book-price'
						type="number"
						className="add-book_input"
						name="price"
						placeholder={book.price}
            defaultValue={book.price}
						onChange={handleInput}
						min="0"
					/>
					<label className="add-book_label" htmlFor="price" >Price</label>
				</div>
        <button className="add-book_button" onClick={handleUpdate} >Update</button>
			</form>
		</section>
	);
};

export default Update;