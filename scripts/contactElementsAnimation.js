var footer = document.getElementsByClassName("footer_board")[0];
var contactContainers = document.getElementsByClassName("contactInformation");
for(var i = 0; i < contactContainers.length; i++)   
    contactContainers[i].style.transitionDelay = i * 0.05 + "s";

setInterval(scrollCheck, 400);
function scrollCheck() {
    let y = 0;
    for(var i = 0; i < contactContainers.length; i++)
    {
        y = contactContainers[i].getBoundingClientRect().top;
        if(y < window.innerHeight)
            contactContainers[i].dataset.status = "true";
        else if(y > window.innerHeight * 1.5)
            contactContainers[i].dataset.status = "false";
    }

    y = footer.getBoundingClientRect().top;
    if(y < window.innerHeight)
        footer.dataset.status = "true";
    else if(y > window.innerHeight * 1.5) 
        footer.dataset.status = "false";
}