import React, {useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const Projects = (props) => {
  const [addNewProject, setAddNewProject] = useState(false);
  const [addPRJ, setAddPRJ] = useState(true);
  const [exceldata, setData] = useState([]);
  const [employees, setEmployees] = useState(['-- Select --']);
    const [leads, setLeads] = useState(['-- Select --']);
    const [ragStatus, setRAGStatus] = useState(false);
    const [ragTable, setRAGTable] = useState([]);
    const [pieChartData, setPieChartData] = useState();

    const pieChartDataOptions = {
      responsive: true, // Make the chart responsive
      plugins: {
        legend: {
          position: 'top', // Position of the legend
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw; // Custom tooltip format
            },
          },
        },
      },
    };

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
      setData(data); // Save the data into state
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
      setData(rows); // Save the data into state
    };
    reader.readAsBinaryString(file); // Read file as binary for .xlsx files
  };
  function PopupFunction() {
    var popup = document.getElementById("myPopup");
    popup.textContent = `Project Added Successfully`;
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
  const add_new_project = async (e)=>{
    props.setLoad(true);
    e.preventDefault();
    let project = document.getElementById("project_name").value;
    let customer = document.getElementById("customer_name").value;
    let employee = document.getElementById("employee_name").value;
    let lead = document.getElementById("lead_name").value;
    const data=[{"project_name":project,"customer_name":customer,"employee_name":employee,"lead_name":lead}];
    console.log("DATA",data);
    const response = await fetch('https://my-repo-chi-coral.vercel.app/inserttoproject', {
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
    document.getElementById('project_name').value = '';
    document.getElementById('customer_name').value = '';
    document.getElementById('employee_name').value = '-- Select --';
    document.getElementById('lead_name').value = '-- Select --';
    PopupFunction();
    props.setLoad(false);
  }
  const upload_new_project = async ()=>{
    props.setLoad(true);
    const data=[]
    for (let proj of exceldata){
      if (proj.length > 1) {
        data.push({
          "project_name": proj[0],
          "customer_name": proj[1],
          "employee_name": proj[2],
          "lead_name": proj[3]
      });
      }
     }
    console.log("DATA",data);
    const response = await fetch('https://my-repo-chi-coral.vercel.app/inserttoproject', {
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
    PopupFunction();
    props.setLoad(false);
  }
  
  function enableAddProjectPopup() {
    if(addNewProject===false){
      setAddNewProject(true);
    }
    else{
      setAddNewProject(false);
    }
  }
  function changeAddPojectStatus(btn_text) {
    const pages = document.querySelectorAll('#add_project_popup_btn');
    pages.forEach(page => {
        page.classList.remove('selected');
        if(page.innerText ===btn_text){
            page.classList.add('selected');
        }
    });
    if(btn_text=="Add"){
      setAddPRJ(true);
    }
    else{
      setAddPRJ(false);
    }
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
      const l=['-- Select --'];
      for (let emp of result2["data"]){
        if (!l.includes(emp["lead_name"])) {
            l.push(emp["lead_name"]);  // Add the string to the array if it's not already there
        }
        emps.push(emp["employee_name"]);
       }

       const response3 = await fetch('https://my-repo-chi-coral.vercel.app/getwsr');
      if (!response3.ok) {
        throw new Error('Network response was not ok');
      }
      const result3 = await response3.json();
      let red=0;
      let green=0;
      let amber=0; 
      for (let wsr of result3["data"]){
        if(wsr['rag_status']==="Red"){
          red=red+1;
        }
        else if(wsr['rag_status']==="Amber"){
          amber=amber+1;
        }
        else{
          green=green+1;
        }
      }
      document.getElementById('rCount').textContent = red;
      document.getElementById('aCount').textContent = amber;
      document.getElementById('gCount').textContent = green;
      const data = {
        labels: ['Red', 'Green', 'Amber'], // Labels for the segments
        datasets: [
          {
            data: [red, green, amber], // Values corresponding to each label
            backgroundColor: ['Red', 'Green', 'Yellow'], // Colors for the segments
            hoverBackgroundColor: ['#FF2C00', '#0077FF', '#FFCC00'], // Hover colors
          },
        ],
      };
      setPieChartData(data);
      setRAGTable(result3["data"])
       setEmployees(emps);
       setLeads(l);
       props.setLoad(false);
    };

    fetchData(); // Call the function to fetch data
  }, []);


    return(
    <>
<div id="page_header">
  <h1><span>Projects</span>
    {props.auth&&<button id="add_projects_btn" onClick={enableAddProjectPopup}>+Add</button>}
  </h1>
</div>

<div class="gap-4 p-2">
    <div id="sub_page_box">
      <div id="sub_page_headers">
        <h6>Projects RAG Status</h6>
      </div>
      <div class="p-2">
        The Quality Engineering monitors the weekly health check for the
        projects worked on and uses this dashboard for monitoring the high-alert
        projects for solutionizing a better approach to meet the deadlines.
      </div>
  </div>
</div>
<div class="flex flex-row gap-4 p-2">
    <div id="sub_page_box" class="w-1/2">
      <div id="sub_page_headers">
        <h6>Governance - Council Updates</h6>
      </div>
      <div class="p-2">
        <li>Projects in Red = <span id="rCount">0</span></li>
        <li>Projects in Amber = <span id="aCount">0</span></li>
        <li>Projects in Green = <span id="gCount">0</span></li>
      </div>
    </div>
    <div id="sub_page_box" class="w-1/2">
      <div id="sub_page_headers">
        <h6>Project Overall Status</h6>
      </div>
      <div class="p-2" style={{marginLeft:"140px",width:"200px",height:"200px"}}>
        {pieChartData&&<Pie width={100} height={100} data={pieChartData} options={pieChartDataOptions} />}
      </div>
    </div>
  </div>

<div id="sub_page_box" class="flex flex-col gap-4 p-2 m-2">
  <div class="flex justify-between items-center">
    <h3 class="text-lg font-bold text-black-400">RAG Status</h3>
    <div class="flex gap-2">
      <select id="rag-status" name="rag_status" class="select_Dropdown_Input">
        <option value="choose">Choose a RAG Status</option>
        <option value="all">All</option>
        <option value="R">Red</option>
        <option value="A">Amber</option>
        <option value="G">Green</option>
      </select>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        class="text_Input"
      />
    </div>
  </div>
  <div>
    <div class="flex justify-between bg-orange-400 p-2 rounded-top">
      <div class="w-1/4 text-left font-bold">Project</div>
      <div class="w-1/4 text-left font-bold">RAG Status</div>
      <div class="w-1/4 text-left font-bold">Impediments</div>
      <div class="w-1/4 text-left font-bold">Resource</div>
    </div>
    <div id="results" class="w-full">
      {!ragTable&&<p class="text-center">
        Please select a RAG status to display the tabular report.
      </p>}
      
        {ragTable.map((rag, index) => (
          <div class="flex justify-between bg-white p-2 border border-orange-300">
                            <div class="w-1/4 text-left break-words">{rag["project_name"]}</div>
                            <div class="w-1/4 text-left break-words">{rag["rag_status"]}</div>
                            <div class="w-1/4 text-left break-words">{rag["impediments"]}</div>
                            <div class="w-1/4 text-left break-words">{rag["resource_name"]}</div>
                            </div>
                             ))}  
      
    </div>
    <div id="pagination-controls" class="flex justify-center mt-4">
      <button
        id="prev-page"
        class="p-2 border border-gray-300 rounded mx-1"
        disabled
      >
        Prev
      </button>
      <button
        id="next-page"
        class="p-2 border border-gray-300 rounded mx-1"
        disabled
      >
        Next
      </button>
    </div>
    <div
      id="edit-project-modal"
      class="hidden fixed z-10 inset-0 overflow-y-auto"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Edit Project
                </h3>
                <div class="mt-2">
                  <form id="edit-project-form" class="space-y-4">
                    <input
                      type="hidden"
                      id="edit-project-id"
                      name="project_id"
                    />
                    <div>
                      <label
                        for="edit-project-name"
                        class="block text-sm font-medium text-gray-700"
                        >Project Name</label
                      >
                      <input
                        type="text"
                        id="edit-project-name"
                        name="project_name"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="edit-rag-status"
                        class="block text-sm font-medium text-gray-700"
                        >RAG Status</label
                      >
                      <select
                        id="edit-rag-status"
                        name="rag_status"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="R">Red</option>
                        <option value="A">Amber</option>
                        <option value="G">Green</option>
                      </select>
                    </div>
                    <div>
                      <label
                        for="edit-impediments"
                        class="block text-sm font-medium text-gray-700"
                        >Impediments</label
                      >
                      <input
                        type="text"
                        id="edit-impediments"
                        name="impediments"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="edit-resource"
                        class="block text-sm font-medium text-gray-700"
                        >Resource</label
                      >
                      <input
                        type="text"
                        id="edit-resource"
                        name="resource"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      class="mt-2 p-2 bg-orange-700 text-white rounded"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                id="close-modal"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{addNewProject&&
  <div id="project_popup">
  <div id='add_project_popup' style={{marginLeft:'25px',marginTop:'50px'}}>
  <button id='add_project_popup_btn' class="selected ml-3" onClick={()=>{changeAddPojectStatus("Add")}}>Add</button>
  <button id='add_project_popup_btn' onClick={()=>{changeAddPojectStatus("Upload")}}>Upload</button>
  <button onClick={enableAddProjectPopup} style={{color:'gray',marginLeft:'850px'}}>x</button>
<div id="sub_page_box" style={{height:'200px'}}>
  {addPRJ&&
      <form
        id="add-project-form"
        onSubmit={(e)=>{add_new_project(e)}}
      >
        <div class="gap-4">
        <div class="flex flex-row">
        <div class='flex justify-between w-1/2'>
          <label style={{width:"150px"}} id="col_label" class='flex justify-between'><span class="text-start">Project Name</span><span class="text-start">:</span></label>
          <input
            type="text"
            id="project_name"
            placeholder="Project Name"
            class="text_Input"
            required
          />
        </div>
        <div class='flex justify-between w-1/2 ml-2'>
          <label style={{width:"150px"}} id="col_label" class='flex justify-between'><span class="text-start">Customer Name</span><span class="text-start">:</span></label>
          <input
            type="text"
            id="customer_name"
            placeholder="Customer Name"
            class="text_Input"
            required
          />
        </div>
        </div>
        <div class="flex flex-row">
        <div class='flex justify-between w-1/2'>
          <label style={{width:"150px"}} id="col_label" class='flex justify-between'><span class="text-start">Employee Name</span><span class="text-start">:</span></label>
          <select class="select_Dropdown_Input" name="ResourceName" id="employee_name" style={{width:"350px"}}>
                      {employees.map((resouce, index) => (
            <option key={index} value={resouce}>
              {resouce}
            </option>
          ))}
          </select>
        </div>
        <div class='flex justify-between w-1/2  ml-2'>
          <label style={{width:"150px"}} id="col_label" class='flex justify-between'><span class="text-start">Lead Name</span><span class="text-start">:</span></label>
          <select class="select_Dropdown_Input" name="PracticeLead" id="lead_name" style={{width:"350px"}}>
                      {leads.map((lead, index) => (
            <option key={index} value={lead}>
              {lead}
            </option>
          ))}
                    </select>
        </div>
        </div>
        </div>
        <button type="submit" class="default_Button">Add</button>
      </form>}
      {!addPRJ&&<div class="mt-4 p-2">
        <input type="file" id="upload-file" accept=".csv, .xlsx" onChange={handleFileChange}/>
        <button id="upload-button" class="default_Button d-block" onClick={upload_new_project}>
          Upload
        </button>
      </div>}
    </div>
    </div>
    </div>}
    <div id="loading_popup" class='hidden'>
    <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </div>
    </>
    );
};

export default Projects;