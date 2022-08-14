import { Rating } from '@mui/material';
import React from 'react'
import style from './cardreview.module.css';

export default function CardReview({ image, name, rating, content }) {
    return (
        <div className={style.Container}>
            <img src={image} alt={name} />
            <div className={style.Container__Content}>
                <div className={style.Container__Content__NameAndRating}>
                    <p>{name}</p>
                    <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                </div>
                <p>{content}</p>
            </div>
        </div>
    )
}