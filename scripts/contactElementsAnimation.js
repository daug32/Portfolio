var footer = document.getElementsByClassName("footer_board")[0];
var contactContainers = document.getElementsByClassName("contactInformation");

setInterval(scrollCheck, 400);
function scrollCheck() {
    let y = 0;
    for(var i = 0; i < contactContainers.length; i++)
    {
        y = contactContainers[i].getBoundingClientRect().top;
        if(y + 100 < window.innerHeight)
            contactContainers[i].dataset.status = "true";
        else if(y > window.innerHeight * 1.2)
            contactContainers[i].dataset.status = "false";
    }

    y = footer.getBoundingClientRect().top;
    if(y + 100 < window.innerHeight)
        footer.dataset.status = "true";
    else if(y > window.innerHeight * 1.2) 
        footer.dataset.status = "false";
}