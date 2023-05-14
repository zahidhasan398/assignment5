// fetch all data from api
const fetchAllData=()=>{
    spinnerLoading(false);
  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
  .then(res=>res.json())
  .then(data=>showFetchAllData(data.data.tools));
}
// show on display all fetch data.
const showFetchAllData=(data,isAlldata=true)=>{
    console.log(data);
    const dataContainer=document.querySelector("#main-data-container");
     dataContainer.innerHTML="";
     if(isAlldata===true){
       data=data.slice(0,6);
     }
    data.forEach(element => {
        const div=document.createElement("div");
        div.innerHTML=`<div class="card w-full h-full bg-base-100 shadow-xl">
        <figure><img src="${element.image?element.image:"no found"}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">features</h2>
          <ol type="1" id="feature-list">
          <li>${element.features[0]?'1.'+element.features[0]:""}</li>
          <li>${element.features[1]? '2.'+element.features[1]:""}</li>
          <li>${element.features[2]? '3.'+element.features[2]:""}</li>
          <li>${element.features[3]? '4.'+element.features[3]:""}</li>
          </ol>
          <div>
          <h3 class="font-semibold text-xl">${element.name}</h3>
          <p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
          </div>
          <div class="card-actions justify-end">
          <label for="my-modal" onclick="singleDataDetailsFetch('${element.id}')" class="text-blue-700 text-3xl hover:text-slate-600 hover:cursor-pointer"><i class="fa-solid fa-right-long"></i></label>
          </div>
        </div>
      </div>`
      dataContainer.appendChild(div);
    });
    spinnerLoading(true);
}
// fetch single data
const singleDataDetailsFetch=id=>{
    const URL=`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
    .then(res=>res.json())
    .then(data=>showSingleDataDetails(data));
}
// display single data
const showSingleDataDetails=data=>{
    console.log(data);
    const description=document.querySelector("#description");
    description.innerText=data.data.description;
    const basic=document.querySelector("#basic");
    const pro=document.querySelector("#pro");
    const contact=document.querySelector("#contact");
    basic.innerHTML=`${data.data.pricing[0].price ?data.data.pricing[0].price:"Free of Cost/Basic"} <br> 
    ${data.data.pricing[0].plan?data.data.pricing[0].plan:""}`;
    pro.innerHTML=`${data.data.pricing[1].price ?data.data.pricing[1].price:"Free Of Cost/Pro"} <br> 
    ${data.data.pricing[1].plan ?data.data.pricing[1].plan:""}`;
    contact.innerHTML=`${data.data.pricing[2].price?data.data.pricing[2].price:"Free of Cost /Enterprise"} <br> 
    ${data.data.pricing[2].plan}`;
    const firstFeature=document.querySelector("#first-feature");
    const secondFeature=document.querySelector("#second-feature");
    const thirdFeature=document.querySelector("#third-feature");
    firstFeature.innerHTML=`1.${data.data.features[1].feature_name}`;
    secondFeature.innerHTML=`2.${data.data.features[2].feature_name}`;
    thirdFeature.innerHTML=`3.${data.data.features[3].feature_name}`;
    const firstIntegration=document.querySelector("#first-integration");
    const secondIntegration=document.querySelector("#second-integration");
    const thirdIntegration=document.querySelector("#third-integration");
    firstIntegration.innerHTML=`${data.data.integrations[0]?'1.'+data.data.integrations[0]:"no data found"}`;
    secondIntegration.innerHTML=`${data.data.integrations[1]?'2.'+data.data.integrations[1]:""}`;
    thirdIntegration.innerHTML=`${data.data.integrations[2]?'3.'+data.data.integrations[2]:""}`;
    const modalImage=document.querySelector("#modal-image");
    modalImage.src=data.data.image_link[0]?data.data.image_link[0]:"not found";
    const modalTitle=document.querySelector("#modal-card-ques");
    const modalAns=document.querySelector("#modal-card-ans");
    modalTitle.innerHTML=data.data.input_output_examples[0].input?data.data.input_output_examples[0].input:"Can you give any example";
    modalAns.innerHTML=data.data.input_output_examples[0].output?data.data.input_output_examples[0].output:"No! Not Yet! Take a break!!!";
    const accuracy=document.querySelector("#accuracy");
    if(data.data.accuracy.score){
        accuracy.classList.remove("hidden");
        accuracy.innerHTML=`${Number(data.data.accuracy.score)*100}% accuracy`
    }
    else{
        accuracy.classList.add("hidden");
    }
}
const showallData=()=>{
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>showFetchAllData(data.data.tools,false));
}
const spinnerLoading=isLoad=>{
    const spinner=document.querySelector("#spinner-container");
    if(isLoad){
        spinner.classList.add("hidden");
    }
    else{
        spinner.classList.remove("hidden");
    }
}
const sortByDate=()=>{
    spinnerLoading(false);
    fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res=>res.json())
    .then(data=>{
      let array =  data.data.tools.sort(function(a,b){
            return new Date(b.published_in) - new Date(a.published_in);
          });
          showFetchAllData(array,false);
        });
    
}
