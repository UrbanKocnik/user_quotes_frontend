import React, { useEffect, useState } from 'react'

const Paginator = (props: 
    {lastPage: number,
    currPage: number,
    pageChanged: (page: number) => void
    }) => {
      const [visible, setVisible] = useState(true)

    const nextPage = () => {
        const next = props.currPage + 1;
        if(next < props.lastPage){
          props.pageChanged(next)
        }
        else if (next === props.lastPage){
          props.pageChanged(next)
          setVisible(false);
        }
        else{
          setVisible(false)
          window.alert("No more quotes to load")
        }
        
      }

  return (
    <div className="pagination">
        {visible && <button className='page-link' onClick={nextPage}>Load more</button>}
    </div>
  )
}

export default Paginator