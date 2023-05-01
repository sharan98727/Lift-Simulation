const form = document.getElementById('lift-simulation-form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(form);

    // Set the URL of the new page
    let url = "src/liftHtml/lifts.html";

    // Add the form data to the URL as query parameters
    url += "?" + new URLSearchParams(formData).toString();
    console.log(url)
    // Navigate to the new page
    window.location.href = url;
    return;
})