import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi';
import { BsCartCheck, BsFacebook, BsTwitter, BsLinkedin, BsGoogle } from 'react-icons/bs';
import Rating from '@mui/material/Rating';
import { Link, NavLink, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AddCart, dataUser, FilterTheme, getCartUser } from '../../redux/features/data/dataSlice'
import style from "./Detail.module.css"
import { RiShoppingCartLine } from "react-icons/ri"
import axios from 'axios'
import Spinner from '../auxiliar/Spinner/Spinner';
import CardReview from './CardReview/CardReview.js'
import CommentBox from './CommentBox/CommentBox';
import CardComment from './CardComment/CardComment';
import { fabClasses } from '@mui/material';
import { Paginacion } from '../Home/Pagination/Pagination';



const { REACT_APP_API } = process.env

function Detail() {

  let userr = useSelector(state => state.data.user)
  const [userData, setUserData] = useState(false)

  const dispatch = useDispatch()
  const { id } = useParams()
  const [details, setDetails] = useState(false)

  //------ STATE PARA LA APARICION DE ELEMENTOS EN EL DOM --------------------

  const [error, setError] = useState({
    error: false,
    content: ""
  })


  //------ STATE PARA LA APARICION DE ELEMENTOS EN EL DOM --------------------


  const [viewEditComment, setViewEditComment] = useState(false)
  const [cartCheck, setCartCheck] = useState(false)
  const [cambios, setCambios] = useState(false)



  //---------STATE PARA CARGAR COMMENTARIO NUEVO A LA DB---------------------

  const [comment, setComment] = useState("")

  //--------LOGICA PARA OBTENER LA INFORMACION DEL ARTICULO ---------------------



  async function main() {
    let user = JSON.parse(window.localStorage.getItem("user"));

    let data = await axios.get(REACT_APP_API + `/books/id/${id}`);
    setDetails({...data.data,
      comments: data.data.comments.filter(e=> !e.flagged)})

    if (user !== null) {
      let dataUsuario = await axios.get(REACT_APP_API + `/user/${user.id}`);
      setUserData(dataUsuario.data)
    }
  }

  useEffect(() => {
    main()
  }, [])

  //----------LOGICA PARA AGREGAR EL LIBRO AL CARRITO------------------


  const addToCart = async () => {
    //Aca iria el dispatch de la actions que agregaria el item al carrito
    setCartCheck(true)
    if (userr || window.localStorage.getItem("user")) {
      let idBook = id;
      let auxUser = JSON.parse(window.localStorage.getItem("user"))
      let idUser = auxUser.id
      await axios.post(REACT_APP_API + '/cart/add', {
        idUser, idBook
      })
      dispatch(getCartUser(idUser))
    } else {
      dispatch(AddCart(id))
    }
    setTimeout(() => {
      setCartCheck(false)
    }, 2000);
  }

  //---------LOGICA PARA OBTENER LA FECHA ACTUAL PARA LA EDICION DE LA REVIEW

  let date = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


  //URL DEL ARTICULO PARA COMPARTIR EN REDES SOCIALES

  let article_url = window.location.href;


  //------------LOGICA PARA EL APARTADO DE RECOMENDADOS-------------

  const tematica = [
    'mongo',
    'mongodb',
    'mongoose',
    'java',
    'javascript',
    ' html',
    'css',
    'python',
    'php',
    'react',
    'redux',
    'perl',
    'swift',
    'rust',
    'sql',
    'ruby',
    'ajax',
    'typescript',
    'express.js',
  ];

  let existe;

  tematica.forEach(e => {
    if (details && details.title.indexOf(e) !== -1) {
      existe = e
    }
  })

  async function filterTematica() {

    try {
      let data = await axios.get(REACT_APP_API + `/books/${existe}`);
      dispatch(FilterTheme(data.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    details && filterTematica()
  }, [details])

  let theme = useSelector(state => state.data.Theme)
  details && console.log("detalles ", details)
  //-------------FUNCION QUE CARGA EL COMENTARIO A LA DB ---------------------

  let user;

  if (!window.localStorage.getItem("user")) {
    user = [0, "user.png", "user"]
  } else {
    let usuario = JSON.parse(window.localStorage.getItem("user"))
    user = [usuario.id, usuario.img, usuario.name]
  }
  // let usuario = JSON.parse(window.localStorage.getItem("user"))
  // let user = [usuario.id, usuario.img, usuario.name]


  const handleComment = async (setDetails) => {
    let content = comment
    let fecha = date.toLocaleDateString('en-US', options)

    if (comment.length >= 10) {
      setError({
        error: "",
        content: ""
      })
      let user;

      if (window.localStorage.getItem("user") === undefined) {
        user = [0, "user.png", "user"]
      } else {
        let usuario = JSON.parse(window.localStorage.getItem("user"))
        user = [usuario.id, usuario.img, usuario.name]
      }

      await axios.post(REACT_APP_API + `/comments/${id}`, {
        content, fecha, user
      })

      setComment("")
      let data = await axios.get(REACT_APP_API + `/books/id/${id}`);
      setDetails(data.data)
    } else {
      setError({
        error: "comment",
        content: "If you want to leave a comment, containing more than 10 characters"
      })
    }
  }


  // ---------- LOGICA PARA SABER SI EL USUARIO PUEDE DEJAR SU REVIEW EN ESTE POST

  const [reviewUser, setReviewUser] = useState(false)
  const [existeReview, setExisteReview] = useState(false)
  const [unicaReview, setUnicaReview] = useState(false)

  const [review, setReview] = useState("")
  const [dateReview, setDateReview] = useState(date.toLocaleDateString('en-US', options))
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (userData) {
      userData.buy?.forEach(c => {
        if (c.isbn13 === id) {
          setReviewUser(true)
        }
      })
      userData.reviews?.forEach(c => {
        if (c.book === id) {
          setExisteReview(true)
          setReview(c.review)
          setDateReview(c.status)
          setRating(c.rating)
          console.log("entro a las review", c)
        }
      })
    }

  }, [userData])

  //---------LOGICA PARA AGREGAR REVIEW DEL USUARIO ----------

  const addReview = async () => {
    if (review.length >= 10) {
      setError({
        error: "",
        content: ""
      })
      setExisteReview(true);

      let date = new Date();
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      setDateReview(date.toLocaleDateString('en-US', options))

      let usuario = JSON.parse(window.localStorage.getItem("user"))

      await axios.post(REACT_APP_API + `/review/${usuario.id}`, {
        book: id, bookImg: details.image, bookTitle: details.title, bookAuthor: details.authors, rating, status: dateReview, review
      })

      let dataUsuario = await axios.get(REACT_APP_API + `/user/${usuario.id}`);
      setUserData(dataUsuario.data)

    } else if (review.length < 10) {
      setError({
        error: "review",
        content: "The minimum character to leave a review is 10"
      })
    }

  }

  //---------LOGICA PARA EL CAMBIO DE LA REVIEW DEL USUARIO----------

  const editReview = async () => {
    if (review.length >= 10) {
      setViewEditComment(false)
      let date = new Date();
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let fecha = date.toLocaleDateString('en-US', options)
      setDateReview(fecha)
      await axios.put(REACT_APP_API + `/review/edit/${usuario.id}`, {
        book: id, rating, status: fecha, review
      })

      let dataUsuario = await axios.get(REACT_APP_API + `/user/${usuario.id}`);
      setUserData(dataUsuario.data)
    } else {
      setError({
        error: "review",
        content: "The minimum character to leave a review is 10"
      })
    }

  }

  //---------LOGICA PARA SABER SI LA UNICA REVIEW QUE HAY ES DEL USUARIO ----------
  let usuario = JSON.parse(window.localStorage.getItem("user"))

  // const [sumaRating, setSumaRating] = useState(0)


  useEffect(() => {
    details && details.reviews.forEach(r => {
      // setSumaRating(sumaRating + r.rating)
      if (usuario !== null) {
        if (details.reviews.length === 1) {
          if (r.userId !== undefined) {
            if (r.userId === usuario.id) {
              setUnicaReview(true)
            }
          }
        }
      }
    })
  }, [details, dataUser])

  //---------LOGICA PARA CALCULAR LA PUNTUACION DEL POST ----------

  const [total, setTotal] = useState(Math.random() * 5)

  //---------LOGICA PARA EL PAGINADO DE COMENTARIOS ----------

  const [pagina, setPagina] = useState(1);

  const porPagina = 5;
  let maximo;
  let ceil;

  if (details) {
    ceil = details.comments.length / porPagina;
    maximo = Math.ceil(ceil)
  }

  //---------LOGICA PARA EL PAGINADO DE COMENTARIOS ----------

  const [paginadoReview, setPaginadoReview] = useState(1);

  const porPaginaReview = 5;
  let maximoReview;
  let ceilReview;

  if (details) {
    ceilReview = details.reviews.length / porPaginaReview;
    maximoReview = Math.ceil(ceilReview)
  }


  return (
    <div className={style.Container}>
      {details ?
        <>
          <div className={style.Container__Content}>
            <head>
              {/* estos metas tags son necesarios para compartir en las redes sociales las publicaciones */}
              <meta name="description" content={details.desc} />
              <meta name="author" content={details.authors} />
              <meta property="og:locale" content="en_US" />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={details.title} />
              <meta property="og:description" content={details.desc} />
              <meta property="og:url" content={`http://localhost:3000/book/${id}`} />
              <meta property="og:site_name" content="BooksTech" />
              <meta property="og:image" content={details.image} />
              <meta name="twitter:title" content={details.title} />
              <meta name="twitter:description" content={details.desc} />
              <meta name="twitter:image" content={details.image} />
              <meta name="twitter:card" content={details.image} />
              <meta name="twitter:url" content={`http://localhost:3000/book/${id}`} />
            </head>
            <div className={style.Container__Content__Info}>
              <div className={style.Container__Content__Info__Img}>
                <img src={details.image} className={style.Container__Content__Info_Img} />

                {cartCheck ?
                  <button className={style.Container__Content__Info__Img_button} onClick={() => addToCart()}>Added to Cart <BsCartCheck /> </button>
                  :
                  <button className={style.Container__Content__Info__Img_button} onClick={() => addToCart()}>Add to Cart for {details.price}  <RiShoppingCartLine /> </button>
                }

              </div>
              <div className={style.Container__Content__Info__details}>
                <div className={style.Container__Content__Info__details_title}>
                  <h1>{details.title.charAt(0).toUpperCase() + details.title.slice(1)}</h1>
                  <h3>{details.subtitle.charAt(0).toUpperCase() + details.subtitle.slice(1)}</h3>
                </div>
                <div className={style.Container__Content__Info__details_author}>
                  <h3>By {details.authors.toUpperCase()}</h3>
                </div>
                <div className={style.Container__Content__Info__details_rating}>
                  <Rating name="half-rating-read" defaultValue={total} precision={0.5} readOnly />
                  <p>{total.toFixed(1)}</p>
                </div>
                <div className={style.Container__Content__Info__details_description}>
                  <p>{details.desc}</p>
                </div>
                <div className={style.Container__Content__Info__details_ficha}>
                  <p>PaperBack: {details.pages} Pages</p>
                  <p>Published: {details.publisher.charAt(0).toUpperCase() + details.publisher.slice(1)} {details.year}</p>
                  <p>Lenguage: {details.language.charAt(0).toUpperCase() + details.language.slice(1)}</p>
                </div>
              </div>
            </div>
            <div className={style.Container__Content__Acitivity}>
              {userr || window.localStorage.getItem("user") ?
                <div className={style.Container__Content__Acitivity__Details}>
                  <h4>MY ACITIVITY</h4>
                  <hr />
                  {reviewUser ?
                    existeReview ?
                      <>
                        <div className={style.Container__Content__Acitivity__Details_element}>
                          <p>Rating</p>
                          {viewEditComment ?
                            <Rating name="half-rating" defaultValue={rating} precision={0.5} onChange={e => setRating(e.target.value)} />
                            :
                            <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                          }
                          <p> {rating}</p>
                        </div>
                        <div className={style.Container__Content__Acitivity__Details_element}>
                          <p>Status</p>
                          <p className={style.Container__Content__Acitivity__Details_element_info}>{dateReview}</p>
                        </div>
                        {viewEditComment ?
                          <div className={style.Container__Content__Acitivity__Details_element}>
                            <p>Review</p>
                            <input type="text" value={review} name="content" onChange={e => setReview(e.target.value)} />
                            <button onClick={() => editReview()}>Edit Review</button>
                          </div>
                          :
                          <>
                            <div className={style.Container__Content__Acitivity__Details_element}>
                              <p>Review</p>
                              <p className={style.Container__Content__Acitivity__Details_element_info}>{review.charAt(0).toUpperCase() + review.slice(1)}</p>
                              <BiEdit onClick={() => setViewEditComment(true)} />
                            </div>
                            {error.error === "review" ? <p className={style.Container__Error}>{error.content}</p> : null}
                          </>
                        }
                      </>
                      :
                      <>
                        <div className={style.Container__Content__Acitivity__Details_element}>
                          <p>Rating</p>
                          <Rating name="half-rating" defaultValue={rating} precision={0.5} onChange={e => setRating(e.target.value)} />

                        </div>
                        <div className={style.Container__Content__Acitivity__Details_element}>
                          <p>Review</p>
                          <input type="text" value={review} name="content" onChange={e => setReview(e.target.value)} />
                          <button onClick={() => addReview()}>Enter the review</button>
                        </div>
                        {error.error === "review" ? <p className={style.Container__Error}>{error.content}</p> : null}
                      </>
                    :
                    <>
                      <p>To leave your review, you first have to buy it</p>
                      <div className={style.Container__Separador} />
                    </>

                  }
                  <div className={style.Container__Content__Acitivity__Details}>
                    <h4>MORE REVIEWS</h4>
                    <hr />
                    <div className={style.Container__Content__Acitivity__Details}>
                      {unicaReview ?
                        <>
                          <p>There are no reviews for this book</p>
                          <div className={style.Container__Separador} />

                        </>
                        :

                        details.reviews.length > 0 ?
                          <>
                            {details.reviews.slice(
                              (paginadoReview - 1) * porPaginaReview,
                              (paginadoReview - 1) * porPaginaReview + porPaginaReview
                            ).map(c => {
                              if (c.userId !== userData._id) {
                                return (
                                  <CardReview
                                    image={c.userImg}
                                    name={c.userName}
                                    content={c.review}
                                    rating={c.rating}
                                  />
                                )
                              }
                            })}
                            <div className={style.Container__Centrar}>
                              {details.reviews.length > 5 ?
                                <Paginacion
                                  pagina={paginadoReview}
                                  setPagina={setPaginadoReview}
                                  maximo={maximoReview}
                                />
                                :
                                null
                              }
                            </div>
                          </>
                          :
                          <>
                            <p>There are no reviews for this book</p>
                            <div className={style.Container__Separador} />

                          </>
                      }
                    </div>
                  </div>
                  <div className={style.Container__Content__Acitivity__Details}>
                    <h4>COMMENTS</h4>
                    <hr />

                    <div className={style.Container__Content__Acitivity__Details}>
                      <CommentBox
                        setComment={setComment}
                        handleComment={handleComment}
                        setDetails={setDetails}
                        comment={comment}
                        error={error}
                      />
                      {details.comments.slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                      ).map(c => {
                        return (
                          <CardComment
                            name={c.user[2]}
                            content={c.content.charAt(0).toUpperCase() + c.content.slice(1)}
                            image={c.user[1]}
                            date={c.date}
                            iduser={c.user[0]}
                            idBook={id}
                            idComment={c._id}
                            key={c._id}
                            setCambios={setDetails}
                          />
                        )
                      })}
                      <div className={style.Container__Centrar}>
                        {details.comments.length > 5 ?
                          <Paginacion
                            pagina={pagina}
                            setPagina={setPagina}
                            maximo={maximo}
                          />
                          :
                          null
                        }
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className={style.Container__Content__Acitivity__Details}>
                  <div className={style.Container__Content__Acitivity__Details}>
                    <h4>MORE REVIEWS</h4>
                    <hr />
                    <p>To see what friends thought of this book, please <Link className={style.LinkStyle} to="/signin">Sign In</Link></p>
                    <div className={style.Container__Separador} />

                  </div>
                  <div className={style.Container__Content__Acitivity__Details}>
                    <h4>COMMENTS</h4>
                    <hr />
                    <p>To leave a comment on {details.title}, please <Link className={style.LinkStyle} to="/signin">Sign In</Link></p>
                    <div className={style.Container__Separador} />
                    <div className={style.Container__Content__Acitivity__Details}>
                      {
                        details.comments.map(c => {
                          return (
                            <CardComment
                              name={c.user[2]}
                              content={c.content.charAt(0).toUpperCase() + c.content.slice(1)}
                              image={c.user[1]}
                              date={c.date}
                              iduser={c.user[0]}
                              idBook={id}
                              idComment={c._id}
                              key={c._id}
                              setCambios={setDetails}
                            />
                          )
                        })}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className={style.Container__BarRight}>
            <div className={style.Container__BarRight__Apart}>
              <div className={style.Container__BarRight__Apart_Title}>
                <h1>Share</h1>
              </div>
              <div className={style.Container__BarRight__Apart__Redes}>
                <div>
                  <a href={`http://www.facebook.com/sharer.php?u=${article_url}`} target="_blanck"><BsFacebook /></a>
                  <a href={`http://twitter.com/share?url='${article_url}`} target="_blanck"><BsTwitter /></a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${article_url}&title=${details.title}`} target="_blanck"><BsLinkedin /></a>
                </div>
              </div>
            </div>
            <div className={style.Container__BarRight__Apart}>
              <div className={style.Container__BarRight__Apart_Title}>
                <h1>Recommended</h1>
              </div>
              <div className={style.Container__BarRight__Apart__Container}>
                {theme.length > 0 ?
                  theme.slice(1, 6).map(c => {
                    return (
                      <a href={`/book/${c.isbn13}`} className={style.Container__BarRight__Apart__Container__Card}>
                        <img src={c.image} alt={c.title} />
                        <div className={style.Container__BarRight__Apart__Container__Card__info}>
                          <h3>{c.title.charAt(0).toUpperCase() + c.title.slice(1)}</h3>
                          <h4>Author: {c.authors.charAt(0).toUpperCase() + c.authors.slice(1)}</h4>
                          <p>{c.subtitle.charAt(0).toUpperCase() + c.subtitle.slice(1)}</p>
                        </div>
                      </a>
                    )
                  })
                  :
                  <Spinner />
                }
              </div>
            </div>
          </div>
        </>
        :
        <Spinner />
      }
    </div>
  )
}

export default Detail