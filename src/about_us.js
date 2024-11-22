import React, {useState, useEffect } from 'react';

const About_Us = () => {
    const [employees, setEmployees] = useState(['-- Select --']);
    const [employeeNames, setEmployeeNames] = useState(['-- Select --']);
    const request_types = ['-- Select --', 'Accelerator', 'Support'];

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

    // Function to validate form fields and show success message
    function validateForm(e) {
        e.preventDefault();
        var description = document.getElementById("description").value;
        var empName = document.getElementById("emp_name").value;
        var clName = document.getElementById("client_name").value;
        var dlName = document.getElementById("delivery_lead").value;
        var areaSelect = document.getElementById("area").value;
        var primaryContact = document.getElementById("primary-contact").value;
        var secondaryContact = document.getElementById("secondary-contact").value;
        var request_type=document.getElementById("ChooseRequestType").value;

        //if (clientPartner.trim() === "" || description.trim() === "") {
            //alert("Please fill in the Client Partner and Request Description fields.");
        //    return false;
        //}

        // Show success message
        //alert("Your request has been placed successfully!");

        //return true;
        fetch("https://my-repo-chi-coral.vercel.app/inserttoai", {
          method: "POST",
          body: JSON.stringify([{
          "action_item_type":"Request",
          "employee_name":empName,
          "client_name":clName,
          "lead_name":dlName,
          "request_type":request_type,
          "request_area":areaSelect,
          "poc_primary":primaryContact,
          "poc_secondary":secondaryContact,
          "request_description":description
          }]),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          PopupFunction("Request Submitted Successfully");
    }

    /*function initPage() {
        var form = document.getElementById("requestForm");
        var sendButton = form.querySelector("button[type=submit]");

            sendButton.disabled = !form.checkValidity();
    }*/

    /*useEffect(() => {
        var form = document.getElementById("requestForm");
        var sendButton = form.querySelector("button[type=submit]");

        // Initially disable the button
        sendButton.disabled = true;
      },[]);*/

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
        };
    
        fetchData(); // Call the function to fetch data
      }, []);


  return (
    <>
    <div class="container">
        <div id="page_header">
          <h1>About us</h1>
        </div>
        <main>
            <section id="section" style={{margin: '1rem'}}>
                <div id="sub_page_box">
                <h5 id="sub_page_headers">Why choose Quality Engineering?</h5>
                <p id="sub_page_content">Our team ensures the highest quality by delivering comprehensive testing and certification for your product, making it bug-free. We utilize multi-level, multi-browser, and multi-tests through advanced accelerators, automated tools, and cutting-edge technologies.</p>
                </div>
                <div class="flex flex-row gap-4 mt-2">
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5>New Proposals</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">We are delighted to work with you on creating test proposals for our existing or new clients.</p>
                            </div>
                        </div>
                    </div>
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5>Practice Capability Demo</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">We would be pleased to showcase our expertise in Quality Assurance and Delivery as part of our current engagements, utilizing our test accelerators.</p>
                            </div>
                        </div>
                    </div>
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5>Estimates</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">We can collaborate on the test estimates and revisions for QE expansion using our ROI templates.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-4 mt-2">
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5 >Practice Leadership Connect</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">We would love to hear your feedback and thoughts on how we can improve and serve you better.</p>
                            </div>
                        </div>
                    </div>
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5>Quality Assurance Strategies</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">Explore our comprehensive strategies for ensuring product quality and reliability.</p>
                            </div>
                        </div>
                    </div>
                    <div class="gap-4 w-1/3 d-flex align-items-stretch">
                        <div id="sub_page_box">
                            <div id="sub_page_headers">
                                <h5>Client Success Stories</h5>
                            </div>
                            <div>
                                <p id="sub_page_content">Read about our successful engagements and how we have helped clients achieve their goals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="form-section">
                <form id="requestForm" 
                //onInput={initPage} 
                onSubmit={validateForm} >
                    <fieldset>
                        <legend id="page_sub-headers">Request Form</legend>
                        <hr></hr>
                        <div class="form-group">
                            <label for="emp_name">Resouce Name:</label>
                            <select id="emp_name" name="emp_name" class="form-control" onChange={updateDetails}>
                            {employeeNames.map((emp, index) => (
                                <option key={index} value={emp}>
                                {emp}
                                </option>
                            ))}    
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="delivery_lead">Delivery Lead:</label>
                            <input type="text" id="delivery_lead" name="delivery_lead" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="client_name">Client Partner:</label>
                            <input type="text" id="client_name" name="client_name" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="ChooseRequestType">Request Type:</label>
                            <select name="ChooseRequestType" class="form-control" id="ChooseRequestType">
                            {request_types.map((request_type, index) => (
                            <option key={index} value={request_type}>
                            {request_type}
                            </option>
                             ))}  
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="area">Choose Area:</label>
                            <select id="area" name="area" class="form-control" onChange={()=>{updateContacts()}}>
                                <option value="">Choose an Area</option>
                                <option value="New Proposals">New Proposals</option>
                                <option value="Practice Capability Demo">Practice Capability Demo</option>
                                <option value="Estimates">Estimates</option>
                                <option value="Practice Leadership Connect">Practice Leadership Connect</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="primary-contact">Point of Contact - Primary:</label>
                            <input type="text" id="primary-contact" name="primary-contact" class="form-control" aria-label="Primary Point of Contact"/>
                        </div>
                        <div class="form-group">
                            <label for="secondary-contact">Point of Contact - Secondary:</label>
                            <input type="text" id="secondary-contact" name="secondary-contact" class="form-control" aria-label="Secondary Point of Contact"/>
                        </div>
                        <div class="form-group">
                            <label for="description">Request Description:</label>
                            <textarea id="description" name="description" class="form-control" rows="4" aria-label="Request Description" required></textarea>
                        </div>
                        <button type="submit" class="default_Button">Send Request</button>
                    </fieldset>
                </form>
            </section>
        </main>
    </div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </>
  );
};

export default About_Us;