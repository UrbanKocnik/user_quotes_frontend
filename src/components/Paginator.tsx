import React, { useEffect, useState } from 'react'

const Paginator = (props: 
    {lastPage: number,
    currPage: number,
    multiplier: number,
    pageChanged: (page: number) => void
    }) => {
      const [visible, setVisible] = useState(true)

    const nextPage = () => {
        const next = props.multiplier + 1;
        if(props.lastPage > 1){
          if(props.lastPage === 2){
            props.pageChanged(next)
            setVisible(false)
          }
          else{
            props.pageChanged(next)
          }   
        }
        else{
          window.alert("No more quotes to load")
          setVisible(false)
        } 
      }

  return (
    <div className="pagination">
        {visible && <button className='page-link' onClick={nextPage}>Load more</button>}
    </div>
  )
}

export default Paginator