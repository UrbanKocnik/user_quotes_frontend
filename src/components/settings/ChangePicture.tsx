import { SyntheticEvent, useEffect, useState } from "react"
import '../../styles/quoteCard.css'
import Modal from 'react-modal';
import axios from "axios";
import ResultModal from "../modals/ResultModal";
import ImageUpload from "./ImageUpload";

const ChangePicture = (props:{
    sentImage: string
}) => {
 
  const [confirm, setConfirm] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [image, setImage] = useState('');


  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
/*
    await axios.put(`me/update-password`,
    {
        current_password: currentPassword,
        password: newPassword,
        password_confirm: confirmNewPassword
    });*/
    setConfirm(true)
  }

  useEffect(() => {
    (
      async () => {
        setProfilePicture(props.sentImage)
      }
    )()
  }, [])

  Modal.setAppElement('#root');

  if(confirm){
    return(
      <ResultModal open={true} message={"Your profile settings are saved"} />
    )
  }

  return (

    <div>
        <h1>Profile settings</h1>
        <h3>Change your profile photo</h3>
        <div>{profilePicture}</div>
        <form onSubmit={submit}>
            <div className="mb-3">
                <div className="input-group">
                    <input type="text" value={image} className="form-control" required 
                    onChange={e => setImage(e.target.value)}/>
                    
                    <ImageUpload uploaded={setImage}/>
                </div>                  
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default ChangePicture