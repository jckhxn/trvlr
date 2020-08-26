import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {createLogEntry} from './API'
const LogEntryForm = ({location, onClose}) => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const { register, handleSubmit  } = useForm();

    const onSubmit = async (data) => {
       
       
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
           
            onClose();
        }
        catch(error)
        {
            setError(error.message);
            setLoading(false);
        }
    }


    return(
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        {error? <h3 className="error">{error}</h3> : null}
        <label htmlFor='title'>
            Title
        </label>
        <input name="title" required ref={register}></input>

        <label htmlFor='comments'>
            comments
        </label>
        <textarea name="comments" rows={3} ref={register}></textarea>

        <label htmlFor='description'>
            description
        </label>
        <textarea name="description" rows={3} ref={register} ></textarea>

        <label htmlFor="image">Image</label>
        <input name="image" ref={register}/>

        <label htmlFor="visitDate" >Visit Date</label>
        <input name="visitDate" type="date" required ref={register} />
    
            <button diabled={loading}> {loading? 'Loading..' : 'Create Entry!'} </button>
    </form>
    )
}


export default LogEntryForm;