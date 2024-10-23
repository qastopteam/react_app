import React, { useState, useEffect } from 'react';

const Accelerator = () => {

    const itemsPerPage = 5; // Number of items per page
    let currentPage = 1;
    const data = {
      Comparator1: [
        {
          Category: "Data comparator",
          Accelerator: "Tosca Custom Excel Report Generator",
          SPOC: "Jeena",
          Direct: "Link1",
        },
        {
          Category: "Data comparator",
          Accelerator: "Accelerator For Client Mars",
          SPOC: "Jeena",
          Direct: "Link4",
        },
        {
          Category: "Data comparator",
          Accelerator: "Accelerator For Client T-Mobile",
          SPOC: "Jennifer",
          Direct: "Link8",
        },
      ],
      Comparator2: [
        {
          Category: "excel comparator",
          Accelerator: "Test case Generator",
          SPOC: "Thazhuva",
          Direct: "Link2",
        },
        {
          Category: "excel comparator",
          Accelerator: "Accelerator For Client Prologis",
          SPOC: "Thazhuva",
          Direct: "Link6",
        },
        {
          Category: "excel comparator",
          Accelerator: "Accelerator For Client Carrier",
          SPOC: "Jeena",
          Direct: "Link9",
        },
      ],
      Comparator3: [
        {
          Category: "web comparator",
          Accelerator: "Icedq Test Accelerator",
          SPOC: "Sivanash",
          Direct: "Link3",
        },
        {
          Category: "web comparator",
          Accelerator: "JAPAN SF LANDING LAYER",
          SPOC: "Jennifer",
          Direct: "Link4",
        },
        {
          Category: "web comparator",
          Accelerator: "Accelerator For Client Merck",
          SPOC: "Sivanash",
          Direct: "Link7",
        },
        {
          Category: "web comparator",
          Accelerator: "Acc 10",
          SPOC: "",
          Direct: "Link10",
        },
      ],
    };
  
    const renderResults = (filteredLinks) => {
      let results = ``;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = filteredLinks.slice(start, end);
  
      paginatedItems.forEach(
        (link) =>
          (results += `<div class="flex justify-between bg-white p-2 rounded-lg mt-2 border border-gray-300">
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
        renderResults(getFilteredLinks());
      },[]);

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
          <h3>Quality Practice</h3>
        </div>
        <div class="p-2">
          The Quality Practice team intends to create test accelerators and POC
          (proof of concepts) on various testing models using cutting edge
          technologies on demand. The accelerators built are for Practice and
          for the clients itself.
        </div>
      </div>
      <div id="sub_page_box">
        <div id="sub_page_headers">
          <h3>Accelerators from Practice</h3>
        </div>
        <div class="p-2">
          The Quality Practice team have the following accelerators for quick
          demo:
        </div>
      </div>
    </div>
    <div>
      <div id="sub_page_box">
        <div id="sub_page_headers">
          <h3>Practice - Council Updates</h3>
        </div>
        <div class="p-2">
          <p>
            - The practice hits the head account to 100 and marks a milestone.
          </p>
          <p>
            - The Full-Stack QE internal training for Batch-1 is scheduled for
            Apr 2024
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="p-2">
    <div class="bg-gray-200 p-1 rounded-lg flex justify-between items-center">
      <h3 class="text-lg font-bold text-black-400">Accelerators</h3>
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
    <div class="border border-solid border-slate-400 p-1">
      <div class="flex justify-between bg-gray-400 p-2 rounded-lg">
        <div class="w-1/4 text-left font-bold">Category</div>
        <div class="w-1/4 text-left font-bold">Accelerator name</div>
        <div class="w-1/4 text-left font-bold">SPOC</div>
        <div class="w-1/4 text-left font-bold">References</div>
      </div>
      <div id="results" class="mt-1 w-full max-h-[50vh] overflow-y-auto">
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