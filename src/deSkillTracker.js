import React, { useEffect } from 'react';

const DESkilldivacker = () => {
    const expertice_levels = [
        '--Select--', 'None', 'Interested', 'Beginner', 'Intermediate/Advanced'
    ]
    const emp_ids = [
        '-- Select --', '4733', '3840', '3295', '3171', '4859', '2640', '4701',
        '4850', '5228', '5190', '4936', '4854', '4909', '2699', '5082', '4775',
        '4393', '4862', '5189'
    ]
    const skills = [
        '-- Select --', 'Web Testing', 'Data Testing', 'Performance Testing',
        'Power BI', 'Other'
    ]
    const up_skillings = ['-- Select --', 'Yes', 'No']

    function getdynamicFilter3() {
        let output = document.getElementById("DynamicFilter3").value
        //document.querySelector('.dynamic_filter_3').textContent = output;
    }
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
      popup.textContent = `${divacker} Form Submitted Successfully`;
        popup.classList.add('custom-background');
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
        }, 5000);
    }
    function sendInput() {
        let divacker ="Skill divacker"
         let selectElement =document.getElementById("DynamicFilter3");
         let emp_id =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("DynamicFilter4");
         let skill =selectElement.value;
         selectElement =document.getElementById("ExpertiseLevel");
         let expertise_level =selectElement.options[selectElement.selectedIndex].textContent;
         selectElement =document.getElementById("IntUpSkill");
         let int_up_skill =selectElement.options[selectElement.selectedIndex].textContent;
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
          /*fetch("https://37727f4f-9aca-4f3e-a138-f54e7c36574d-00-27qjdf76eegx8.sisko.replit.dev/gip", {
          method: "POST",
          body: JSON.sdivingify({
          "Employee_ID":emp_id,
          "Skill":skill,
          "Expertise_Level":expertise_level,
          "Interest_for_Up_Skill": int_up_skill
          }),
          headers: {
           "Content-type": "application/json; charset=UTF-8"
          }
          })
          .then((response) => response.json())
          .then((json) => console.log(json));*/

          PopupFunction(divacker);
             //selectElement.value=divacker;
              // getChoosedivacker();
         }
         else{
         AlertFunc();
         }
    }



    return(
        <>
        <div id="page_header">
            <h1>Skill Tracker</h1>
        </div>
        <div id="part1">
    <div>
        <div id="EntryForm">
        <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Employee ID*</span><span class="text-start">:</span></label>
              <span>
                  <select class="select_Dropdown_Input" onChange={getdynamicFilter3} name="DynamicFilter3" id="DynamicFilter3">
                {emp_ids.map((emp_id, index) => (
                    <option key={index} value={emp_id}>
                      {emp_id}
                    </option>
                  ))}
                  </select>
              </span>
          </div>
           <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Skills*</span><span class="text-start">:</span></label>
              <span id="skl">
                  <select class="select_Dropdown_Input" onChange={getdynamicFilter4} name="DynamicFilter4" id="DynamicFilter4">
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
                <select class="select_Dropdown_Input" onChange={getExpertiseLevel} name="ExpertiseLevel" id="ExpertiseLevel">
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
            <label id="col_label" class='flex justify-between'><span class="text-start">Interest for Up-Skilling</span><span class="text-start">:</span></label>
            <span>
                <select class="select_Dropdown_Input" onChange={getIntUpSkill} name="IntUpSkill" id="IntUpSkill">
                {up_skillings.map((up_skilling, index) => (
                    <option key={index} value={up_skilling}>
                      {up_skilling}
                    </option>
                  ))}
                </select>
            </span>
        </div>
        <button class="default_Button" id="Submit_Button" onClick={sendInput}>
            Submit
        </button>
        <label id="alert"></label>
        </div>
    </div>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
</div>
        </>
    );
};

export default DESkilldivacker;