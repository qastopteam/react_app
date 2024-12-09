import React, {useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const DESkilldivacker = (props) => {
    const [uppopup, setuppopup] = useState(false);
    const [exceldata, setExcelData] = useState([]);
    const [employees, setEmployees] = useState(['-- Select --']);

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
    const expertice_levels = [
        '--Select--', 'None', 'Interested', 'Beginner', 'Intermediate/Advanced'
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
    const upload_new_project = async ()=>{
      props.setLoad(true);
        const data=[]
    for (let emp of exceldata){
      if (emp.length > 1) {
        data.push({
            "employee_id":emp[0],
            "employee_name":emp[1],
            "base_location":emp[2],
            "skills":emp[3],
            "expertise_level":emp[4],
            "interest_for_up_skill": emp[5]
            });
      }
     }
        const response = await fetch('https://my-repo-chi-coral.vercel.app/inserttoskills', {
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
        PopupFunction("Skill Tracker Uploaded Successfully");
        props.setLoad(false);
      }
    async function sendInput() {
      props.setLoad(true);
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
            const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getemps');
            if (!response2.ok) {
              throw new Error('Network response was not ok');
            }
            const result2 = await response2.json();
            //console.log("RESULT",result);
            console.log("RESULT2",result2);
            let emp_name=[];
            let base_location=[];
            for (let emp of result2["data"]){
              if (emp["employee_no"]==emp_id) {
                  emp_name=emp["employee_name"]
                  base_location=emp["current_city"]
              }
             }
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
          document.getElementById("DynamicFilter3").value="-- Select --";
          document.getElementById("DynamicFilter4").value="-- Select --";
          document.getElementById("ExpertiseLevel").value="--Select--";
          document.getElementById("IntUpSkill").value="-- Select --";
             //selectElement.value=divacker;
              // getChoosedivacker();
         }
         else{
         AlertFunc();
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
          const emps=['-- Select --'];
          for (let emp of result2["data"]){
            emps.push(emp["employee_no"]);
           }
           setEmployees(emps);
           props.setLoad(false);
        };
    
        fetchData(); // Call the function to fetch data
      }, []);

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
                {employees.map((emp_id, index) => (
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
        <button class="default_Button" style={{marginLeft:'10px',marginRight:'20px'}} onClick={sendInput}>
            Submit
        </button>
        <button class="default_Button" onClick={()=>{setuppopup(true)}}>
            Upload
        </button>
        <label id="alert"></label>
        </div>
    </div>
    <div id="loading_popup" class='hidden'>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </div>
    </div>
    {uppopup&&
    <div id="loading_popup">
    <div id="sub_page_box" style={{height:'200px',marginLeft:'100px'}}>
    <button onClick={()=>{setuppopup(false)}} style={{color:'gray',marginLeft:'800px'}}>x</button>
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

export default DESkilldivacker;