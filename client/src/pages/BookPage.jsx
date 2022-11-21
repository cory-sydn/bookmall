import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/bookPage.scss'

const BookPage = () => {
  const [book, setBook] = useState({
		title: "",
		description: "",
		cover: "",
		price: 0,
	});
  const params = useParams()

  useEffect(() => {
    const fetchBook = async() => {
      try {
        const bookRes = await axios.get("http://localhost:8800/books/" + params.id)
        setBook(...bookRes.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchBook()
  }, [params])

  return (
    <div>
      <div className='bookPage' key={book.id} >
        <img src={book.cover} alt="book" />
        <div className="content">
          <h2>{book.title} </h2>
          <p className='bookPage_desc'>{book.description} </p>
          <span>€&nbsp;{book.price} </span>
        </div>
      </div>
    </div>
  )
}

export default BookPage