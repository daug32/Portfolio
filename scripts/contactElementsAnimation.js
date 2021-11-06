
var contactContainers = document.
    getElementsByClassName("contactInformation");
document.getElementsByTagName("body")[0].
    addEventListener("scroll", function() 
    {
        for(var i = 0; i < contactContainers.length; i++)
        {
            var status = "false";
            var y = contactContainers[i].
                getBoundingClientRect().top;
            if(y < window.innerHTML && y > -1) 
                status = "true";
            contactContainers[i].dataset.status = status;
        }
    }
);