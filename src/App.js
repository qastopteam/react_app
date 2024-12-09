import logo from './logo.svg';
import './App.css';
import './styles.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin,googleLogout} from '@react-oauth/google';
import Overview from './Overview';
import About_Us from './about_us';
import Accelerator from './accelerator';
import Resources from './resources';
import DataEntry from './data_entry';
import DataEntryWSR from './data_entry_wsr';
import DESkillTracker from './deSkillTracker';
import DEActionItems from './deActionItems';
import DELeaveTracker from './deLeaveTracker';
import Reporting from './reporting';
import RAGStatus from './rag_status';
import InterviewPanelists from './interview_panelists';
import Governance from './governance';
import Projects from './projects';
import MyImage from './logo1.jpeg';
import BGImage from './bg-image.jpg';
import {jwtDecode} from 'jwt-decode';
import { ClipLoader,BeatLoader,BounceLoader } from 'react-spinners';


const App = () => {
  const [currentPage, setCurrentPage] = useState("");
  const [currentTab, setCurrentTab] = useState("Overview");
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const [userTab, setUserTab] = useState(false);
  const navigate = useNavigate();
  const [authenticated,setAuthenticated] =useState(false);
  const [loading, setLoading] = useState(false);


  const handleSuccess = async (credentialResponse) => {
    const userObject = jwtDecode(credentialResponse.credential)
    console.log("USERDETAILS",userObject)
    localStorage.setItem("user", JSON.stringify(userObject));
    const response = await fetch('https://my-repo-chi-coral.vercel.app/userslist');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    const result = await response.json();
          //console.log("RESULT",result);
    console.log("RESULT",result["data"]);
    let roleofuser='PUBLIC'
    for (let user of result["data"]) {
        if(user['email_id']===userObject.email){
            roleofuser=user['role']
        }
    }
    if(roleofuser==="PUBLIC"){
        setAuthenticated(false);
    }
    else{
        setAuthenticated(true);
    }
    
    setUser(userObject);
    setLoginStatus(true);
    setCurrentTab("Overview");
    setCurrentPage("");
    ColorTPName()
  };

  const handleError = (errorResponse) => {
    console.error('Google login failed', errorResponse);
  };
  const handleLogout = () => {
    googleLogout(); // Log the user out using googleLogout
    setUser(null); // Clear user state
    console.log("User logged out successfully");
    localStorage.removeItem("user");
    setLoginStatus(false);
    setUserTab(false);
  };

  function ToggleButton() {
    const toggleBtn1 = document.getElementById("sidebar");
    toggleBtn1.classList.toggle("sidebar-collapsed");
    toggleBtn1.classList.toggle("sidebar-expanded");
    const toggleBtn2= document.getElementById("main_content");
    toggleBtn2.classList.toggle("main_content-collapsed");
    toggleBtn2.classList.toggle("main_content-expanded");
  }
  function loadChatbot() {
    const chatbot = document.getElementById("chatbot");

        chatbot.classList.toggle("hidden");
    
  }
  function ColorTPName() {
    let responseData={};
    responseData.Current_Page=currentPage;
    responseData.Current_Tab=currentTab;
    const items = document.querySelectorAll('#Highlight_Tab');
    items.forEach(item => {
        item.querySelector('a').classList.remove('highlight');
        item.querySelector('a').classList.add('non-highlight');
        if(item.innerText == responseData.Current_Tab){
            item.querySelector('a').classList.remove('non-highlight');
            item.querySelector('a').classList.add('highlight');
        }
    });
    const pages = document.querySelectorAll('#Highlight');
    pages.forEach(page => {
        page.querySelector('a').classList.remove('highlight');
        page.querySelector('a').classList.add('non-highlight');
        if(responseData.Current_Page!=""){
        if(page.querySelector('span').innerText == responseData.Current_Page){
            page.querySelector('a').classList.remove('non-highlight');
            page.querySelector('a').classList.add('highlight');
        }}
    });
  }

  useEffect(() => {
    ColorTPName()
  },[currentPage]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("FROMLS",storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user data
      setLoginStatus(true);
      setUserTab(false);
      setCurrentTab("Overview");
      setCurrentPage("");
      ColorTPName()
    }
  }, []);

  return (
      <>
      {!loginStatus&&
      <div id='GLoginPage'>
        <div id='GLoginPageBox'>
        <h1>Hello, Welcome</h1>
      <GoogleOAuthProvider clientId="611470481779-ukm8vk39d1ma7n3jojgforu1a0a56ba7.apps.googleusercontent.com">
            <GoogleLogin
            clientId="611470481779-ukm8vk39d1ma7n3jojgforu1a0a56ba7.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleSuccess}
            onFailure={handleError}
            useOneTap
        flow="auth-code"
        cookiePolicy="single_host_origin"
        scope="profile email"
            />
            </GoogleOAuthProvider>
            </div>
            </div>}
        {loginStatus&&<><div id="dashboard_header">
            <div class="sidebar-header text-white text-center">
                <button id="toggleSidebar" onClick={()=>{setUserTab(false);ToggleButton()}} class="toggle-btn">
                    <i class="fas fa-bars"></i>
                </button>
                <img onClick={()=>{setUserTab(false)}} src={MyImage} alt="Description of the image" style={{ width: '140px', height: '55px', marginRight:"1100px" }}/>
                {user && (<img onClick={()=>{setUserTab(true)}} style={{ width: '45px', height: '45px', borderRadius:"40px",marginTop:'10px'}} src={user.picture} alt="Profile" />)}
                {user && userTab &&<div id='logout_popup'> 
                    <GoogleOAuthProvider clientId="611470481779-ukm8vk39d1ma7n3jojgforu1a0a56ba7.apps.googleusercontent.com">
                    <div>
                    <img style={{ width: '55px', height: '55px', borderRadius:"40px",display:'inline',marginLeft:'25px'}} src={user.picture} alt="Profile" />
                    <button id='logout_button' onClick={handleLogout} >Logout</button>
                    </div>
                    <label class='flex'><span style={{ width: '50px'}} class="text-start">Name</span><span style={{ width: '10px'}} class="text-start">:</span><span class="text-start">{user.name}</span></label>
                    <label class='flex'><span style={{ width: '50px'}} class="text-start">Email</span><span style={{ width: '10px'}} class="text-start">:</span><span class="text-start">{user.email}</span></label>
                    {authenticated&&<label class='flex'><span style={{ width: '50px'}} class="text-start">Role</span><span style={{ width: '10px'}} class="text-start">:</span><span class="text-start">Admin</span></label>}
                    {!authenticated&&<label class='flex'><span style={{ width: '50px'}} class="text-start">Role</span><span style={{ width: '10px'}} class="text-start">:</span><span class="text-start">Public</span></label>}
                </GoogleOAuthProvider></div>}
            </div>
        </div>
        <div class="flex" onClick={()=>{setUserTab(false)}}>
            <nav
                id="sidebar"
                class="bg-gray-700 sidebar-expanded min-h-screen p-1 transition-all relative"
            >
                <ul class="list-none m-0 p-0 flex flex-col ">

                    <div class="sidebar_section">
                    <div class="sidebar_section_main_header" id="Highlight_Tab">
                    <li class="sidebar-item sidebar-main-item" style={{width:'45px',height:'55px'}} onClick={()=>{setCurrentTab("Overview");setCurrentPage("");ColorTPName();}}>
                        <Link to="/home" id="page-link">Overview</Link>
                    </li>
                    </div>
                    <div  class="sidebar_section_sub_header">
                    <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Overview");setCurrentPage("About Us");ColorTPName();}}>
                        <Link to="/about"
                            id="page-link"
                        >
                            <i class="fas fa-envelope"></i>
                            <span>About Us</span>
                        </Link>
                    </li>
                    <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Overview");setCurrentPage("Accelerators");ColorTPName();}}>
                        <Link to="/accelerators"
                            id="page-link"
                        >
                            <i class="fas fa-rocket"></i>
                            <span>Accelerators</span>
                        </Link>
                    </li>
                    <span>.</span>
                    </div>
                    </div>
                    <div class="sidebar_section">
                    <div class="sidebar_section_main_header" id="Highlight_Tab">
                     <li class="sidebar-item sidebar-main-item" style={{width:'55px',height:'65px'}} onClick={()=>{setCurrentTab("Governance");setCurrentPage("");ColorTPName();}}>
                        
                        <Link to="/governance"
                            id="page-link"
                        >
                            <span>Governance</span>
                        </Link>
                     </li>
                    </div>
                        <div  class="sidebar_section_sub_header">
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Governance");setCurrentPage("Projects");ColorTPName();}}>
                            <Link to="/projects"
                                id="page-link"
                            >
                                <i class="fas fa-project-diagram"></i>
                                <span>Projects</span>
                            </Link>
                        </li>
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Governance");setCurrentPage("Resources");ColorTPName();}}>
                            <Link to="/resources"
                                id="page-link"
                            >
                                <i class="fas fa-book"></i>
                                <span>Resources</span>
                            </Link>
                        </li>
                        <span>.</span>
                        </div>
                    </div>
                        <div class="sidebar_section">
                        <div class="sidebar_section_main_header" id="Highlight_Tab">
                        <li class="sidebar-item sidebar-main-item" style={{width:'10px',height:'20px'}} onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("");ColorTPName();}}>
                            <Link to="/data_entry"
                                id="page-link"
                            >
                                <span>Data_Entry</span>
                            </Link>
                        </li>
                        </div>
                            <div  class="sidebar_section_sub_header">
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("WSR");ColorTPName();}}>
                                    <Link to="/data_entry_wsr"
                                        id="page-link"
                                    >
                                        <i class="fas fa-envelope"></i>
                                        <span>WSR</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Skill Tracker");ColorTPName();}}>
                                    <Link to="/data_entry_st"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i>
                                        <span>Skill Tracker</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Action Items");ColorTPName();}}>
                                    <Link to="/data_entry_ai"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i>
                                        <span>Action Items</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Data_Entry");setCurrentPage("Leave Tracker");ColorTPName();}}>
                                    <Link to="/data_entry_lt"
                                        id="page-link"
                                    >
                                        <i class="fas fa-rocket"></i>
                                        <span>Leave Tracker</span>
                                    </Link>
                                </li>
                                </div>
                        </div>
                        <div class="sidebar_section">
                        <div class="sidebar_section_main_header" id="Highlight_Tab">
                        <li class="sidebar-item sidebar-main-item" style={{width:'50px',height:'60px'}} onClick={()=>{setCurrentTab("Reporting");setCurrentPage("");ColorTPName();}}>
                            <Link to="/reporting"
                                id="page-link"
                            >
                                <span>Reporting</span>
                            </Link>
                        </li>
                        </div>
                        <div class="sidebar_section_sub_header">
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Reporting");setCurrentPage("RAG Status");ColorTPName();}}>
                            <Link to="/rag_status"
                                id="page-link"
                            >
                                <i class="fas fa-database"></i>
                                <span>RAG Status</span>
                            </Link>
                        </li>
                        <li class="sidebar-item sidebar-sub-item" id="Highlight" onClick={()=>{setCurrentTab("Reporting");setCurrentPage("Interview_Panelists");ColorTPName();}}>
                            <Link to="/interview_panelists"
                                id="page-link"
                            >
                                <i class="fas fa-database"></i>
                                <span>Interview_Panelists</span>
                            </Link>
                        </li>
                        <span>.</span>
                        </div>
                        </div>
                    <br />
                    <li class="separator"></li>
                    <li class="sidebar-item user-section">
                        <i class="fas fa-user text-black"></i>
                        <span class="text-black">@Qstopteam</span>
                    </li>
                </ul>
            </nav>
            <div id="main_content" class="content main_content-expanded flex-1 p-4 w-100">
            <Routes>
             <Route path="/home" element={<Overview/>} />
             <Route path="/" element={<Overview/>} />
             <Route path="/react_app" element={<Overview/>} />
             <Route path="/about" element={<About_Us setLoad={setLoading}/>} />
             <Route path="/accelerators" element={<Accelerator setLoad={setLoading} auth={authenticated}/>} />
             <Route path="/projects" element={<Projects setLoad={setLoading} auth={authenticated}/>} />
             <Route path="/resources" element={<Resources setLoad={setLoading} auth={authenticated}/>} />
             <Route path="/data_entry" element={<DataEntryWSR setLoad={setLoading}/>} />
             <Route path="/data_entry_wsr" element={<DataEntryWSR setLoad={setLoading}/>} />
             <Route path="/data_entry_st" element={<DESkillTracker setLoad={setLoading}/>} />
             <Route path="/data_entry_ai" element={<DEActionItems setLoad={setLoading}/>} />
             <Route path="/data_entry_lt" element={<DELeaveTracker setLoad={setLoading}/>} />
             <Route path="/reporting" element={<Reporting/>} />
             <Route path="/rag_status" element={<RAGStatus/>} />
             <Route path="/interview_panelists" element={<InterviewPanelists/>} />
             <Route path="/governance" element={<Governance setLoad={setLoading}/>} />
            </Routes>
            </div>
          </div>
          <div id="chatbot-icon" onClick={loadChatbot} class="chatbot-icon">💬</div>
            <div id="chatbot" class="chatbot-container hidden">
                <div class="chatbot-header">
                    <span>Chat with us!</span>
                    <button id="close-chatbot" onClick={loadChatbot} class="close-button">x</button>
                </div>
                <div class="chatbot-body">
                    <div class="bot-message">
                        <img
                            src="{{ url_for('static', filename='images/bot-icon.png') }}"
                            alt="Bot"
                            class="bot-icon"
                        />Hi, How can I help you?
                    </div>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Governance')"
                    >
                        Governance
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Projects')"
                    >
                        Projects
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Resources')"
                    >
                        Resources
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Accelerators')"
                    >
                        Accelerators
                    </button>
                    <button
                        class="option-button"
                        onclick="handleOptionClick('Data Entry')"
                    >
                        Data Entry
                    </button>
                </div>
                <div class="chatbot-input-container">
                    <input
                        type="text"
                        id="chatbot-input"
                        class="chatbot-input"
                        placeholder="Type your message..."
                    />
                    <button id="send-message" class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div></>
            }
        {loading&&
    <div id="loading_popup">
    <BeatLoader color="#3498db" loading={loading} size={20} />
    </div>
    }
        </>
        );
   };

  export default App;
