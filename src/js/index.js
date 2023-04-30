const form = document.getElementById('lift-simulation-form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // const floors = document.getElementById('floors').value;
    // const lifts = document.getElementById('lifts').value;
    // console.log(floors, lifts)
    // const url = `../liftHtml/lifts.html?floors=${encodeURIComponent(floors)}&lifts=${encodeURIComponent(lifts)}`;
    // window.location.href = url;
    // //const url = '../liftHtml/lifts.html'
    // Get the form data
    let formData = new FormData(form);

    // Set the URL of the new page
    let url = "src/liftHtml/lifts.html";

    // Add the form data to the URL as query parameters
    url += "?" + new URLSearchParams(formData).toString();

    // Navigate to the new page
    window.location.href = url;
})