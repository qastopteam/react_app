import React, { useEffect } from 'react';

const DELeaveTracker = () => {
    const leave_types = [
        '-- Select --', 'Planned Leave', 'Un-Planned Leave', 'Maternity Leave',
        'Paternity Leave', 'Adoption Leave'
    ];
    const employees = [
        {
            "name": "Aarti Kyama",
            "lead": "Thazhuva",
            "project": "PEPSICO_PFNA ADD CUT PORTAL"
        },
        {
            "name": "Abhishek Gupta",
            "lead": "Jeena",
            "project": "MARS_US_MW_Fetch Dashboard Enhancement_2023"
        },
        {
            "name": "Ajit Singh",
            "lead": "Jennifer",
            "project": "Practise - Bench"
        },
        {
            "name": "Akash Gupta",
            "lead": "Thazhuva",
            "project": "PEPSICO_CTO CV PEPIRIS"
        },
        {
            "name": "Akib Basheer",
            "lead": "Thazhuva",
            "project": "PEPSICO_CTO CV_LABEL RIGHT"
        },
        {
            "name": "Amar Namdev Memane",
            "lead": "Thazhuva",
            "project": "PEPSICO_DATA FOUNDATION_FP&A"
        },
        {
            "name": "Aniket Baban Turankar",
            "lead": "Jennifer",
            "project": "T MOBILE_CUSTOMER SALESFORCE DATA PRODUCT"
        },
        {
            "name": "Anitha Paramasivan",
            "lead": "Sivanash",
            "project": "MERCK_SOTATERCEPT_ LAUNCH DASHBOARD"
        },
        {
            "name": "Anupama Vaibhav Shinde",
            "lead": "Thazhuva",
            "project": "PEPSICO_CGF_COMPASS"
        },
        {
            "name": "Arnavi Amol Patil",
            "lead": "Jeena",
            "project": "NATIONWIDE_DATA_CURATION_SERVICE"
        },
        {
            "name": "Arputha Aswin Chandra Sekar",
            "lead": "Sivanash",
            "project": "QUANTUM ENERGY PARTNERS-2"
        },
        {
            "name": "Arul Sekar",
            "lead": "Thazhuva",
            "project": "PEPSICO_DATA FOUNDATION_FP&A"
        },
        {
            "name": "Bhagya Sree Kota",
            "lead": "Thazhuva",
            "project": "PEPSICO_PFNA IWMS"
        },
        {
            "name": "Charan Kumar Thanugonda",
            "lead": "Jeena",
            "project": "PROLOGIS_COO KPI Dashboard_Retainer"
        },
        {
            "name": "Ezhilarasi Rajendran",
            "lead": "Jennifer",
            "project": "Practise - Bench"
        },
        {
            "name": "Jagadeesh Kumar Chippada",
            "lead": "Sivanash",
            "project": "QUANTUM ENERGY PARTNERS-2"
        },
        {
            "name": "Jeena Jacob",
            "lead": "Jeena",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
        {
            "name": "Jeevitha Venkatesan",
            "lead": "Jeena",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
        {
            "name": "Jenifer Baby Celus Arulraj",
            "lead": "Jennifer",
            "project": "PROLOGIS_STARTER PACKS_MNG_RETAINER"
        },
    ];
    const leads = ['-- Select --', 'Jeena', 'Thazhuva', 'Sivanash', 'Jennifer'];

    function getPracticeLead() {
        let selectElement =document.getElementById("PracticeLead");
        let lead_name =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        //lead_name = document.getElementById("PracticeLead").value
        //document.querySelector('.practice_lead').textContent = lead_name;
        let emps= ['-- Select --'];
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
    function getResourceName() {
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
    }

    function getLeaveType() {
        let output = document.getElementById("LeaveType").value
        //document.querySelector('.leave_type').textContent = output;
        document.getElementById('leave_type_alert').textContent = "";
    }
    function gespanateDiff(){
        let date1 = document.getElementById("Starspanate").value
        let date2 = document.getElementById("EndDate").value
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
      popup.textContent = `${Tracker} Form Submitted Successfully`;
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
          /*fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.stringify({
          "Practice_Lead":practice_lead,
          "Resource_Name":resource_name,
          "Leave_Type":leave_type
          }),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));*/

          PopupFunction(Tracker);
          //selectElement.value=Tracker;
          //getChooseTracker();
         }
         else{
         AlertFunc();
         }
    }

    return(
        <>
        <div id="page_header">
        <h1>Leave Tracker</h1>
        </div>
        <div id="part1">
        <div id="EntryForm">
        <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Practice Lead</span><span class="text-start">:</span></label>
              <span>
                    <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getPracticeLead} name="PracticeLead" id="PracticeLead">
                    {leads.map((lead, index) => (
                    <option key={index} value={lead}>
                      {lead}
                    </option>
                  ))}
                    </select>
              </span>
          </div>
          <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Resource Name</span><span class="text-start">:</span></label>
              <span>
                  <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getResourceName} name="ResourceName" id="ResourceName">
                      <option  value="-- Select --">-- Select --</option>
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
            <span><input class="text_Input" type="date" id="Starspanate" onChange={gespanateDiff} name="trip-start" value="2024-05-22" min="2018-01-01" max="2025-12-31" /></span>
        </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">End Date</span><span class="text-start">:</span></label>
            <span><input class="text_Input" type="date" id="EndDate" onchange={gespanateDiff} name="trip-end" value="2024-05-22" min="2018-01-01" max="2025-12-31" /></span>
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