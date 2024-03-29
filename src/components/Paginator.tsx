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
          window.alert("All quotes have been loaded now.")
          setVisible(false)
          props.pageChanged(next)     
        } 
      }

  return (
    <div className="pagination">
        {visible && <button className='pagination-button' onClick={nextPage}>Load more</button>}
    </div>
  )
}

export default Paginator