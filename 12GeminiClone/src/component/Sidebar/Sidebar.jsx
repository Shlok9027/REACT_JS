import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {

  const [extended, setExtended] = useState(false)
  const {onSent, prevPrompts, setRecentPrompt , newChat} = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  return (
    <div className='sidebar'>
      <div className="top">
        <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended?<p>New Chat</p>:null}
        </div>
        {extended
        ?<div className="recent recent-entry">
        <p className="recent-title">Recent</p>
        {prevPrompts.map((item,index) => {
          return ( 
          <div className="recent-entry">
            <img onClick={() => loadPrompt(item)} src={assets.message_icon} alt="" />
            <p>{item.slice(0,21)} ...</p>
          </div>

          )

        })}
       
      </div>
      :null
      }
        
      </div>
      <div className="bottom recent-entry">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Setting</p>:null}
        </div>
      </div>
    </div>     
  );
}

export default Sidebar;
