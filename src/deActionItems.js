import React, { useState,useEffect } from 'react';

const DEActionItems = (props) => {
    const [currentTracker, setcurrentTracker] = useState("Action Items for Practice - Request");
    const [currentSelectedTracker, setcurrentSelectedTracker] = useState("Request");
    const [employees, setEmployees] = useState(['-- Select --']);
    const [employeeNames, setEmployeeNames] = useState(['-- Select --']);

    const leads = ['-- Select --', 'Jeena', 'Thazhuva', 'Sivanash', 'Jennifer'];
    const trackers = [
        'Action Items for Practice - Request',
        'Action Items for Practice - Feedback'
    ]
    const area_of_supports_Request = ['Request']
    const area_of_supports_Feedback = ['Feedback']
    const client_names = ['-- Select --', 'Mars', 'Prologis', 'Nationwide', 'Other']
    const request_types = ['-- Select --', 'Accelerator', 'Support']


    function displayRadioValue() {
        var ele = document.getElementsByName('rate1');
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked)
                console.log(ele[i].value);
        }
    }
    function updateDetails() {
        var empName = document.getElementById("emp_name");
        var clName = document.getElementById("client_name");
        var dlName = document.getElementById("delivery_lead");
        for (let emp of employees){
            console.log("AFTER SELECT",empName.value,emp)
            if(empName.value==emp["name"]){
                clName.value = emp["customer"];
                dlName.value = emp["lead"];
            }
        }
    }
    function updateContacts() {
        var areaSelect = document.getElementById("area");
        var primaryContact = document.getElementById("primary-contact");
        var secondaryContact = document.getElementById("secondary-contact");

        if (areaSelect.value === "New Proposals") {
            primaryContact.value = "Sivanash";
            secondaryContact.value = "Jennifer";
        } else if (areaSelect.value === "Practice Capability Demo") {
            primaryContact.value = "Sahil";
            secondaryContact.value = "Lokeshwaran";
        } else if (areaSelect.value === "Estimates") {
            primaryContact.value = "Thazuva";
            secondaryContact.value = "Jenna";
        } else if (areaSelect.value === "Practice Leadership Connect") {
            primaryContact.value = "Hashim";
            secondaryContact.value = "Lakshman";
        } else {
            primaryContact.value = "";
            secondaryContact.value = "";
        }
    }
    function getAreaofSupport() {
        let selectElement =document.getElementById("ChooseTracker");
        let Tracker =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        let aos = "Request";
        if (Tracker=="Action Items for Practice - Request")
        {
            aos = "Request";
        }
        else{
            aos = "Feedback";
        }
        setcurrentSelectedTracker(aos);
    }
    function getClientName() {
        let output = document.getElementById("ClientName").value
        let client = document.getElementById("ClientName").value
        if(client=="Other"){
        document.getElementById("clnt").innerHTML =`<input onchange="getClientName()" type="text" id="ClientName" name="ClientName" placeholder="Enter Client Name">`;
        }
        //document.querySelector('.client_name').textContent = output;
        document.getElementById('client_name_alert').textContent = "";
    }
    function getQEDeliveryLead() {
        let output = document.getElementById("QEDeliveryLead").value
        //document.querySelector('.qe_delivery_lead').textContent = output;
        document.getElementById('qe_delivery_lead_alert').textContent = "";
    }
    function getChooseRequestType() {
        let output = document.getElementById("ChooseRequestType").value
        //document.querySelector('.choose_request_type').textContent = output;
        document.getElementById('request_type_alert').textContent = "";
    }
    function getRequestorName() {
        let requestor_name = document.getElementById("RequestorName").value
        if(requestor_name==""){
        document.getElementById('requestor_name_alert').textContent = "*Please Enter Requestor Name";
        }
        else{
        document.getElementById('requestor_name_alert').textContent = "";
        }
    }
    function getRequesspanescription() {
        let request_description = document.getElementById("Requesspanescription").value
        if(request_description==""){
        document.getElementById('request_description_alert').textContent = "*Please Enter Request Description";
        }
        else{
        document.getElementById('request_description_alert').textContent = "";
        }
    }
    function getAreastoImprove() {
        let areas_to_improve =document.getElementById("AreastoImprove").value;
        if(areas_to_improve==""){
        document.getElementById('areas_to_improve_alert').textContent = "*Please Enter Areas to Improve";
        }
        else{
        document.getElementById('areas_to_improve_alert').textContent = "";
        }
    }

    function getChooseTracker() {
        let selectElement =document.getElementById("ChooseTracker");
        let tracker =
            selectElement.options
            [selectElement.selectedIndex].textContent;
            console.log("Tracker",tracker)
            setcurrentTracker(tracker);
        
        if(tracker=="Action Items for Practice - Request"){
            setcurrentSelectedTracker("Request");
        }
        else {
            setcurrentSelectedTracker("Feedback");
        }

        getAreaofSupport();
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
        const end_popup = document.getElementById("loading_popup");
        end_popup.classList.toggle("hidden");
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
          end_popup.classList.toggle("hidden");
        }, 5000);
    }
    function sendInput() {
        props.setLoad(true);
        let selectElement =document.getElementById("ChooseTracker");
        let Tracker =
            selectElement.options
            [selectElement.selectedIndex].textContent;
        if (Tracker=="Action Items for Practice - Request" || Tracker=="Action Items for Practice - Feedback"){
         //selectElement =document.getElementById("AreaofSupport");
         let area_of_support ="Request"
         if (Tracker=="Action Items for Practice - Request")
        {
            area_of_support = "Request";
        }
        else{
            area_of_support = "Feedback";
        }
         let flag=true;
         if(area_of_support=="Request"){
         selectElement =document.getElementById("ChooseRequestType");
         let request_type =selectElement.options[selectElement.selectedIndex].textContent;
         let request_description = document.getElementById("Requesspanescription").value
         var empName = document.getElementById("emp_name").value;
        var clName = document.getElementById("client_name").value;
        var dlName = document.getElementById("delivery_lead").value;
        var areaSelect = document.getElementById("area").value;
        var primaryContact = document.getElementById("primary-contact").value;
        var secondaryContact = document.getElementById("secondary-contact").value;
         if(request_type=="--Select--"){
          flag=false;
          document.getElementById('request_type_alert').textContent = "*Please Select Request Type";
         }
         if(clName=="-- Select --"){
          flag=false;
          document.getElementById('client_name_alert').textContent = "*Please Select Client Name";
         }
         if(dlName=="-- Select --"){
          flag=false;
          document.getElementById('qe_delivery_lead_alert').textContent = "*Please Select QE Delivery Lead";
         }
         if(empName==""){
          flag=false;
          document.getElementById('requestor_name_alert').textContent = "*Please Enter Requestor Name";
         }
         if(request_description==""){
          flag=false;
          document.getElementById('request_description_alert').textContent = "*Please Enter Request Description";
         }
         if(flag){
          fetch("https://my-repo-chi-coral.vercel.app/inserttoai", {
          method: "POST",
          body: JSON.stringify([{
          "action_item_type":area_of_support,
          "employee_name":empName,
          "client_name":clName,
          "lead_name":dlName,
          "request_type":request_type,
          "request_area":areaSelect,
          "poc_primary":primaryContact,
          "poc_secondary":secondaryContact,
          "request_description":request_description
          }]),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          PopupFunction("Request Submitted Successfully");
          document.getElementById("ChooseRequestType").value="-- Select --";
          document.getElementById("Requesspanescription").value="";
          document.getElementById("emp_name").value="-- Select --";
          document.getElementById("client_name").value="";
          document.getElementById("delivery_lead").value="";
          document.getElementById("area").value="-- Select --";
          document.getElementById("primary-contact").value="";
          document.getElementById("secondary-contact").value="";
             //selectElement.value=Tracker;
               //getChooseTracker();
         }}
         else{
            let areas_to_improve =document.getElementById("AreastoImprove").value;
            let request_rating = "";
            let lnd_rating = "";
            var ele = document.getElementsByName('rate');
            for (let i = 0; i < ele.length; i++) {
               if (ele[i].checked)
                   request_rating=ele[i].value;
            }
            var ele = document.getElementsByName('rate1');
            for (let i = 0; i < ele.length; i++) {
               if (ele[i].checked)
                   lnd_rating=ele[i].value;
            }
            if(areas_to_improve==""){
             flag=false;
             document.getElementById('areas_to_improve_alert').textContent = "*Please Enter Areas to Improve";
            }
            if(flag){
             fetch("https://my-repo-chi-coral.vercel.app/inserttoai", {
             method: "POST",
             body: JSON.stringify([{
             "action_item_type":area_of_support,
             "area_of_improvement":areas_to_improve,
             "rating_for_request":request_rating,
             "rating_for_l_and_d":lnd_rating
             }]),
             headers: {
              "Content-type": "application/json; charset=UTF-8"
             }
             })
             .then((response) => response.json())
             .then((json) => console.log(json));

             PopupFunction("Feedback Submitted Successfully");
             document.getElementById("AreastoImprove").value="";
             document.getElementsByName('rate').value="";
             document.getElementsByName('rate1').value="";
                //selectElement.value=Tracker;
                  //getChooseTracker();
            }
            else{
            AlertFunc();
            }
            }
        }
        props.setLoad(false);
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
          const emps=[];
          const emp_names=['-- Select --'];
          for (let emp of result2["data"]){
            emps.push({
                "name": emp["employee_name"],
                "lead": emp["lead_name"],
                "customer": emp["customer_name"]
            });
            emp_names.push(emp["employee_name"]);
           }
           setEmployees(emps);
           setEmployeeNames(emp_names);
           props.setLoad(false);
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

    return(
        <>
        <div id="page_header">
        <h1>Action Items</h1>
        </div>
    <div id="part1">
        <div id="EntryForm">
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Choose Tracker</span><span class="text-start">:</span></label>
            <span id="ChoosedTracker">
                <select
                    onChange={getChooseTracker}
                    name="ChooseTracker"
                    id="ChooseTracker"
                    class="select_Dropdown_Input"
                    style={{width:'350px'}}
                >
                    {trackers.map((tracker, index) => (
                        <option key={index} value={tracker}>
                        {tracker}
                        </option>
                    ))}
                </select>
            </span>
            </div>
            <hr/>
            {currentTracker=="Action Items for Practice - Request"&&
            <div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Requestor Name*</span><span class="text-start">:</span></label>
                <span>
                <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={updateDetails} name="ClientName" id="emp_name">
                    {employeeNames.map((emp, index) => (
                    <option key={index} value={emp}>
                      {emp}
                    </option>
                  ))}
                    </select>
                </span>
            </div>
            <div><span id="requestor_name_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Client Name*</span><span class="text-start">:</span></label>
                <span id="clnt" >
                <input style={{width:'350px'}} class="text_Input" type="text" id="client_name" placeholder="Client Name" />
                </span>
            </div>
            <div><span id="client_name_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">QE Delivery Lead*</span><span class="text-start">:</span></label>
                <span>
                <input style={{width:'350px'}} class="text_Input" type="text" id="delivery_lead" placeholder="Delivery Lead" />
                </span>
            </div>
            <div><span id="qe_delivery_lead_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Choose Request Type*</span><span class="text-start">:</span></label>
                <span>
                    <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getChooseRequestType} name="ChooseRequestType" id="ChooseRequestType">
                    {request_types.map((request_type, index) => (
                    <option key={index} value={request_type}>
                      {request_type}
                    </option>
                  ))}
                    </select>
                </span>
            </div>
            <div><span id="request_type_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Request Area*</span><span class="text-start">:</span></label>
                <span>
                    <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={updateContacts} name="RequestArea" id="area">
                                <option value="">Choose an Area</option>
                                <option value="New Proposals">New Proposals</option>
                                <option value="Practice Capability Demo">Practice Capability Demo</option>
                                <option value="Estimates">Estimates</option>
                                <option value="Practice Leadership Connect">Practice Leadership Connect</option>
                    </select>
                </span>
            </div>
            <div><span id="request_type_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">POC - Primary*</span><span class="text-start">:</span></label>
                <span><input style={{width:'350px'}} class="text_Input" type="text" id="primary-contact" placeholder="Point Of Contact - Primary" /></span>
            </div>
            <div><span id="request_description_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">POC - Secondary*</span><span class="text-start">:</span></label>
                <span><input style={{width:'350px'}} class="text_Input" type="text" id="secondary-contact" placeholder="Point Of Contact - Secondary" /></span>
            </div>
            <div><span id="request_description_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Request Description*</span><span class="text-start">:</span></label>
                <span><textarea class="text_Input" id="Requesspanescription" onChange={getRequesspanescription} placeholder="Enter Request Description"></textarea></span>
            </div>
            <div><span id="request_description_alert"></span></div>
            </div>
            }
            {currentTracker=="Action Items for Practice - Feedback"&&<div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span style={{width:'180px'}} class="text-start">Areas to Improve*</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="AreastoImprove" onChange={getAreastoImprove} placeholder="Enter Areas to Improve"></textarea></span>
        </div>
        <div><span id="areas_to_improve_alert"></span></div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span style={{width:'180px'}} class="text-start">Rate us on Request provided</span><span class="text-start">:</span></label>
            <span>  <div class="rate">
                    <input onclick="sendInput(5)" type="radio" id="star5" name="rate" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">1 star</label>
                  </div>
            </span>
        </div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span style={{width:'180px'}} class="text-start">Rate us on L&D provided</span><span class="text-start">:</span></label>
            <span>  <div class="rate1">
                    <input type="radio" id="star51" name="rate1" value="5" />
                    <label for="star51" title="text">5 stars</label>
                    <input type="radio" id="star41" name="rate1" value="4" />
                    <label for="star41" title="text">4 stars</label>
                    <input type="radio" id="star31" name="rate1" value="3" />
                    <label for="star31" title="text">3 stars</label>
                    <input type="radio" id="star21" name="rate1" value="2" />
                    <label for="star21" title="text">2 stars</label>
                    <input type="radio" id="star11" name="rate1" value="1" />
                    <label for="star11" title="text">1 star</label>
                  </div>
            </span>
        </div>
        </div>}
    <button class="default_Button" onClick={sendInput}>
            Submit
        </button>
        <label id="alert"></label>
        </div>
        <div id="loading_popup" class='hidden'>
        <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </div>
    </div>
        </>
    )
};

export default DEActionItems;