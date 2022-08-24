import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import './loadingSlider.css'

export default function LoadingSlider() {
  return (
    <div className='container-loading-slider'>
        <div className="loading-slider">
           <Skeleton variant="rectangular" width={175} height={250}  sx={{ bgcolor: '#565661'}} />         
        </div>

        <div className="loading-slider">
           <Skeleton variant="rectangular" width={175} height={250}  sx={{ bgcolor: '#565661'}}/>         
        </div> 

        <div className="loading-slider">
           <Skeleton variant="rectangular" width={175} height={250}  sx={{ bgcolor: '#565661'}}/>         
        </div> 

        <div className="loading-slider">
           <Skeleton variant="rectangular" width={175} height={250}  sx={{ bgcolor: '#565661'}}/>         
        </div> 

        <div className="loading-slider">
           <Skeleton variant="rectangular" width={175} height={250}  sx={{ bgcolor: '#565661'}}/>         
        </div>        
    </div>
  )
}
