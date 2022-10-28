import React, { useEffect, useState } from 'react'

const Paginator = (props: 
    {lastPage: number,
    multiplier: number,
    pageChanged: (page: number) => void
    }) => {
      const [visible, setVisible] = useState(true)
    const nextPage = () => {
        const next = props.multiplier + 1;
        const diff = props.lastPage - next;
        if(diff > 0){
          props.pageChanged(next) 
        }
        else{
          window.alert("No more quotes to load")
          props.pageChanged(next)
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