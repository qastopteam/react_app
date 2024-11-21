import React, {useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const DataEndivyWSR = () => {
    const [employees, setEmployees] = useState([]);
    const [leads, setLeads] = useState(['-- Select --']);
    const [resources, setResources] = useState(['-- Select --']);
    const [projects, setProjects] = useState(['-- Select --']);
    const [uppopup, setuppopup] = useState(false);
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('zh-CN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date).replaceAll('/', '-');
    const rags = ['-- Select --', 'Red', 'Amber', 'Green'];
    const test_types = [
        '-- Select --', 'Web App Testing', 'Data Testing',
        'Performance testing', 'BI Testing'
    ];
    const [exceldata, setExcelData] = useState([]);

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      
      // Call appropriate function depending on file type
      if (fileExtension === 'csv') {
        readCSV(file);
      } else if (fileExtension === 'xlsx') {
        readExcel(file);
      } else {
        alert('Please upload a .csv or .xlsx file');
      }
    }
  };

  // Function to read CSV file
  const readCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result; // File content as string
      const rows = text.split('\n'); // Split the file into rows by newline
      const data = rows.slice(1).map((row) => row.split(',')); // Skip the header (first row)
      console.log("DATA",data);
      setExcelData(data); // Save the data into state
    };
    reader.readAsText(file); // Read file as text (use this for .csv files)
  };

  // Function to read Excel (.xlsx) file
  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result; // Raw binary data from file
      const workbook = XLSX.read(data, { type: 'binary' });

      // Get the first sheet from the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet data to JSON (excluding header)
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Get rows as array of arrays
      const rows = jsonData.slice(1); // Exclude the header (first row)
      console.log("DATA",rows);
      setExcelData(rows); // Save the data into state
    };
    reader.readAsBinaryString(file); // Read file as binary for .xlsx files
  };

    function getPracticeLead() {
        const selectElement =document.getElementById("PracticeLead");
        const lead_name =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        //lead_name = document.getElementById("PracticeLead").value
        //document.querySelector('.practice_lead').textContent = lead_name;
        const emps= ['-- Select --'];
        for (let emp of employees){
        if (emp.lead==lead_name){
        emps.push(emp.name);
        }
        }
        setResources(emps);
    }
    function gedivesourceName() {
        let selectElement =document.getElementById("PracticeLead");
        let lead_name =selectElement.options[selectElement.selectedIndex].textContent;
        selectElement =document.getElementById("ResourceName");
        let resource_name =selectElement.options[selectElement.selectedIndex].textContent;
        let projects= ['-- Select --'];
        for (let emp of employees){
        if (emp.lead==lead_name){
            if(emp.name==resource_name){
                projects.push(emp.project);
            }
        }
        }
        console.log(projects);
        //document.querySelector('.resource_name').textContent = resource_name;
        setProjects(projects);
    }
    function getProjectName() {
        let selectElement =document.getElementById("ProjectName");
        let output =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        //document.querySelector('.project_name').textContent = output;
    }
    function gedivAGStatus() {
        let output = document.getElementById("RAGStatus").value
        //document.querySelector('.rag_status').textContent = output;
        document.getElementById('rag_alert').textContent = "";
    }
    function getTestingType() {
        let output = document.getElementById("TestingType").value
        //document.querySelector('.testing_type').textContent = output;
        document.getElementById('test_type_alert').textContent = "";
    }
    function getWeeklyDeliverable() {
        let output = document.getElementById("WeeklyDeliverable").value
        //document.querySelector('.testing_type').textContent = output;
        console.log("OPT",output);
        if(output==""){
        document.getElementById('weekly_deliverables_alert').textContent = "*Please Enter Weekly Deliverables";
        }
        else{
        document.getElementById('weekly_deliverables_alert').textContent = "";
        }
    }
    function getChoosetracker() {
        let tracker ="Weekly RAG Status"
        //output = document.getElementById("Choosetracker").value
        //document.querySelector('.choose_tracker').textContent = output;
        //tracker = document.getElementById("Choosetracker").value
        
         
    }
    function AlertFunc() {
        document.getElementById('alert').textContent = "Please Fill the Mandatory Fields(*)";
        setTimeout(function () {
            document.getElementById('alert').textContent = "";
        }, 5000);
        //$('#GFG').text("Div hides after 1 second.");
    }
    function PopupFunction(tracker) {
      var popup = document.getElementById("myPopup");
      popup.textContent = `${tracker}`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    const upload_new_project = async ()=>{
        const data=[]
        for (let wsr of exceldata){
          if (wsr.length > 1) {
            data.push({
                "employee_id":wsr[0],
                "project_lead":wsr[1],
                "resource_name":wsr[2],
                "project_name":wsr[3],
                "rag_status": wsr[4],
                "testing_type": wsr[5],
                "weekly_deliverable": wsr[6],
                "sub_tasks":wsr[7],
                "impediments":wsr[8],
                "action_items":wsr[9],
                "comments":wsr[10],
                "upcoming_leave_from_date":wsr[11],
                "upcoming_leave_to_date":wsr[12]
                });
          }
         }
        console.log("DATA",data);
        const response = await fetch('https://my-repo-chi-coral.vercel.app/inserttowsr', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Data to send in the POST request
        });
        if (!response.ok) {
                throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("Result",result);
        PopupFunction("WSR Uploaded Successfully");
      }
    async function sendInput() {
        let tracker ="Weekly RAG Status"
        let selectElement =document.getElementById("PracticeLead");
        let practice_lead =selectElement.options[selectElement.selectedIndex].textContent;
        selectElement =document.getElementById("ResourceName");
        let resource_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("ProjectName");
        let project_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("RAGStatus");
        let rags =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("TestingType");
        let test_type =selectElement.options[selectElement.selectedIndex].textContent;
        let weekly_deliverable = document.getElementById("WeeklyDeliverable").value;
        let flag=true;
         console.log("Result",rags,"Result1",test_type);
         if(practice_lead=="-- Select --"){
          flag=false;
         }
         if(resource_name=="-- Select --"){
          flag=false;
         }
         if(project_name=="-- Select --"){
          flag=false;
         }
         if(rags=="-- Select --"){
          flag=false;
          document.getElementById('rag_alert').textContent = "*Please Select RAG Status";
         }
         if(test_type=="-- Select --"){
          flag=false;
          document.getElementById('test_type_alert').textContent = "*Please Select Testing Type";
         }
         if(weekly_deliverable==""){
          flag=false;
          document.getElementById('weekly_deliverables_alert').textContent = "*Please Enter Weekly Deliverables";
         }
         if(flag){
          let  sub_tasks = document.getElementById("SubTasks").value
          let impediments = document.getElementById("Impediments").value
          let action_items = document.getElementById("ActionItems").value
          let comments = document.getElementById("Comments").value
          let start_date = document.getElementById("Starspanate").value
          let end_date = document.getElementById("EndDate").value
          const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getemps');
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const result2 = await response2.json();
          //console.log("RESULT",result);
          console.log("RESULT2",result2);
          let emp_id=[];
          for (let emp of result2["data"]){
            if (emp["employee_name"]==resource_name) {
                emp_id=emp["employee_no"]
            }
           }
          fetch("https://my-repo-chi-coral.vercel.app/inserttowsr", {
          method: "POST",
          body: JSON.stringify([{
          "employee_id":emp_id,
          "project_lead":practice_lead,
          "resource_name":resource_name,
          "project_name":project_name,
          "rag_status": rags,
          "testing_type": test_type,
          "weekly_deliverable": weekly_deliverable,
          "sub_tasks":sub_tasks,
          "impediments":impediments,
          "action_items":action_items,
          "comments":comments,
          "upcoming_leave_from_date":start_date,
          "upcoming_leave_to_date":end_date
          }]),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          PopupFunction("WSR Form Submitted Successflly");
               getChoosetracker();
         }
         else{
         AlertFunc();
         }
        
    }

    useEffect(() => {
        getChoosetracker();
      },[]);
    
      useEffect(() => {
        const fetchData = async () => {

          /*const response = await fetch('http://127.0.0.1:5000/newemps');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();*/
          const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getproj');
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const result2 = await response2.json();
          //console.log("RESULT",result);
          console.log("RESULT2",result2);
          const emps=[];
          const l=['-- Select --'];
          for (let emp of result2["data"]){
            if (!l.includes(emp["lead_name"])) {
                l.push(emp["lead_name"]);  // Add the string to the array if it's not already there
            }
            emps.push({
                "name": emp["employee_name"],
                "lead": emp["lead_name"],
                "project": emp["project_name"]
            });
           }
           setEmployees(emps);
           setLeads(l);
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

    return(
    <>
    <div id="page_header">
        <h1>WSR</h1>
    </div>
    <div id="part1">
    <div>
        <div id="EntryForm">
        <div class="filters-legend flex flex-row">
        <div class='filters flex justify-between w-1/3'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Practice Lead*</span><span class="text-start">:</span></label>
              <span>
                    <select class="select_Dropdown_Input" onChange={getPracticeLead} name="PracticeLead" id="PracticeLead">
                      {leads.map((lead, index) => (
            <option key={index} value={lead}>
              {lead}
            </option>
          ))}
                    </select>
              </span>
          </div>
          <div class='filters flex justify-between w-1/3'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Resource Name*</span><span class="text-start">:</span></label>
              <span>
                  <select class="select_Dropdown_Input" onChange={gedivesourceName} name="ResourceName" id="ResourceName">
                      {resources.map((resouce, index) => (
            <option key={index} value={resouce}>
              {resouce}
            </option>
          ))}
                  </select>
              </span>
          </div>
          <div class='filters flex justify-between w-1/3'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Project Name*</span><span class="text-start">:</span></label>
              <span>
                  <select class="select_Dropdown_Input" onChange={getProjectName} name="ProjectName" id="ProjectName">
                  {projects.map((project, index) => (
                    <option key={index} value={project}>
                      {project}
                    </option>
                  ))}
                  </select>
              </span>
          </div>
          </div>
        <hr/>
        <div class="filters-legend flex flex-row">
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">RAG Status*</span><span class="text-start">:</span></label>
            <span>
                <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={gedivAGStatus} name="RAGStatus" id="RAGStatus">
                {rags.map((rag, index) => (
                    <option key={index} value={rag}>
                      {rag}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Testing Type*</span><span class="text-start">:</span></label>
            <span>
                <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getTestingType} name="TestingType" id="TestingType">
                {test_types.map((test_type, index) => (
                    <option key={index} value={test_type}>
                      {test_type}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        </div>
        <div class="filters-legend flex flex-row">
        <div class='w-1/2'><span id="rag_alert"></span></div>
        <div class='w-1/2'><span id="test_type_alert"></span></div>
        </div>
        <div class="filters-legend flex flex-row">
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Weekly Deliverable*</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="WeeklyDeliverable" onChange={getWeeklyDeliverable} placeholder="Enter Weekly Deliverable"></textarea></span>
        </div>
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Sub-Tasks</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="SubTasks" placeholder="Enter Sub Tasks"></textarea></span>
        </div>
        </div>
        <div><span id="weekly_deliverables_alert"></span></div>
        <div class="filters-legend flex flex-row">
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Impediments</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="Impediments" placeholder="Enter Impediments"></textarea></span>
        </div>
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Action-items</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="ActionItems" placeholder="Enter Action Items"></textarea></span>
        </div>
        </div>
        <div class="filters-legend flex flex-row">
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Comments</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="Comments" placeholder="Enter Comments"></textarea></span>
        </div>
        <div class='filters flex justify-between w-1/2'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Upcoming Leaves</span><span class="text-start">:</span></label>
            <span class='flex justify-between'>
            <input class="w-1/2" style={{width:'160px',padding: '0.5rem',border: '1px solid #d1d5db',borderRadius: '0.25rem'}} type="date" id="Starspanate" name="From Date" placeholder="From Date" min="2015-01-01" max="2030-12-31" />
            <span class='text-center' style={{width:'20px'}}>to</span>
            <input class="w-1/2" style={{width:'160px',padding: '0.5rem',border: '1px solid #d1d5db',borderRadius: '0.25rem'}}type="date" id="EndDate" name="To Date"  placeholder="From Date" min="2015-01-01" max="2030-12-31" />
            </span>
        </div>
        </div>
        <button class="default_Button" id="Submit_Button" onClick={sendInput}>
            Submit
        </button>
        <button class="default_Button" onClick={()=>{setuppopup(true)}}>
            Upload
        </button>
        <label id="alert"></label>
        </div>
    </div>
</div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    {uppopup&&
    <div id='add_project_popup'>
    <button onClick={()=>{setuppopup(false)}} style={{color:'gray',marginLeft:'1000px'}}>x</button>
    <div id="sub_page_box" style={{height:'200px'}}>
    <div class="mt-4 p-2">
        <input type="file" id="upload-file" accept=".csv, .xlsx" onChange={handleFileChange}/>
        <button id="upload-button" class="default_Button d-block" onClick={upload_new_project}>
          Upload
        </button>
      </div>
    </div>
    </div>}
    </>
    );
};

export default DataEndivyWSR;