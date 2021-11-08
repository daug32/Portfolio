var contactContainers = document.getElementsByClassName("contactInformation");

setInterval(scrollCheck, 400);
function scrollCheck() {
    let k = 0.0;
    for(var i = 0; i < contactContainers.length; i++)
    {
        let y = contactContainers[i].getBoundingClientRect().top;
        if(y < window.innerHeight) {
            contactContainers[i].style.transitionDelay = k + "s";
            contactContainers[i].dataset.status = "true";
            k += 0.25;
        }
        else if(y > window.innerHeight * 1.1) {
            contactContainers[i].style.transitionDelay = 0;
            contactContainers[i].dataset.status = "false";
        }
    }
}