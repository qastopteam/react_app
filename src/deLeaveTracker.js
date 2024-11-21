import React, {useState, useEffect } from 'react';

const DELeaveTracker = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeNames, setEmployeeNames] = useState(['-- Select --']);
    const [leads, setLeads] = useState(['-- Select --']);
    const [empID,setEmpID] = useState();
    const leave_types = [
        '-- Select --', 'Planned Leave', 'Un-Planned Leave', 'Maternity Leave',
        'Paternity Leave', 'Adoption Leave'
    ];

    function getResourceName() {
        let lead_name =document.getElementById("PracticeLead");
        //lead_name = document.getElementById("PracticeLead").value
        //document.querySelector('.practice_lead').textContent = lead_name;
        let emps= ['-- Select --'];
        for (let emp of employees){
        if (emp.name==document.getElementById("ResourceName").value){
            document.getElementById("PracticeLead").value=emp["lead"]
            setEmpID(emp["ID"])
        }
        }
    }
    /*function getResourceName() {
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
    }*/

    function getLeaveType() {
        let output = document.getElementById("LeaveType").value
        //document.querySelector('.leave_type').textContent = output;
        document.getElementById('leave_type_alert').textContent = "";
    }
    function gespanateDiff(){
        let date1 = document.getElementById("StartDate").value
        let date2 = document.getElementById("EndDate").value
        console.log("Dates",date1,date2);
        var d1 = new Date(date1);
        var d2 = new Date(date2);
        var diff = d2.getTime() - d1.getTime();
        var daydiff = diff / (1000 * 60 * 60 * 24);
        document.getElementById('total_working_days').textContent = daydiff;
    }
    function getChooseTracker() {
        let Tracker ="Leave Tracker"
        gespanateDiff();
    }
    function AlertFunc() {
        document.getElementById('alert').textContent = "Please Fill the Mandatory Fields(*)";
        setTimeout(function () {
            document.getElementById('alert').textContent = "";
        }, 5000);
        //$('#GFG').text("Div hides after 1 second.");
    }
    function PopupFunction(Tracker) {
      var popup = document.getElementById("myPopup");
      popup.textContent = `${Tracker}`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    function sendInput() {
        let Tracker ="Leave Tracker"
         let selectElement =document.getElementById("PracticeLead");
         let practice_lead =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("ResourceName");
         let resource_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("LeaveType");
         let leave_type =selectElement.options[selectElement.selectedIndex].textContent;
         let date1 = document.getElementById("StartDate").value;
        let date2 = document.getElementById("EndDate").value;
        let leave_days_count=document.getElementById('total_working_days').value;
         let flag=true;
         if(practice_lead=="-- Select --"){
          flag=false;
         }
         if(resource_name=="-- Select --"){
          flag=false;
         }
         if(leave_type=="-- Select --"){
          flag=false;
          document.getElementById('leave_type_alert').textContent = "*Please Select Leave Type";
         }
         if(flag){
          fetch("https://my-repo-chi-coral.vercel.app/inserttolt", {
          method: "POST",
          body: JSON.stringify([{
          "employee_id":empID,
          "lead_name":practice_lead,
          "employee_name":resource_name,
          "leave_type":leave_type,
          "leave_start_date":date1,
          "leave_end_date":date2,
          "leave_days_count":leave_days_count
          }]),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          PopupFunction("Leave Request Submitted Successfully");
          //selectElement.value=Tracker;
          //getChooseTracker();
         }
         else{
         AlertFunc();
         }
    }

    useEffect(() => {
        const fetchData = async () => {

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
          const emps=[];
          const l=['-- Select --'];
          const empNames=['-- Select --'];
          for (let emp of result2["data"]){
            if (!l.includes(emp["lead_name"])) {
                l.push(emp["lead_name"]);  // Add the string to the array if it's not already there
            }
            empNames.push(emp["employee_name"]);
            emps.push({
                "ID":emp["employee_no"],
                "name": emp["employee_name"],
                "lead": emp["lead_name"],
                "project": emp["project_name"]
            });
           }
           setEmployees(emps);
           setLeads(l);
           setEmployeeNames(empNames)
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

    return(
        <>
        <div id="page_header">
        <h1>Leave Tracker</h1>
        </div>
        <div id="part1">
        <div id="EntryForm">
        <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Resource Name</span><span class="text-start">:</span></label>
              <span>
                  <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getResourceName} name="ResourceName" id="ResourceName">
                  {employeeNames.map((emp, index) => (
                    <option key={index} value={emp}>
                      {emp}
                    </option>
                  ))}
                  </select>
              </span>
          </div>
        <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Practice Lead</span><span class="text-start">:</span></label>
              <span>
                    <select style={{width:'350px'}} class="select_Dropdown_Input" name="PracticeLead" id="PracticeLead">
                    {leads.map((lead, index) => (
                    <option key={index} value={lead}>
                      {lead}
                    </option>
                  ))}
                    </select>
              </span>
          </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Leave Type*</span><span class="text-start">:</span></label>
            <span>
                <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getLeaveType} name="LeaveType" id="LeaveType">
                {leave_types.map((leave_type, index) => (
                    <option key={index} value={leave_type}>
                      {leave_type}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        <div><span id="leave_type_alert"></span></div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Start Date</span><span class="text-start">:</span></label>
            <span><input class="text_Input" type="date" id="StartDate" onChange={gespanateDiff} name="trip-start"  min="2018-01-01" max="2025-12-31" /></span>
        </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">End Date</span><span class="text-start">:</span></label>
            <span><input class="text_Input" type="date" id="EndDate" onChange={gespanateDiff} name="trip-end" min="2018-01-01" max="2025-12-31" /></span>
        </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Total Working Days</span><span class="text-start">:</span></label>
            <span id="total_working_days">0</span>
        </div>
        <button class="default_Button" id="Submit_Button" onClick={sendInput}>
            Submit
        </button>
        <label id="alert"></label>
    </div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
</div>
        </>
    );
};

export default DELeaveTracker;