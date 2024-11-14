import React from 'react';

const Overview = () => {
  return (
    <>
    <div
  id="page_header"
  class="w-full text-black text-left border-b-2 border-gray-700"
>
  <h1 class="text-2xl font-bold inline-block">Overview</h1>
</div>

<div class="flex gap-4 p-2">
  <div class="flex flex-row gap-4">
    <div id="sub_page_box" class="gap-4 w-1/3">
      <div id="sub_page_headers">
        <h5>Quality Engineering</h5>
      </div>
      <div id="sub_page_content">
        We as a team deliver quality test and certify your product bug free by
        running multi-level, multi-browser and multi-order tests through
        accelerators and automated tools and cutting edge technologies.
      </div>
    </div>
    <div id="sub_page_box" class="gap-4 w-1/3">
      <div id="sub_page_headers">
        <h5>Through the Director's word</h5>
      </div>
      <div id="sub_page_content">
        Quality Engineering has been established as a practice in Tiger from the
        year 2020 and is evolving since then from a 4 member team to 100 members
        momentarily over the years. The team have strived through excellence by
        conquering development only projects employed with Tiger from massive
        and multi-national clients through their key accelerators and testing
        capability demos.
      </div>
    </div>
    <div id="sub_page_box" class="gap-4 w-1/3">
      <div id="sub_page_headers">
        <h5>Weekly-Highlights</h5>
      </div>
      <div id="sub_page_content">
        <p>
          The practice hits the head account to 100 and marks a milestone.
        </p>
        <p>
          The Full-Stack QE internal training for Batch-1 is scheduled for Apr
          2024
        </p>
      </div>
    </div>
  </div>
</div>
</>
  );
};

export default Overview;