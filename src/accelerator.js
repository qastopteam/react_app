import React, { useState, useEffect } from 'react';

const Accelerator = () => {
  const [data, setData] = useState("");
    const itemsPerPage = 5; // Number of items per page
    let currentPage = 1;
  
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
    


      useEffect(() => {
        const fetchData = async () => {

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
          result2["data"].forEach((item) => {
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
          renderResults(Object.values(DBData).flat());
        };
    
        fetchData(); // Call the function to fetch data
      }, []);


    return (  
        <>
        <div id="page_header">
  <h1>Accelerators</h1>
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
      </div>
    </div>
    
      <div class="flex justify-between bg-gray-400 p-2 rounded-top">
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
        </>
    );
};

export default Accelerator;