var ulElements = document.getElementsByTagName("ul");
for(var i = 0; i < ulElements.length; i++){
    ulElements[i].addEventListener("mouseover", ulAdditionalAnimationOn);
    ulElements[i].addEventListener("mouseout", ulAdditionalAnimationOut);
}

function ulAdditionalAnimationOn(event) {    
    let el = event.target;
    if(el.tagName === "UL") return;
    while(el.tagName !== "LI") el = el.parentElement;

    let elements  = el.parentElement.children;
    for(var i = 0; i < elements.length; i++) {
        elements[i].classList.add("notTargetLi");
    }
    el.classList.replace("notTargetLi", "targetLi");
}
function ulAdditionalAnimationOut(event) {   
    let el = event.target;
    if(el.tagName === "UL") return;
    while(el.tagName !== "LI") el = el.parentElement;

    let elements = el.parentElement.children;
    for(var i = 0; i < elements.length; i++){
        elements[i].classList.remove("targetLi", "notTargetLi");
    }
}