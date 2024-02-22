import React, { useState } from 'react'
import '../style/home.css'
import icons1 from '../Icons/1.png'
import icons2 from '../Icons/2.png'
import icons3 from '../Icons/3.png'
import icons4 from '../Icons/4.png'
import user from '../Icons/user.png'

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [inputText, setInputText] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const message_owners = [
    {
      name: 'Amit',
      status: 'Avaliable',
      discrip: 'Amazon Product',
      email: "abc@gmail.com",
      phone: "75237537583"
    },
    {
      name: 'Mary',
      status: 'Avaliable',
      discrip: 'Amazon Product',
      email: "efg@gmail.com",
      phone: "54673538537"
    },
    {
      name: 'John',
      status: 'Avaliable',
      discrip: 'Amazon Product',
      email: "kfg@gmail.com",
      phone: "963587452485"
    },
  ]
  const handleConversationClick = (index) => {
    setSelectedConversation(index);
    // Initialize messages for the selected profile if not already present
    if (!messages[message_owners[index].name]) {
      setMessages({ ...messages, [message_owners[index].name]: [] });
    }
    setSelectedProfile(message_owners[index]);
  };
  const handleMessageInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      
      const newMessage = {
        text: inputText,
        sender: 'You' // Assuming the sender is the current user
      };
      setMessages({ ...messages, [message_owners[selectedConversation]?.name]: [...messages[message_owners[selectedConversation]?.name], newMessage] });
      setInputText('');
      try {
        const response = await fetch('http://localhost:8080/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profileName: message_owners[selectedConversation]?.name,
            message: inputText,
          }),
        });
  
        if (response.ok) {
          // Message sent successfully, you can update the UI if needed
          const data = await response.json();
          console.log(data); // You can handle response from the backend
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };


  return (
    <div className='w-full flex'>
      <div className='bg-[#004e96] w-[5%] border border-grey h-screen'>
        <div className="m-4">
          <img className="images" src={icons1} alt="" />
        </div>

        <div className="select m-4">
          <img className="images" src={icons2} alt="" />
        </div>

        <div className="m-4">
          <img className="images" src={icons3} alt="" />
        </div>

        <div className="m-4">
          <img className="images" src={icons4} alt="" />
        </div>

        <div className="m-4">
          <div className="inner"></div>
          <img src={user} width={75} height={75} />
        </div>


      </div>
      <div className='w-[20%] border border-grey h-screen'>
        <div className="flex justify-center items-center">
          <div className="border border-grey w-screen">
            <h3 className='text-3xl'>Conversation</h3>
          </div>
        </div>
        <div className='flex text-lg item-left'>
          Message
        </div>
        {message_owners.map(({ name, status, discrip }, index) => (
          <div key={index} className='flex items-center my-8 border-b cursor-pointer' onClick={() => handleConversationClick(index)}>
            <div style={{ padding: '2rem' }}>
              <h3 className='text-2xl'>{name}</h3>
              <p className='text-sm text-gray-500'>{status}</p>
            </div>
            <p className='ml-5 text-lg text-gray-500'>{discrip}</p>
          </div>
        ))}
      </div>
      <div className='w-[50%] border border-grey h-screen flex flex-col items-center'>
        <div className="border border-grey w-[100%]">
          <div className="h-[35px]" style={{ padding: "5px" }}>
            <h3 className='text-lg font-bold ' style={{ alignItems: "left" }}>{selectedProfile?.name}</h3>
          </div>
        </div>
        <div className='h-screen border w-full overflow-scroll border-b-1'>
          <div className="h-[1000px] px-10 py-14">
            <div className=' max-w-[50%] bg-[#dee2e6] rounded-b-xl p-4'>
              Hello I need you help !
            </div>
            {/* <div className=' max-w-[40%] bg-primary rounded-b-xl ml-auto text-white p-4'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam architecto
            </div> */}
             {messages[message_owners[selectedConversation]?.name]?.map((message, index) => (
            <div key={index} className={`max-w-[40%] rounded-b-xl ml-auto p-4 ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-[#dee2e6] text-black'}`}>
              {message.text}
            </div>
          ))}
          </div>
        </div>
        <div className="inpu flex p-8 w-full">
          {/* <input className='input_msg rounded-full bg-light focus:ring-0 focus:broder-0 outline-none shadow-md' placeholder="type a message" /> */}
          <input className='input_msg rounded-full bg-light focus:ring-0 focus:broder-0 outline-none shadow-md' placeholder='type a message' value={inputText} onChange={handleMessageInputChange} />
          <div className='ml-4 p-2 cursor-pointer bg-light rounded-full' onClick={handleSendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
          </div>
        </div>
      </div>

      <div className='w-[25%] border border-grey h-screen'>
      {selectedProfile && (
          <div className='w-full'>
            <div className='h-[25%]    m-10px ' style={{ height: '500px' }}>
              <div className='profile'>
                <img className='img' src={user} alt='' />
                <h3 className='text-lg font-bold ' style={{ alignItems: 'left' }}>{selectedProfile.name}</h3>
                <p className='ml-5 text-sm text-gray-500'>online</p>
                <div className='flex justify-center'>
                  <button className='btn border w-80 rounded-b-xl'>Call</button>
                  <button className='btn border w-80 rounded-b-xl'>Profile</button>
                </div>
              </div>
              <div className='details'>
                <h3 className='font-semibold my-5'>Details</h3>
                <div className='info'>
                  <ul>
                    <li>Name : {selectedProfile.name}</li>
                    <li>Email : {selectedProfile.email}</li>
                    <li>Phone no : {selectedProfile.phone}</li>
                  </ul>
                </div>
              </div>
         
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
