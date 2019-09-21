/*

Source:
------------------------------------------------------------
http://stackoverflow.com/questions/23597699/reveal-js-iframe-background

https://github.com/hakimel/reveal.js/pull/1029#issuecomment-65373274


Notes:
------------------------------------------------------------
Interacting with the background iframes:

Use the dev branch on reveal.js to get the data-background-iframe feature. Implement this small patch to interact with the iframes until something similar gets merged in.

*/

function showSlide( slide ) {
    // ...

    if( background ) {
        // ...
        document.querySelector('.reveal > .backgrounds').style['z-index'] = 0; // reset when not in iframe
        // ...
        if( background.hasAttribute( 'data-loaded' ) === false ) {
            // ...
            if( backgroundImage ) {
                // ...
            }
            // ...
           else if ( backgroundIframe ) {
               // ...
               document.querySelector('.reveal > .backgrounds').style['z-index'] = 1; // set when in iframe
           }
       }
   }
    if (slide.getAttribute( 'data-background-iframe' )) {
        document.querySelector('.reveal > .backgrounds').style['z-index'] = 1;
    }
}