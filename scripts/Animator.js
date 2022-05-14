import { Setup, Draw } from "/scripts/CanvasController.js";
import UlAnimation from "/scripts/UlAnimation.js";


(function Main()
{
    SetUpCanvas();

    AnimateAppearence();
    UlAnimation( "ul-animation" );
})();

function SetUpCanvas()
{
    window.setup = Setup;
    window.draw = Draw;
}

function AnimateAppearence()
{
    let footer = document.getElementsByClassName( "footer" )[0];
    let contactContainers = document.getElementsByClassName( "contact-info" );

    setInterval( ScrollCheck, 400 );

    function ScrollCheck() 
    {
        for ( let i = 0; i < contactContainers.length; i++ )
        {
            SetState( contactContainers[i] );
        }
        SetState( footer );

        function SetState( element )
        {
            let y = element.getBoundingClientRect().top;
            if ( y + 100 < window.innerHeight )
            {
                element.dataset.status = "true";
            }
            else if ( y > window.innerHeight * 1.2 )
            { 
                element.dataset.status = "false";
            }
        }
    }
}