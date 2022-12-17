import React, { useEffect, useState,useCallback } from 'react'
import axios from "axios"
import '../styles/books.scss'
import {Link, useNavigate} from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth0();

  const fetchBooks = useCallback(async() => {
    try {
      const res = await axios.get("http://localhost:8800/books/")
      setBooks(res.data)
    } catch (error) {
      if(axios.error) console.log(error);
    }
  }, [setBooks])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const handleDelete = async(id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id)
      fetchBooks()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <section className='books'>
        {books.map(book => (
          <div className='book' key={book.id} >
            <Link to={"/book/"+book.id} >
              <img src={book.cover} alt="book" />
              <h2>{book.title} </h2>
              <p className='book_desc'>{book.description.length > 60 ? `${book.description.substring(0, 60)}...` : book.description } </p>
              <span>€&nbsp;{book.price} </span>
            </Link>
            {isAuthenticated &&
              <div className="book_buttons">
                <button className="book_delete-button" onClick={() => handleDelete(book.id)} >Delete</button>
                <button className="book_update-button" onClick={() => navigate(`/update/${book.id}`)}>Update</button>
              </div>
            }
          </div>
        ))}
      </section>
    </div>
  )
}

export default Books