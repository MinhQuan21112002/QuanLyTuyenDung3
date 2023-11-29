import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    AdLogout,
    Ecommerce,
    Orders,
    Calendar,
    Interviewer,
    Customers,
    Kanban,
    Line,
    ColorPicker,
    Editor,
    RoomList
  } from "../pages-admin";
import RoomAdd from "../pages-admin/RoomEdit/RoomAdd"
import RoomAddCandidate from "../pages-admin/RoomEdit/RoomAddCandidate"
import { K_Event } from "../pages-admin/K_Event/K_Event";
import { EventEdit } from "../pages-admin/K_Event/EventEdit";
import { EventAdd } from "../pages-admin/K_Event/EventAdd";
import JobPosting from "../Components-admin/Job-recruiter/Job-Posting"; 
import AllJob from  "../Components-admin/Job-recruiter/AllJob"; 
import JobDetailRecruiter from "../Components-admin/Job-recruiter/JobDetail"; 
import UserInfo from "../Components-admin/UserInfo/UserInfo"; 
import { PositionSkill } from "../pages-admin/PositionSkill/PositionSkill";
import { EditSkill } from "../pages-admin/PositionSkill/EditSkill";
import { AddSkill } from "../pages-admin/PositionSkill/AddSkill";
import { AddPosition } from "../pages-admin/PositionSkill/AddPosition";
import { EditPosition } from "../pages-admin/PositionSkill/EditPosition";
import { Question } from "../pages-admin/Question/Question";
import RoomListInterviewer  from "../pages-admin/RoomInterviewer/RoomListInterviewer";
import RoomDetail  from "../pages-admin/RoomInterviewer/RoomDetail";
import { AddQuestion } from "../pages-admin/Question/AddQuestion";
import { EditQuestion } from "../pages-admin/Question/EditQuestion";
import { Interview } from "../pages-admin/Interview/Interview";
import CandidateInfo from "../pages-admin/CandidateInfo/CandidateInfo";
import { RoomEditInfomation } from "../pages-admin/RoomEdit/RoomEditInfomation";
import { AdminCalendar } from "../pages-admin/GoogleCalendar/AdminCalendar";
import { MarkCandidate } from "../pages-admin/MarkCandidate/MarkCandidate";
import InterviewerListRoom from "../pages-admin/MarkCandidate/InterviewerListRoom";
import { MyCompany } from "../pages-admin/MyCompany/MyCompany";
import { ManageInterviewer } from "../pages-admin/ManageInterviewer/ManageInterviewer";

const AllRoutesAd = () => {
    return (
        <Routes>
        {/* dashboard  */}
        <Route path='/userInfo/' element={<UserInfo/>} /> 
        <Route path='/jobDetail_Recruiter/:id' element={<JobDetailRecruiter/>} />
        <Route path='/allJob_Recruiter/' element={<AllJob/>} />
        <Route path='/job-posting/' element={<JobPosting/>} />
        <Route path="/" element={<Ecommerce/>} />
        <Route path="/AdLogout" element={<AdLogout/>} />



        <Route path="/interviews" element={<Interview />} />
        <Route path="/roomAdd" element={<RoomAdd/>} />
        <Route path="/roomList" element={<RoomList />} />
        <Route path="/roomListInterviewer" element={<RoomListInterviewer />} />
        <Route path="/RoomDetailInterviewer/:id/:idRoom" element={<RoomDetail />} />
        <Route path="/candidateInfo/:id" element={<CandidateInfo />} />

        {/* pages  */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/interviewer" element={<Interviewer />} />
        <Route path="/reccer" element={<Customers />} />

        {/* apps  */}
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/color-picker" element={<ColorPicker />} />

        {/* khanh */}
        <Route path="/event" element={<K_Event />} />
        <Route path="/event/add" element={<EventAdd />} />
        <Route path="/event/edit/:id" element={<EventEdit />} />
        <Route path="/skill-position" element={<PositionSkill />} />
        <Route path="/edit-skill/:id" element={<EditSkill />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/add-position" element={<AddPosition />} />
        <Route path="/edit-position/:id" element={<EditPosition />} />
        <Route path="/question" element={<Question />} />
        <Route path="/question/add" element={<AddQuestion />} />
        <Route path="/question/edit/:id" element={<EditQuestion />} />
        <Route path="/interview" element={<Interview />} />
{/* khanh */}
        <Route path="/addCandidate/:id/:idRoom" element={< RoomEditInfomation/>} />
        <Route path="/calendar-admin" element={<AdminCalendar/>} />
        <Route path="/mark-candidate/:roomId" element={<MarkCandidate/>} />
        <Route path="/interviewer-list-room" element={<InterviewerListRoom/>} />
        <Route path="/my-company" element={<MyCompany/>} />
        <Route path="/manage-interviewer" element={<ManageInterviewer/>} />


      </Routes>
    );
  };
  
  export default AllRoutesAd;
  