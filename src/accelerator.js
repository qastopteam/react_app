import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { AiOutlineDownload } from "react-icons/ai";

const Accelerator = (props) => {
  const [data, setData] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [addNewAccelerator, setAddNewAccelerator] = useState(false);
  const [SPOC, setSPOC] = useState(['--Select--']);
  const Catagory=['--Select--','Data comparator','excel comparator','web comparator'];
    const itemsPerPage = 5; // Number of items per page
    let currentPage = 1;

    const handleExcelDownload = () => {
      // Get the table element
      console.log("ExcelDATA",filteredData);
      const table = document.getElementById('tableToExport');
      
      // Convert the table to a workbook
      const wb = XLSX.utils.table_to_book(table, { sheet: 'Accelerators' });
  
      // Write the workbook and trigger download
      XLSX.writeFile(wb, 'Accelerators_Data.xlsx');
    };
    function enableAddAcceleratorPopup() {
      if(addNewAccelerator===false){
        setAddNewAccelerator(true);
      }
      else{
        setAddNewAccelerator(false);
      }
    }
    function AlertFunc() {
      document.getElementById('alert').textContent = "Please Fill the Mandatory Fields(*)";
      setTimeout(function () {
          document.getElementById('alert').textContent = "";
      }, 5000);
      //$('#GFG').text("Div hides after 1 second.");
  }
    const renderResults = (filteredLinks) => {
      let results = ``;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = filteredLinks.slice(start, end);
  
      paginatedItems.forEach(
        (link) =>
          (results += `<div class="flex justify-between bg-white p-2 border-gray-300 border-bottom border-left border-right">
        <div class="w-1/4 text-left">${link.Category}</div>
        <div class="w-1/4 text-left">${link.Accelerator}</div>
        <div class="w-1/4 text-left">${link.SPOC}</div>
        <div class="w-1/4 text-left">${link.Direct}</div>
      </div>`),
      );
      document.getElementById("results").innerHTML =
        paginatedItems.length > 0
          ? results
          : `<div class="text-center">No Data Found</div>`;
      renderPageNumbers(filteredLinks.length);
    };
  
    const getFilteredLinks = () => {
      const selectedStatus = document.getElementById("accelerators").value;
      const searchTerm = document.getElementById("search").value.toLowerCase();
      let filteredLinks = [];
  
      if (selectedStatus === "All") {
        filteredLinks = Object.values(data).flat();
      } else {
        filteredLinks = data[selectedStatus] ? data[selectedStatus] : [];
      }
  
      if (searchTerm) {
        filteredLinks = filteredLinks.filter(
          (link) =>
            link.Accelerator.toLowerCase().includes(searchTerm) ||
            link.Direct.toLowerCase().includes(searchTerm) ||
            link.SPOC.toLowerCase().includes(searchTerm) ||
            link.Category.toLowerCase().includes(searchTerm),
        );
      }

      setFilteredData(filteredLinks)
      return filteredLinks;
    };
  
    const renderPageNumbers = (totalItems) => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      let pageNumbers = "";
  
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers += `<button class="p-2 border border-gray-300 rounded mx-1 ${i === currentPage ? "bg-gray-300" : ""}" onClick={goToPage(${i})}>${i}</button>`;
      }
  
      document.getElementById("pageNumbers").innerHTML = pageNumbers;
    };
  
    const goToPage = (pageNumber) => {
      currentPage = pageNumber;
      renderResults(getFilteredLinks());
    };
    function PopupFunction(divacker) {
      var popup = document.getElementById("myPopup");
      popup.textContent = `${divacker}`;
        popup.classList.add('custom-background');
        const chatbot = document.getElementById("loading_popup");
          chatbot.classList.toggle("hidden");
      //popup.classList.toggle("show");
      setTimeout(function () {
            popup.textContent = "";
          popup.classList.remove('custom-background');
          chatbot.classList.toggle("hidden");
        }, 5000);
    }
    async function sendInput() {
      props.setLoad(true);
      let accelerator_name =document.getElementById("accelerator_name").value;
      let category =document.getElementById("Category").value;
      let spoc =document.getElementById("spoc").value;
      let reference =document.getElementById("reference").value;
      let flag=true;
      if(accelerator_name=="-- Select --"){
       flag=false;
      }
      if(category=="-- Select --"){
       flag=false;
      }
      if(spoc=="-- Select --"){
       flag=false;
      }
      if(flag){
       fetch("https://my-repo-chi-coral.vercel.app/inserttoacc", {
       method: "POST",
       body: JSON.stringify([{
       "accelerator":accelerator_name,
       "category":category,
       "spoc":spoc,
       "link":reference,
       "employee_no":804727
       }]),
       headers: {
        "Content-type": "application/json; charset=UTF-8"
       }
       })
       .then((response) => response.json())
       .then((json) => console.log(json));

       PopupFunction("New Accelerator Added Successfully");
       setAddNewAccelerator(false);
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
          /*const response = await fetch('http://127.0.0.1:5000//accs');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();*/
          const response2 = await fetch('https://my-repo-chi-coral.vercel.app/getacces');
          if (!response2.ok) {
            throw new Error('Network response was not ok');
          }
          const result2 = await response2.json();
          //console.log("RESULT",result);
          console.log("RESULT2",result2["data"]);
          const Comp1=[];
          const Comp2=[];
          const Comp3=[];
          const spoc=['--Select--'];
          result2["data"].forEach((item) => {
            spoc.push(item["spoc"]);
            if(item["category"]==="Data comparator"){
              Comp1.push({
                Accelerator: item["accelerator"],
                Direct: item["link"],
                SPOC: item["spoc"],
                EmpID:item["employee_no"],
                Category: item["category"]
              })
            }
            if(item["category"]==="excel comparator"){
              Comp2.push({
                Accelerator: item["accelerator"],
                Direct: item["link"],
                SPOC: item["spoc"],
                EmpID:item["employee_no"],
                Category: item["category"]
              })
            }
            if(item["category"]==="web comparator"){
              Comp3.push({
                Accelerator: item["accelerator"],
                Direct: item["link"],
                SPOC: item["spoc"],
                EmpID:item["employee_no"],
                Category: item["category"]
              })
            }
          });
          const DBData={Comparator1:Comp1,Comparator2:Comp2,Comparator3:Comp3};
          console.log("DBData",DBData)
          setData(DBData); // Store the fetched data in state
          setSPOC(spoc);
          renderResults(Object.values(DBData).flat());
          props.setLoad(false);
        };
    
        fetchData(); // Call the function to fetch data
      }, []);


    return (  
        <>
        <div id="page_header">
  <h1><span>Accelerators</span>
    {props.auth&&<button id="add_projects_btn" onClick={enableAddAcceleratorPopup}>+Add</button>}
  </h1>
</div>
<div>
  <div class="flex gap-4 p-2">
    <div class="flex flex-col gap-4">
      <div id="sub_page_box">
        <div id="sub_page_headers">
          <h5>Quality Practice</h5>
        </div>
        <div>
          The Quality Practice team intends to create test accelerators and POC
          (proof of concepts) on various testing models using cutting edge
          technologies on demand. The accelerators built are for Practice and
          for the clients itself.
        </div>
      </div>
      <div id="sub_page_box">
        <div id="sub_page_headers">
          <h5>Accelerators from Practice</h5>
        </div>
        <div>
          The Quality Practice team have the following accelerators for quick
          demo:
        </div>
      </div>
    </div>
    <div class='d-flex align-items-stretch'>
      <div id="sub_page_box">
        <div id="sub_page_headers">
          <h5>Practice - Council Updates</h5>
        </div>
        <div>
          <p>
            The practice hits the head account to 100 and marks a milestone.
          </p>
          <p>
            The Full-Stack QE internal training for Batch-1 is scheduled for
            Apr 2024
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="p-2">
   <div id="sub_page_box">
    <div class="flex justify-between items-center p-1">
      <h5 class="text-lg font-bold text-black-400">Accelerators</h5>
      <div class="flex gap-2">
        <select
          id="accelerators"
          name="accelerators"
          class="select_Dropdown_Input"
          onChange={()=>{
            currentPage = 1;
            renderResults(getFilteredLinks());
          }}
        >
          <option value="All">All</option>
          <option value="Comparator1">Data Comparator</option>
          <option value="Comparator2">Excel Comparator</option>
          <option value="Comparator3">web Comparator</option>
        </select>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search..."
          class="text_Input"
          onInput={()=>{
            currentPage = 1;
            renderResults(getFilteredLinks());
          }}
        />
    <button class="hover-btn" style={{marginLeft:'10px'}}  onClick={handleExcelDownload}>
      <AiOutlineDownload style={{width:'20px',height:'20px'}}/>
      <span class="hover-text">Download</span>
    </button>
      </div>
    </div>
    
      <div class="flex justify-between bg-orange-300 p-2 rounded-top">
        <div class="w-1/4 text-left font-bold">Category</div>
        <div class="w-1/4 text-left font-bold">Accelerator name</div>
        <div class="w-1/4 text-left font-bold">SPOC</div>
        <div class="w-1/4 text-left font-bold">References</div>
      </div>
      <div id="results" class="w-full max-h-[50vh] overflow-y-auto fs-0.75">
      </div> 
      <div id="pagination" class="flex justify-center mt-4">
        <button id="prev" onClick={()=>{if (currentPage > 1) {
                                            currentPage--;
                                        renderResults(getFilteredLinks());
                                         }}} 
        class="p-2 border border-gray-300 rounded mx-1">
          Prev
        </button>
        <div id="pageNumbers" class="flex"></div>
        <button id="next" onClick={() => {
                                            const filteredLinks = getFilteredLinks();
                                            if (currentPage < Math.ceil(filteredLinks.length / itemsPerPage)) {
                                            currentPage++;
                                            renderResults(filteredLinks);}
                                        }}
        class="p-2 border border-gray-300 rounded mx-1">
          Next
        </button>
      </div>
    </div>
  </div>
</div>
{addNewAccelerator&&
  <div id="project_popup">
  <div id='add_project_popup' style={{marginLeft:'250px',marginTop:'50px',padding:"30px"}}>
    <div>
      <label id="add_table_label" style={{width:'300px',fontWeight:"bold"}}>Add New Resource</label>
      <button onClick={()=>{setAddNewAccelerator(false)}} style={{color:'gray',marginLeft:'220px'}}>x</button>
    </div>
    <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Accelerator*</span><span class="text-start">:</span></label>
              <span>
                  <input class="text_Input" type="text" id="accelerator_name" placeholder="Accelerator Name" />
              </span>
    </div>
    <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Category*</span><span class="text-start">:</span></label>
              <span id="skl">
                  <select class="select_Dropdown_Input" name="Category" id="Category" style={{width:'350px'}}>
                    {Catagory.map((ct, index) => (
                    <option key={index} value={ct}>
                      {ct}
                    </option>
                  ))}
                  </select>
              </span>
    </div>
    <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">SPOC*</span><span class="text-start">:</span></label>
              <span id="skl">
                  <select class="select_Dropdown_Input" name="spoc" id="spoc" style={{width:'350px'}}>
                    {SPOC.map((spoc, index) => (
                    <option key={index} value={spoc}>
                      {spoc}
                    </option>
                  ))}
                  </select>
              </span>
    </div>
    <div class='filters'>
              <label id="col_label" class='flex justify-between'><span class="text-start">Reference*</span><span class="text-start">:</span></label>
              <span>
                  <textarea class="text_Input" type="text" id="reference" placeholder="Reference" />
              </span>
    </div>
    <button class="default_Button" onClick={sendInput}>
            Submit
    </button>
    <label id="alert"></label>
  </div>
  </div>
  }
  <div id="loading_popup" class='hidden'>
  <div id="popup">
        <span class="popuptext" id="myPopup"></span>
    </div>
    </div>
    {filteredData&&<table id="tableToExport" className='hidden'>
        <thead>
          <tr>
            <th>Category</th>
            <th>Accelerator Name</th>
            <th>SPOC</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.Category}</td>
              <td>{row.Accelerator}</td>
              <td>{row.SPOC}</td>
              <td>{row.Direct}</td>
            </tr>
          ))}
        </tbody>
      </table>}
        </>
    );
};

export default Accelerator;