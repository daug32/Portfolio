
var contactContainers = document.getElementsByClassName("contactInformation");
var contactElementsAnimation = setInterval(function() {
    for(var i = 0; i < contactContainers.length; i++)
    {
        var y = contactContainers[i].getBoundingClientRect().top;
        var targetY = $(window).height();
        if(y > -1 && y < targetY + 1)
        {
            for(var j = 0; j <= i; j++)
            {
                contactContainers[j].style.visibility = "visible";
                contactContainers[j].style.animationName = "bottomTopAppearence";
                contactContainers[j].style.animationDuration = "1.2s";
            }
        }
        else if (y > targetY) 
        {
            for(var j = i; j < contactContainers.length; j++){
                contactContainers[j].style.visibility = "hidden";
                contactContainers[j].style.animationName = "none";
                contactContainers[j].style.animationDuration = "1.2s";
            }
        }
    }
}, 400);