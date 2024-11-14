import React, {useState, useEffect } from 'react';

const DataEndivyWSR = () => {
    const [employees, setEmployees] = useState([]);
    const [leads, setLeads] = useState(['-- Select --']);
    const [projects, setProjects] = useState(['-- Select --']);
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('zh-CN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const formattedDate = formatter.format(date).replaceAll('/', '-');
    const rags = ['-- Select --', 'Red', 'Amber', 'Green'];
    const test_types = [
        '-- Select --', 'Web App Testing', 'Data Testing',
        'Performance testing', 'BI Testing'
    ];

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
        document.getElementById("ResourceName").innerHTML=emps.map((employee) => `
                <option  value=${employee}>${employee}</option>
            `,
                        )
                        .join("");
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
        document.getElementById("ProjectName").innerHTML=projects.map((project) => `
            <option  value=${project}>${project}</option>
        `,
                    )
                    .join("");
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
    function getChoosedivacker() {
        let divacker ="Weekly RAG Status"
        //output = document.getElementById("Choosedivacker").value
        //document.querySelector('.choose_divacker').textContent = output;
        //divacker = document.getElementById("Choosedivacker").value
        
         
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
      popup.textContent = `${divacker} Form Submitted Successfully`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    function sendInput() {
        let divacker ="Weekly RAG Status"
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
          /*let  sub_tasks = document.getElementById("SubTasks").value
          let impediments = document.getElementById("Impediments").value
          let action_items = document.getElementById("ActionItems").value
          let comments = document.getElementById("Comments").value
          let start_date = document.getElementById("Starspanate").value
          let end_date = document.getElementById("EndDate").value
          fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.sdivingify({
          "Practice_Lead":practice_lead,
          "Resource_Name":resource_name,
          "Project_Name":project_name,
          "RAG_Status": rags,
          "Test_Type": test_type,
          "Weekly_Deliverable": weekly_deliverable,
          "Sub_Tasks":sub_tasks,
          "Impediments":impediments,
          "Action_Items":action_items,
          "Comments":comments,
          "Start_Date":start_date,
          "End_Date":end_date
          }),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));*/

          PopupFunction(divacker);
               getChoosedivacker();
         }
         else{
         AlertFunc();
         }
        
    }

    useEffect(() => {
        getChoosedivacker();
      },[]);
    
      useEffect(() => {
        const fetchData = async () => {

          const response = await fetch('http://127.0.0.1:5000/newemps');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log("RESULT",result);
          const emps=[];
          const l=['-- Select --'];
          for (let emp of result){
            if (!l.includes(emp[11])) {
                l.push(emp[11]);  // Add the string to the array if it's not already there
            }
            emps.push({
                "name": emp[1],
                "lead": emp[11],
                "project": emp[10]
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
                      <option  value="-- Select --">-- Select --</option>
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
        <label id="alert"></label>
        </div>
    </div>
</div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </>
    );
};

export default DataEndivyWSR;