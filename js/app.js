let sortDate = [];
let sortByCheck = 0;
const loadAllData = async (dataLimit) => {
  spinner(true);
  try {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    sortDate = data.data.tools;
    displayAllData(data.data.tools, dataLimit);
    // sortBtn(data.data.tools);
  } catch (err) {
    console.log(err);
  }
};

const sortByDate = (dataLimit) => {
  let date = sortDate.map((allDate) => {
    return allDate;
  });
  date.sort((a, b) => {
    let dateA = new Date(a.published_in);
    let dateB = new Date(b.published_in);
    return dateA - dateB;
  });
  console.log(date);

  displayAllData(date, dataLimit);
};

// display all data
const displayAllData = (showData, dataLimit) => {
  console.log(showData);
  const showDataContainer = document.getElementById("showDataContainer");
  showDataContainer.innerHTML = "";

  // document
  //   .getElementById("sortDataBtn")
  //   .addEventListener("click", function (showData) {
  //     console.log(showData);
  //   });

  // display 6 data
  const showMoreBtn = document.getElementById("showMoreBtn");
  if (dataLimit && showData.length > 6) {
    showData = showData.slice(0, 6);
    showMoreBtn.classList.remove("hidden");
  } else {
    showMoreBtn.classList.add("hidden");
  }

  showData.forEach((data) => {
    const { features, id, name, published_in, description, image } = data;
    showDataContainer.innerHTML += `
    <div class="card card-compact bg-base-100 shadow-xl border">
    <figure class="pt-4 px-4"><img class="rounded-lg object-cover"
            src="${
              image ? image : "https://picsum.photos/500/300?random=1"
            }" alt="${name}" />
    </figure>
    <div class="card-body">
        <h2 class="card-title font-bold text-2xl">Features</h2>
        <ol class="text-lg font-semibold text-[#585858]">
            <li>1. ${features[0]}</li>
            <li>2. ${features[1]}</li>
            <li>3. ${features[2]}</li>
        </ol>
        <hr>
        <div class="card-actions justify-between items-center mt-3">
            <div class="space-y-1">
                <h2 class="text-2xl font-semibold">${name}</h2>
                <!-- calender -->
                <div class="flex items-center gap-2 text-[#585858]">
                    <i class="far fa-calendar-alt text-lg"></i>
                    <p class="font-semibold">${published_in}</p>
                </div>
            </div>
            <div onclick="loadSingleData('${id}')">
            <a onclick="my_modal_4.showModal()" href="#"
            class="w-11 h-11 bg-[#ffebeb] rounded-full flex items-center justify-center"><i
                class="fas fa-arrow-right text-lg text-[#EB5757]"></i></a>
            </div>
        </div>
    </div>
</div>
    `;
  });
  spinner(false);
};

//Show Single Data
const loadSingleData = (singleId) => {
  singleId;
  console.log("khalid");
  const url = `https://openapi.programming-hero.com/api/ai/tool/${singleId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleData(data.data));
};

const showSingleData = (singleData) => {
  console.log(singleData);
  const modalContainer = document.getElementById("my_modal_4");
  const {
    accuracy,
    description,
    features,
    image_link,
    pricing,
    integrations,
    input_output_examples,
    tool_name,
  } = singleData;

  modalContainer.innerHTML = `
  <div class="modal-box w-11/12 max-w-5xl lg:p-10 ">
  <div class="modal-action">
      <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div class="card p-4 space-y-7 border border-rose-400 card-compact bg-[#ffe7e7] shadow-xl">
        <h2 class="font-bold md:text-2xl">${description}
        </h2>
        <div class="flex flex-wrap lg:flex-nowrap justify-between gap-2">
            <div class="bg-white p-3 text-center  rounded-lg">
                <p class="text-[#03A30A] font-bold">${
                  pricing ? pricing[0].price : "N/A"
                }
                    ${pricing ? pricing[0].plan : "N/A"}</p>
            </div>
            <div class="bg-white p-3 text-center rounded-lg">
                <p class="text-[#F28927] font-bold">${
                  pricing ? pricing[1].price : "N/A"
                }
                    ${pricing ? pricing[2].plan : "N/A"}</p>
            </div>
            <div class="bg-white p-3 text-center rounded-lg">
                <p class="text-[#EB5757] font-bold">${
                  pricing ? pricing[2].plan : "N/A"
                } ${pricing ? pricing[2].price : "N/A"}
                </p>
            </div>
        </div>
        <div class="flex justify-between">
            <div>
                <h3 class="font-bold md:text-2xl">Features</h3>
                <ol class="list-disc font-semibold ml-5 mt-3">
                  <li>${features[1].feature_name}</li>
                  <li>${features[2].feature_name}</li>
                  <li>${features[3].feature_name}</li>
                </ol>
            </div>
            <div>
                <h3 class="font-bold md:text-2xl">Integrations</h3>
                <div>
                  ${
                    integrations
                      ? `
                  <ol class="list-disc font-semibold ml-5 mt-3">
                    <li>${integrations[0]}</li>
                    <li>${integrations[1]}</li>
                    <li>${integrations[3]}</li>
                  </ol>
                  `
                      : "No Data Found"
                  }
                </div>
            </div>
        </div>
        </div>
      <div class="card p-4 card-compact bg-base-100 shadow-xl  border">
          <figure class="relative">
              <img class="rounded-lg"
                  src="${image_link[0]}"
                  alt="${tool_name}" />
              <div>
                ${
                  accuracy.score
                    ? `<p class="text-white font-semibold w-32 py-2 text-center rounded-xl absolute top-2 right-2 bg-[#EB5757]">
                ${accuracy.score} accuracy
              </p>`
                    : ""
                }
              </div>
          </figure>
          <div class="text-center mx-auto mt-3">
              <h2 class="font-semibold lg:font-bold text-2xl">${
                input_output_examples
                  ? input_output_examples[1].input
                  : "No! Not Yet! Take a break!!!"
              }</h2>
              <p class="mt-3">${
                input_output_examples
                  ? input_output_examples[1].output
                  : "No! Not Yet! Take a break!!!"
              }</p>
          </div>
      </div>
  </div>
</div>
  `;
};

// const processData = (dataLimit) => {
//   loadAllData(dataLimit);
// };

//load Spinner
const spinner = (isSpinner) => {
  const showSpinner = document.getElementById("spinner");
  if (isSpinner) {
    showSpinner.classList.remove("hidden");
  } else {
    showSpinner.classList.add("hidden");
  }
};

// short by date
const sortBtn = () => {
  sortByCheck = 1;
  sortByDate(6);
};

// show more data display
const showMore = () => {
  console.log(sortByCheck);
  if (sortByCheck === 1) {
    sortByDate();
    sortByCheck = 0;
  } else {
    loadAllData();
  }
  console.log(sortByCheck);
};

loadAllData(6);
