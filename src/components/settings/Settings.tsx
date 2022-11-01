import { SyntheticEvent, useEffect, useState } from "react"
import '../../styles/styles'
import Modal from 'react-modal';
import axios from "axios";
import User from "../../models/user";
import Quote from "../../models/quote";
import ModalComp from "../modals/ModalComp";
import AddQuote from "../actions/AddQuote";
import ResultModal from "../modals/ResultModal";
import ChangePassword from "./ChangePassword";
import ChangePicture from "./ChangePicture";

const Settings = (props: {
    loggedUser: User
}) => {
 
  const [pictureIsOpen, setPictureIsOpen] = useState(false);
  const [passwordIsOpen, setPasswordIsOpen] = useState(false);
  const [user, setUser] = useState(new User());
  const [confirm, setConfirm] = useState(false);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function changePwModal(){
    setPasswordIsOpen(true)  
  }

  function ChangePfpModal(){
    setPictureIsOpen(true)  
  }

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put(`me/update-info`,
    {
        first_name: first_name,
        last_name: last_name,
        email: email
    });
    setConfirm(true)
  }


  Modal.setAppElement('#root');

  useEffect(() => {
    (
        async () => {           
            if(props.loggedUser.id !== 0){
                setUser(new User(
                    props.loggedUser.id,
                    props.loggedUser.first_name,
                    props.loggedUser.last_name,
                    props.loggedUser.email,
                    props.loggedUser.image
                ))

                setEmail(user.email)
                setFirstName(user.first_name)
                setLastName(user.last_name)
            }
          }
    )()
  }, [])

  if(confirm){
    return(
      <ResultModal open={true} message={"Your profile settings are saved"} />
    )
  }

  return (

    <div className="profile-settings">
        <h1 className="text-lg">Profile <span>settings</span></h1>
        <h3>Change your profile settings</h3>
        <form onSubmit={submit} className="settings-form">
          <div>
            <label>Email</label>
            <input type="email" className="modal-email-input" defaultValue={user.email} required onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="settings-name">
            <div className="first-name">
              <label>First name</label>
              <input type="first_name" className="settings-name-input" defaultValue={user.first_name} required onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="first-name">
              <label>Last name</label>
              <input type="last_name" className="settings-name-input" defaultValue={user.last_name} required onChange={e => setLastName(e.target.value)}/>
            </div>
          </div>
          <div id="root" className="settings-buttons">
            <div>
              <a onClick={changePwModal} className="pointer change-pw-button" >Change password</a>
              {passwordIsOpen && <ModalComp open={passwordIsOpen} children={<ChangePassword />} stayOpen={setPasswordIsOpen} />}
            </div>
            <div>
              <a onClick={ChangePfpModal} className="pointer change-pfp-button">Change profile picture</a>
              {pictureIsOpen && <ModalComp open={pictureIsOpen} children={<ChangePicture sentImage={user.image} />} stayOpen={setPictureIsOpen} />}
            </div>
          </div>
            <br />
            <button className="modal-submit-button pointer" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Settings