import axios from 'axios';
import React from 'react'

const ImageUpload = (props: {uploaded: (url: string) => void}) => {

    //v tej funkciji dobimo file, jih appendamo v nek list in jih poslemo na api
    // potem pa se na product create page preko emittanega eventa
    const upload = async(files: FileList | null) => {
        if(files === null) return;

        const formData = new FormData();
        formData.append('image', files[0])

        const {data} = await axios.post('upload', formData)

        props.uploaded(data.url);
    }

  return (
    <label htmlFor="" className="file-button">
      Upload
         <input type="file" onChange={e => upload(e.target.files)} />
    </label>
  )
}

export default ImageUpload