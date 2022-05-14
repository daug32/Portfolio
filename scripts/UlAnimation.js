export default function UlAnimation( targetListClass )
{
    CreateAnimationClass();

    let ulElements = document.getElementsByClassName( targetListClass );
    for ( let i = 0; i < ulElements.length; i++ )
    {
        let children = ulElements[i].children;
        for ( let j = 0; j < children.length; j++ )
        {
            if ( children[j].tagName.toLowerCase() != "li" ) continue;
            children[j].addEventListener( "mouseover", Add );
            children[j].addEventListener( "mouseout", Remove );
        }
    }
}

function Add( event )
{
    let children = event.target.parentElement.children;

    for ( let i = 0; i < children.length; i++ )
    {
        let el = children[i];
        el.classList.add( "ul-animation__not-target" );
    }
    event.target.classList.replace( "ul-animation__not-target", "ul-animation__target" );
}

function Remove( event )
{
    let children = event.target.parentElement.children;

    for ( let i = 0; i < children.length; i++ )
    {
        let el = children[i];
        el.classList.remove( "ul-animation__target", "ul-animation__not-target" );
    }
}

function CreateAnimationClass()
{
    let style = document.createElement( "style" );
    style.innerHTML = `
        .ul-animation li:nth-child(n)
        {
            transition: filter 0.2s;
        }

        .ul-animation__target
        {
            filter: brightness(1.5);
        }

        .ul-animation__not-target
        {
            filter: brightness(0.6);
        }
    `;
    document.head.appendChild( style );
}