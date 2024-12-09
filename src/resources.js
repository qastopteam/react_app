import React, {useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import * as XLSX from 'xlsx';
import { AiOutlineDownload } from "react-icons/ai";

const Resources = (props) => {
    const [employees, setEmployees] = useState([]);
    const [employeeTable,setEmployeeTable] = useState([]);
    const [employeeTable2,setEmployeeTable2] = useState([]);
    const [uppopup, setuppopup] = useState(false);
    const [employees1, setEmployees1] = useState(['-- Select --']);
    const [selectedEmp,setSelectedEmp]=useState();
    const [filteredData, setFilteredData] = useState("");

    const expertice_levels = [
        '--Select--', 'None', 'Interested', 'Beginner', 'Intermediate/Advanced'
    ]
    const skills = [
        '-- Select --', 'Web Testing', 'Data Testing', 'Performance Testing',
        'Power BI', 'Other'
    ]
    const up_skillings = ['-- Select --', 'Yes', 'No'];

    const handleExcelDownload = () => {
        // Get the table element
        console.log("ExcelDATA",filteredData);
        const table = document.getElementById('tableToExport');
        
        // Convert the table to a workbook
        const wb = XLSX.utils.table_to_book(table, { sheet: 'Resources' });
    
        // Write the workbook and trigger download
        XLSX.writeFile(wb, 'Resources_Data.xlsx');
      };

    function getdynamicFilter4() {
        let selectElement =document.getElementById("DynamicFilter4");
        let skill =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        if(skill=="Other"){
        document.getElementById("skl").innerHTML ='<input type="text" id="DynamicFilter4" name="DynamicFilter4"  placeholder="Enter Skill">';
        }
        //document.querySelector('.dynamic_filter_4').textContent = skill;
    }
    function getExpertiseLevel() {
        let output = document.getElementById("ExpertiseLevel").value
        //document.querySelector('.expertise_level').textContent = output;
        document.getElementById('expertise_level_alert').textContent = "";
    }
    function getIntUpSkill() {
        let output = document.getElementById("IntUpSkill").value
        //document.querySelector('.int_up_skill').textContent = output;
    }
    function AlertFunc() {
        document.getElementById('alert').textContent = "Please Fill the Mandatory Fields(*)";
        setTimeout(function () {
            document.getElementById('alert').textContent = "";
        }, 5000);
        //$('#GFG').text("Div hides after 1 second.");
    }
    function PopupFunction(divacker) {
      var popup = document.getElementById("myPopup");
      popup.textContent = `${divacker}`;
        popup.classList.add('custom-background');
        const end_popup = document.getElementById("loading_popup");
        end_popup.classList.toggle("hidden");
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
          end_popup.classList.toggle("hidden");
        }, 5000);
    }
    async function sendInput() {
        props.setLoad(true);
         let emp_id =document.getElementById("emp_id").value;
         let emp_name =document.getElementById("resource_name").value;
         let base_location =document.getElementById("base_location").value;
         let skill =document.getElementById("DynamicFilter4").value;
         let expertise_level =document.getElementById("ExpertiseLevel").value;
         let int_up_skill =document.getElementById("IntUpSkill").value;
         let flag=true;
         if(emp_id=="-- Select --"){
          flag=false;
         }
         if(skill=="-- Select --"){
          flag=false;
         }
         if(expertise_level=="-- Select --"){
          flag=false;
          document.getElementById('expertise_level_alert').textContent = "*Please Select Expertise Level";
         }
         if(flag){
          fetch("https://my-repo-chi-coral.vercel.app/inserttoskills", {
          method: "POST",
          body: JSON.stringify([{
          "employee_id":emp_id,
          "employee_name":emp_name,
          "base_location":base_location,
          "skills":skill,
          "expertise_level":expertise_level,
          "interest_for_up_skill": int_up_skill
          }]),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          PopupFunction("Skill Tracker Uploaded Successfully");
          const chatbot = document.getElementById("project_popup");
        chatbot.classList.toggle("hidden");
             //selectElement.value=divacker;
              // getChoosedivacker();
         }
         else{
         AlertFunc();
         }
         props.setLoad(false);
    }
    async function delete_Resource() {
        props.setLoad(true);
        let emp=selectedEmp;
        let emp_id =emp["emp_id"];
        let emp_name =emp["name"];
        let base_location =emp["baseLocation"];
        let skill =emp["skill"];
        let expertise_level =emp["expLevel"];
        let int_up_skill =emp["interest_for_up_skill"];
        let flag=true;
        if(emp_id=="-- Select --"){
         flag=false;
        }
        if(skill=="-- Select --"){
         flag=false;
        }
        if(expertise_level=="-- Select --"){
         flag=false;
         document.getElementById('expertise_level_alert').textContent = "*Please Select Expertise Level";
        }
        if(flag){
         fetch("https://my-repo-chi-coral.vercel.app/deletefromskills", {
         method: "POST",
         body: JSON.stringify({
         "employee_id":emp_id,
         "employee_name":emp_name,
         "base_location":base_location,
         "skills":skill,
         "expertise_level":expertise_level,
         "interest_for_up_skill": int_up_skill
         }),
         headers: {
          "Content-type": "application/json; charset=UTF-8"
         }
         })
         .then((response) => response.json())
         .then((json) => console.log(json));

         PopupFunction("Resouce Deleted Successfully");
         const chatbot = document.getElementById("project_popup");
       chatbot.classList.toggle("hidden");
            //selectElement.value=divacker;
             // getChoosedivacker();
        }
        else{
        AlertFunc();
        }
        props.setLoad(false);
   }
    function handleUpdate(emp) {
        const chatbot = document.getElementById("project_popup");
        chatbot.classList.toggle("hidden");
        document.getElementById("emp_id").value=emp["emp_id"];
        document.getElementById("resource_name").value=emp["name"];
        document.getElementById("base_location").value=emp["baseLocation"];
        document.getElementById("DynamicFilter4").value=emp["skill"];
        document.getElementById("ExpertiseLevel").value=emp["expLevel"];
        document.getElementById("IntUpSkill").value=emp["interest_for_up_skill"];
        document.getElementById("Submit_Button").innerText="Update";
        document.getElementById("add_table_label").innerText="Update Resource Details"
        setSelectedEmp(emp);
    }
    function handleAdd() {
        document.getElementById("emp_id").value="";
        document.getElementById("resource_name").value="";
        document.getElementById("base_location").value="";
        document.getElementById("DynamicFilter4").value="";
        document.getElementById("ExpertiseLevel").value="";
        document.getElementById("IntUpSkill").value="";
        document.getElementById("Submit_Button").innerText="Submit";
        document.getElementById("add_table_label").innerText="Add New Resource";
    }
    function renderTable() {
        const skillSelect = document.getElementById("skill");
        const expertiseSelect = document.getElementById("expertise");
        const pagination = document.getElementById("pagination");
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageEmployees = filteredEmployees.slice(start, end);
        setFilteredData(pageEmployees);
        const tbody = [];
        const tbody2 = [];

        if (pageEmployees.length === 0) {
           // employeeList.innerHTML =
           //     '<tr id="noData"><td colspan="4">No data available for the selected filter combination</td></tr>';
           // employeeList2.innerHTML =
           //     '<tr id="noData"><td colspan="4">No data available for the selected filter combination</td></tr>';
            pagination.style.display = "none";
        } else {
            pageEmployees.forEach((employee) => {
                console.log("EMPLOYEE",employee);
                tbody.push(<tr><td>{employee.name}</td><td>{skillSelect.value === "all" ? "Multiple" : skillSelect.options[skillSelect.selectedIndex].text}</td><td>{expertiseSelect.value === "all" ? "Multiple" : employee[skillSelect.value]}</td><td>{employee.baseLocation}</td></tr>);
                //employeeList.appendChild(tr);
                tbody2.push(<tr><td>{employee.name}</td><td>{skillSelect.value === "all" ? "Multiple" : skillSelect.options[skillSelect.selectedIndex].text}</td><td>{expertiseSelect.value === "all" ? "Multiple" : employee[skillSelect.value]}</td><td>{employee.baseLocation}</td>
                <td><button onClick={()=>{handleUpdate(employee)}}><FiEdit /></button><button><MdDeleteOutline onClick={()=>{setuppopup(true);handleUpdate(employee)}}/></button></td></tr>);
                //employeeList2.appendChild(<tr><td>{employee.name}</td><td>{skillSelect.value === "all" ? "Multiple" : skillSelect.options[skillSelect.selectedIndex].text}</td><td>{expertiseSelect.value === "all" ? "Multiple" : employee[skillSelect.value]}</td><td>{employee.baseLocation}</td><td><FiEdit /><MdDeleteOutline /></td></tr>);
            });
            pagination.style.display = "flex";
        }
        console.log("tbody",tbody,tbody2.push);
        setEmployeeTable(tbody);
        setEmployeeTable2(tbody2);
    }

    useEffect(() => {
        const fetchData = async () => {
            props.setLoad(true);
    
          /*const response = await fetch('http://127.0.0.1:5000/newemps');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();*/
          const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getemps');
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const result2 = await response2.json();
          //console.log("RESULT",result);
          console.log("RESULT2",result2);
          const emps=['-- Select --'];
          for (let emp of result2["data"]){
            emps.push(emp["employee_no"]);
           }
           setEmployees1(emps);
           props.setLoad(false);
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredEmployees = employees;

    function enableExpertiseDropdown() {
        const expertiseSelect = document.getElementById("expertise");
        const skillSelect = document.getElementById("skill");
        console.log("SkillSet",skillSelect)
        expertiseSelect.disabled = skillSelect.value === "all";
    }

    function showWarning(warningId, show) {
        document.getElementById(warningId).style.display = show
            ? "block"
            : "none";
    }

    function filterEmployees() {
        const skillSelect = document.getElementById("skill");
        const expertiseSelect = document.getElementById("expertise");
        const baseLocationSelect = document.getElementById("baseLocation");
        const skill = skillSelect.value;
        const expertise = expertiseSelect.value;
        const baseLocation = baseLocationSelect.value;

        filteredEmployees = employees.filter((employee) => {
            const skillMatch =
                skill === "all" || employee[skill] !== "undefined";
            const expertiseMatch =
                expertise === "all" || employee[skill] === expertise;
            const locationMatch =
                baseLocation === "all" ||
                employee.baseLocation === baseLocation;
            return skillMatch && expertiseMatch && locationMatch;
        });

        currentPage = 1;
        renderTable();
        renderPagination();
    }

    function renderPagination() {
        const pageNumbers = document.getElementById("pageNumbers");
        const prevPageBtn = document.getElementById("prevPage");
        const nextPageBtn = document.getElementById("nextPage");
        pageNumbers.innerHTML = "";
        const totalPages = Math.ceil(
            filteredEmployees.length / itemsPerPage,
        );

        for (let i = 1; i <= totalPages; i++) {
            const span = document.createElement("span");
            span.innerText = i;
            span.className = i === currentPage ? "current" : "";
            span.addEventListener("click", () => {
                currentPage = i;
                renderTable();
                renderPagination();
            });
            pageNumbers.appendChild(span);
        }

        prevPageBtn.classList.toggle("disabled", currentPage === 1);
        nextPageBtn.classList.toggle(
            "disabled",
            currentPage === totalPages,
        );
    }


      useEffect(() => {
        const fetchData = async () => {
            props.setLoad(true);
    
          /*const response = await fetch('http://127.0.0.1:5000/newemps');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();*/
          const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getskills');
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const result2 = await response2.json();
          //console.log("RESULT",result);
          console.log("RESULT2",result2);
          const emps=[];
          for (let emp of result2["data"]){
            if(emp["skills"]=="Web Testing"){
                emps.push({
                    name:emp["employee_name"],
                    webTesting: emp["expertise_level"],
                    dataTesting: "None",
                    performanceTesting: "None",
                    baseLocation: emp["base_location"],
                    emp_id:emp["employee_id"],
                    interest_for_up_skill:emp["interest_for_up_skill"],
                    skill:emp["skills"],
                    expLevel:emp["expertise_level"]
                })
            }
            else if(emp["skills"]=="Performance Testing"){
                emps.push({
                    name:emp["employee_name"],
                    webTesting: "None",
                    dataTesting: "None",
                    performanceTesting: emp["expertise_level"],
                    baseLocation: emp["base_location"],
                    emp_id:emp["employee_id"],
                    interest_for_up_skill:emp["interest_for_up_skill"],
                    skill:emp["skills"],
                    expLevel:emp["expertise_level"]
                })
            }
            else {
                emps.push({
                    name:emp["employee_name"],
                    webTesting: "None",
                    dataTesting: emp["expertise_level"],
                    performanceTesting: "None",
                    baseLocation: emp["base_location"],
                    emp_id:emp["employee_id"],
                    interest_for_up_skill:emp["interest_for_up_skill"],
                    skill:emp["skills"],
                    expLevel:emp["expertise_level"]
                })
            }
        };
           
           
           setEmployees(emps);
           props.setLoad(false);
        };
    
        fetchData(); // Call the function to fetch data
        enableExpertiseDropdown();
        filterEmployees();
        renderPagination();
      }, []);


    return(
     <>
     <div id="page_header">
     <h1><span>Resources</span>
     {props.auth&&<button id="add_projects_btn" onClick={()=>{const chatbot = document.getElementById("project_popup");
        chatbot.classList.toggle("hidden");handleAdd();}}>+Add</button>}
     </h1>
     </div>

      <div class="flex flex-col gap-4 p-2">
       <div class="flex gap-4">
        <div id="sub_page_box" class="section_1 w-3/4 overflow-y-auto">
            <div id="sub_page_headers">
                <h5>Resource Training & Development</h5>
            </div>
            <div>
                The Quality Engineering resources are constantly trained in the
                latest trends and technologies for delivering best-in-class
                testing services across client projects.
                <ul>
                    <li>
                        1. The practice is highly oriented towards training
                        testers from basic to full stack.
                    </li>
                    <li>
                        2. Interested individuals are given priority in
                        skill-based training as per project demands.
                    </li>
                </ul>
            </div>
        </div>

        <div id="sub_page_box" class="section_2 w-1/4 overflow-y-auto">
            <div id="sub_page_headers">
                <h5>Training Updates</h5>
            </div>
            <div>
                <p>
                    Upcoming Trainings on Tosca starting Batch 1 from Apr 2024
                </p>
            </div>
        </div>
     </div>

     <section class="section" id="dropdown">
        <div class="filters-legend flex justify-between">
            <div class="filters">
                <label for="skill" class="required fw-bold">Skill :</label>
                <select id="skill" class="p-2 border border-gray-300 rounded" 
                    onChange={() => {
                        const skillSelect = document.getElementById("skill");
                        const expertiseSelect = document.getElementById("expertise");
                    enableExpertiseDropdown();
                    showWarning(
                        "skillWarning",
                        skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                    showWarning(
                        "expertiseWarning",
                        skillSelect.value === "all" && expertiseSelect.value !== "all",
                    );
                    filterEmployees();
                    }}
                >
                    <option value="all" selected>All</option>
                    <option value="webTesting">Web Testing</option>
                    <option value="dataTesting">Data/ETL Testing</option>
                    <option value="performanceTesting">
                        Performance Testing
                    </option>
                </select>
                <span id="skillWarning" class="warning" style={{display: 'none'}}
                    >Please select a skill.</span
                >
            </div>
            <div class="filters">
                <label for="expertise" class="required fw-bold">Expertise :</label>
                <select
                    id="expertise"
                    class="p-2 border border-gray-300 rounded"
                    disabled
                    onChange={() => {
                        const skillSelect = document.getElementById("skill");
                        const expertiseSelect = document.getElementById("expertise");
                        showWarning(
                            "skillWarning",
                            skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                        showWarning(
                            "expertiseWarning",
                            skillSelect.value === "all" && expertiseSelect.value !== "all",
                        );
                        filterEmployees();
                    }}
                >
                    <option value="all" selected>All</option>
                    <option value="None">None</option>
                    <option value="Interested">Interested</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate/Advanced">
                        Intermediate/Advanced
                    </option>
                </select>
                <span
                    id="expertiseWarning"
                    class="warning"
                    style={{display: 'none'}}
                    >Please select a skill first.</span
                >
            </div>
            <div class="filters">
                <label for="baseLocation" class="required fw-bold">Base Location :</label>
                <select
                    id="baseLocation"
                    class="p-2 border border-gray-300 rounded"
                    onChange={filterEmployees}
                >
                    <option value="all" selected>All</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                </select>
            </div>
            <button
                id="resetBtn"
                class="p-2 border border-gray-300 rounded bg-gray-400"
                onClick={() => {
                    const resetBtn = document.getElementById("resetBtn");
                    const skillSelect = document.getElementById("skill");
                    const expertiseSelect = document.getElementById("expertise");
                    const baseLocationSelect = document.getElementById("baseLocation");
                    skillSelect.value = "all";
                    expertiseSelect.value = "all";
                    baseLocationSelect.value = "all";
            
                    enableExpertiseDropdown();
                    filterEmployees();
                }}
            >
                Reset Filters
            </button>
            <button class="hover-btn" style={{marginLeft:'10px'}}  onClick={handleExcelDownload}>
      <AiOutlineDownload style={{width:'20px',height:'20px'}}/>
      <span class="hover-text">Download</span>
    </button>
        </div>
        {!props.auth&&<table id="employeeList" >
            <thead>
                <tr>
                    <th>Resources</th>
                    <th>Skill</th>
                    <th>Expertise Level</th>
                    <th>Base Location</th>
                </tr>
            </thead>
            {!employeeTable &&<tbody>
             <tr id="noData">
                    <td colspan="4">
                        No data available for the selected filter combination
                    </td>
                </tr>
            </tbody>}
            {employeeTable && <tbody>{employeeTable}</tbody>}
        </table>}
        {props.auth&&<table id="employeeList2" >
            <thead>
                <tr>
                    <th>Resources</th>
                    <th>Skill</th>
                    <th>Expertise Level</th>
                    <th>Base Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {!employeeTable2 && <tbody>
                <tr id="noData">
                    <td colspan="4">
                        No data available for the selected filter combination
                    </td>
                </tr>
            </tbody>}
            {employeeTable2 && <tbody>{employeeTable2}</tbody>}
        </table>}
        <div class="pagination" id="pagination">
            <button 
                id="prevPage" 
                class="disabled" 
                onClick={() => {
                if (currentPage > 1) {
                currentPage--;
                renderTable();
                renderPagination();
                }
                }}
            >Prev</button>
            <span id="pageNumbers"></span>
            <button 
                id="nextPage" 
                class="disabled" 
                onClick={() => {
                    const totalPages = Math.ceil(
                        filteredEmployees.length / itemsPerPage,
                    );
                    if (currentPage < totalPages) {
                        currentPage++;
                        renderTable();
                        renderPagination();
                    }
                }}
            >Next</button>
        </div>
     </section>
     <div id="project_popup" class="hidden">
     {!uppopup && <div id="add_project_popup" style={{marginLeft:'250px',marginTop:"70px",padding:'30px'}}>
        <div>
            <label id="add_table_label" style={{width:'300px',fontWeight:"bold"}}>Add New Resource</label>
            <button onClick={()=>{const chatbot = document.getElementById("project_popup");
                chatbot.classList.toggle("hidden");}} style={{color:'gray',marginLeft:'220px'}}>x</button>
        </div>
            <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Employee ID*</span><span class="text-start">:</span></label>
              <span>
                  <input class="text_Input" type="text" id="emp_id" placeholder="Employee ID" />
              </span>
            </div>
            <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Resource Name*</span><span class="text-start">:</span></label>
              <span>
                  <input class="text_Input" type="text" id="resource_name" placeholder="Resource Name" />
              </span>
            </div>
           <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Skills*</span><span class="text-start">:</span></label>
              <span id="skl">
                  <select class="select_Dropdown_Input" onChange={getdynamicFilter4} name="DynamicFilter4" id="DynamicFilter4" style={{width:'350px'}}>
                    {skills.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                  </select>
              </span>
          </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Expertise Level*</span><span class="text-start">:</span></label>
            <span>
                <select class="select_Dropdown_Input" onChange={getExpertiseLevel} name="ExpertiseLevel" id="ExpertiseLevel" style={{width:'350px'}}>
                {expertice_levels.map((expertice_level, index) => (
                    <option key={index} value={expertice_level}>
                      {expertice_level}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        <div><div id="expertise_level_alert"></div></div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Up-Skill Interest</span><span class="text-start">:</span></label>
            <span>
                <select class="select_Dropdown_Input" onChange={getIntUpSkill} name="IntUpSkill" id="IntUpSkill" style={{width:'350px'}}>
                {up_skillings.map((up_skilling, index) => (
                    <option key={index} value={up_skilling}>
                      {up_skilling}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Base Location*</span><span class="text-start">:</span></label>
              <span>
                  <input class="text_Input" type="text" id="base_location" placeholder="Base Location" />
              </span>
        </div>
        <button class="default_Button" id="Submit_Button" onClick={sendInput}>
            Submit
        </button>
        <label id="alert"></label>
       </div>}
       {uppopup && <div id="add_project_popup" style={{marginLeft:'300px',marginTop:"100px"}}>
            <label id="add_table_label" style={{width:'450px',fontWeight:"bold"}}>Are you sure you want to delete this resource?</label>
            <div>
            <button onClick={()=>{const chatbot = document.getElementById("project_popup");
                chatbot.classList.toggle("hidden");delete_Resource();;setuppopup(false)}} style={{color:'green',marginLeft:'100px',marginRight:'150px'}}>Yes</button>
            <button onClick={()=>{const chatbot = document.getElementById("project_popup");
                chatbot.classList.toggle("hidden");setuppopup(false)}} style={{color:'red'}}>No</button>
            </div>
        </div>}
     </div>
     <div id="loading_popup" class='hidden'>
     <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </div>
    </div>
    {filteredData&&<table id="tableToExport" className='hidden'>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Skill</th>
            <th>Expertice Level</th>
            <th>Base Location</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.skill}</td>
              <td>{row.expLevel}</td>
              <td>{row.baseLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>}
     </>
    );
};

export default Resources;