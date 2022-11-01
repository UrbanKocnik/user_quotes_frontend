import { SyntheticEvent, useEffect, useRef, useState } from "react"
import '../../styles/styles'
import Modal from 'react-modal';
import axios from "axios";
import ResultModal from "../modals/ResultModal";
import ImageUpload from "./ImageUpload";


const ChangePicture = (props:{
    sentImage: string
}) => {
 
  const [confirm, setConfirm] = useState(false);
  const [image, setImage] = useState('');
  const ref = useRef<HTMLInputElement>(null)

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`me/update-image`,
    {
        image
    });

    setConfirm(true)
  }

  useEffect(() => {
    (
      async () => {
        setImage(props.sentImage)
      }
    )()
  }, [])

  Modal.setAppElement('#root');

  const updateImage = (url: string) => {
    if(ref.current){
      ref.current.value = url;
    }
    setImage(url);
  }

  if(confirm){
    return(
      <ResultModal open={true} message={"Your profile settings are saved"} />
    )
  }

  return (
    <div className="padding-right">
      <div className="picture-settings">
          <h1 className="text-lg">Profile <span>settings</span></h1>
          <h3>Change your profile photo</h3>
      </div>
      <div className="picture-content">
      <img src={image} />
      <form onSubmit={submit}>
        <ImageUpload uploaded={updateImage}/>
        <input hidden ref={ref} value={image} className="form-control" required 
        onChange={e => setImage(e.target.value)}/>                
        
      </form>
      <button className="picture-submit-button pointer" type="submit">Submit</button>
      </div>
  </div>
  )
}

export default ChangePicture