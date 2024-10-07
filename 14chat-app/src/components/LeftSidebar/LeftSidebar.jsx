import React, { useEffect, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../Assets/assets";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { getDoc } from "firebase/firestore";
import { logout } from "../../config/firebase";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const {
    chatData,
    userData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
    chatVisible,
    setChatVisible,
    setChatData,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    const input = e.target.value;

    if (input) {
      setShowSearch(true);
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          const foundUser = querySnap.docs[0].data();
          const userExists = chatData.some((chat) => chat.rId === foundUser.id);

          if (!userExists) {
            setUser(foundUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setShowSearch(false);
    }
  };

  const addChat = async () => {
    if (!user) return;

    try {
      const messagesRef = collection(db, "messages");
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createAt: serverTimestamp(),
        messages: [],
      });

      const chatsRef = collection(db, "chats");

      // Update the new user's chat data
      const chatUserDocRef = doc(chatsRef, user.id);
      const chatUserSnap = await getDoc(chatUserDocRef);
      if (!chatUserSnap.exists()) {
        await setDoc(chatUserDocRef, { chatsData: [] });
      }
      await updateDoc(chatUserDocRef, {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      // Update the current user's chat data
      const userDocRef = doc(chatsRef, userData.id);
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) {
        await setDoc(userDocRef, { chatsData: [] });
      }
      await updateDoc(userDocRef, {
        chatsData: arrayUnion({
          messageId: newMessageRef.id,
          lastMessage: "",
          rId: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      const uSnap = await getDoc(doc(db, "users", user.id));
      const uData = uSnap.data();

      const newChat = {
        messagesId: newMessageRef.id,
        lastMessage: "",
        rId: user.id,
        updatedAt: Date.now(),
        messageSeen: true,
        userData: uData,
      };

      setChatUser(newChat);
      setMessagesId(newMessageRef.id);
      setChatData((prev) => [...prev, newChat]);
      setShowSearch(false);
      setChatVisible(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setChat = async (item) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);

      const userChatsRef = doc(db, "chats", userData.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      const userChatsData = userChatsSnapshot.data();
      const chatIndex = userChatsData.chatsData.findIndex(
        (c) => c.messageId === item.messageId
      );

      if (chatIndex > -1) {
        userChatsData.chatsData[chatIndex].messageSeen = true;
        await updateDoc(userChatsRef, {
          chatsData: userChatsData.chatsData,
        });
      }

      setChatVisible(true);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const updateChatUserData = async () => {
      if (chatUser) {
        const userRef = doc(db, "users", chatUser.userData.id);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        setChatUser((prev) => ({ ...prev, userData }));
      }
    };

    updateChatUserData();
  }, [chatData]);

  return (
    <div className={`ls ${chatVisible ? "hidden" : ""}`}>
      <div className="ls-top">
        <div className="ls-nav">
          <img className="logo" src={assets.logo_icon} alt="Logo" />
          <p className="chats">Doodle Chat</p>
          <div className="menu">
            <img src={assets.menu_icon} alt="Menu Icon" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="Search Icon" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here..."
          />
        </div>
      </div>

      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="User Avatar" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData.map((item, index) => (
            <div
              key={index}
              onClick={() => setChat(item)}
              className={`friends ${
                item.messageSeen || item.messageId === messagesId
                  ? ""
                  : "border"
              }`}
            >
              <img src={item.userData.avatar} alt="Chat Avatar" />
              <div>
                <p>{item.userData.name}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
