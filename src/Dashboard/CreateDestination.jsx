import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createDestination } from '../common/api/destinationApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateDestination = () => {
  const [title, setTitle] = useState('');
  const [airport, setAirport] = useState('');
  const [description, setDescription] = useState('');
 const navigate =useNavigate()
 const stripHtmlTags = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const destinationData = {
    name: title,
    description: stripHtmlTags(description), 
    image: '',
    airport: airport,
  };

  try {
     await createDestination(destinationData);
   
    toast.success("Destination Create Successful!")
    navigate("/dashboard/alldestination")
  } catch (error) {
    toast.error('Error creating destination:', error);
  }
};

  return (
    <div className='p-4 max-w-4xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold text-[#a04747]'>
        Create a Destination
      </h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <input
            type='text'
            placeholder='Your Place Title'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-2 border border-gray-300 rounded-md w-full'
          />
          <input
            type='text'
            placeholder='Your Airport name'
            required
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className='p-2 border border-gray-300 rounded-md w-full'
          />
        </div>

        {/* Text editor */}
        <ReactQuill
        dangerouslySetInnerHTML={{ __html: description }}
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          value={description}
          onChange={setDescription}
        />

        {/* Publish button */}
        <button
          type='submit'
          className='px-4 py-2 bg-gradient-to-r bg-[#c75f5f] font-bold text-white hover:bg-[#a04747] rounded-md shadow-2xl'
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateDestination;
