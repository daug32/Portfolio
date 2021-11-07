var contactContainers = document.getElementsByClassName("contactInformation");


setInterval(scrollCheck, 400);
function scrollCheck() {
    for(var i = 0; i < contactContainers.length; i++)
    {
        let y = contactContainers[i].getBoundingClientRect().top;
        if(y < window.innerHeight) contactContainers[i].dataset.status = "true";
        else if(y > window.innerHeight * 1.1) contactContainers[i].dataset.status = "false";
    }
}