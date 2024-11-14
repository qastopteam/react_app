import React, { useState,useEffect } from 'react';

const DEActionItems = () => {
    const [currentTracker, setcurrentTracker] = useState("Action Items for Practice - Request");
    const [currentSelectedTracker, setcurrentSelectedTracker] = useState("Request");

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
      popup.textContent = `${Tracker} Form Submitted Successfully`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    function sendInput() {
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
         selectElement =document.getElementById("ClientName");
         let client_name =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("QEDeliveryLead");
         let qe_delivery_lead =selectElement.options[selectElement.selectedIndex].textContent;
         let requestor_name = document.getElementById("RequestorName").value
         let request_description = document.getElementById("Requesspanescription").value
         if(request_type=="--Select--"){
          flag=false;
          document.getElementById('request_type_alert').textContent = "*Please Select Request Type";
         }
         if(client_name=="-- Select --"){
          flag=false;
          document.getElementById('client_name_alert').textContent = "*Please Select Client Name";
         }
         if(qe_delivery_lead=="-- Select --"){
          flag=false;
          document.getElementById('qe_delivery_lead_alert').textContent = "*Please Select QE Delivery Lead";
         }
         if(requestor_name==""){
          flag=false;
          document.getElementById('requestor_name_alert').textContent = "*Please Enter Requestor Name";
         }
         if(request_description==""){
          flag=false;
          document.getElementById('request_description_alert').textContent = "*Please Enter Request Description";
         }
         if(flag){
          /*fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.stringify({
          "Area_of_Support":area_of_support,
          "Request_Type":request_type,
          "Client_Name":client_name,
          "QE_Delivery_Lead":qe_delivery_lead,
          "Requestor_Name":requestor_name,
          "Request_Description":request_description
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
             /*fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
             method: "POST",
             body: JSON.stringify({
             "Area_of_Support":area_of_support,
             "Areas_to_Improve":areas_to_improve,
             "Request_Rating":request_rating,
             "L_and_D_Rating":lnd_rating
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
        }
    }




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
                    <input style={{width:'350px'}} class="text_Input" onChange={getRequestorName} type="text" id="RequestorName" name="RequestorName" placeholder="Enter Requestor Name"/>
                </span>
            </div>
            <div><span id="requestor_name_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">Client Name*</span><span class="text-start">:</span></label>
                <span id="clnt" >
                    <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getClientName} name="ClientName" id="ClientName">
                    {client_names.map((client_name, index) => (
                    <option key={index} value={client_name}>
                      {client_name}
                    </option>
                  ))}
                    </select>
                </span>
            </div>
            <div><span id="client_name_alert"></span></div>
            <div class='filters'>
                <label id="col_label" class='flex justify-between'><span class="text-start">QE Delivery Lead*</span><span class="text-start">:</span></label>
                <span>
                    <select style={{width:'350px'}} class="select_Dropdown_Input" onChange={getQEDeliveryLead} name="QEDeliveryLead" id="QEDeliveryLead">
                    {leads.map((lead, index) => (
                    <option key={index} value={lead}>
                      {lead}
                    </option>
                  ))}
                    </select>
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
                <label id="col_label" class='flex justify-between'><span class="text-start">Request Description*</span><span class="text-start">:</span></label>
                <span><textarea class="text_Input" id="Requesspanescription" onChange={getRequesspanescription} placeholder="Enter Request Description"></textarea></span>
            </div>
            <div><span id="request_description_alert"></span></div>
            </div>
            }
            {currentTracker=="Action Items for Practice - Feedback"&&<div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Areas to Improve*</span><span class="text-start">:</span></label>
            <span><textarea class="text_Input" id="AreastoImprove" onChange={getAreastoImprove} placeholder="Enter Areas to Improve"></textarea></span>
        </div>
        <div><span id="areas_to_improve_alert"></span></div>
        <div class='filters'>
            <label id="col_label" class='flex justify-between'><span class="text-start">Rate us on Request provided</span><span class="text-start">:</span></label>
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
            <label id="col_label" class='flex justify-between'><span class="text-start">Rate us on L&D provided</span><span class="text-start">:</span></label>
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
    )
};

export default DEActionItems;