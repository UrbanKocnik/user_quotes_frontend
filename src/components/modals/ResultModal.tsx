import React, { useEffect } from 'react'
import Modal from 'react-modal'


const ResultModal = (props:{
  message: string,
  open: boolean
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(props.open)
  })

  return (
    <div>
      <Modal
        className='result-modal'
        isOpen={modalIsOpen}
        onRequestClose={()=> window.location.reload()}>
        <h1 className='text-lg padding-below'>{props.message}</h1>
        <button className='result-cancel-button pointer' onClick={()=> window.location.reload()}>Close</button>
      </Modal>
    </div>
  )
}

export default ResultModal