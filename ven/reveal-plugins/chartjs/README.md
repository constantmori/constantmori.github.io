# reveal-chart
A plugin to integrate the chart.js with reveal.js

This plugin is still experimental.

Checkout live demo here : https://dvenkatsagar.github.io/prez/reveal-chart.html

Just download the repository and place the plugin folder in your project root.

If you haven't heard of Revealjs, then check it out [here](https://github.com/hakimel/reveal.js/).

## Installing plugin and making it work
Just add these dependencies and this option to the ```Reveal.initialize``` function:

```javascript
Reveal.initialize({
  ...
  ...

  chart : { // The option
    items : somevar // Some object
  },
  dependencies: [
    ...
    ...
    ...
    { src: 'plugin/chartjs/Chart.min.js'},
    { src: 'plugin/chartjs/charted.js'} // This is the plugin
  ]

  ...
});
```

Now you can create an charts data object in this format:
Note : The ```somevar``` must be declared before the ```Reveal.initialize```

```javascript
  var somevar = [
    {
      selector : "", // must be query like an id that points to the iframe
      type : "", // can be either of the following : line, bar, radar, polararea, pie, doughnut
      data : [], // can be an array ([]) or an object ({}). Check out chart.js documentation
      options : {} // must be a object ({}) check out chart.js documentation
      canvas : { // Optional
        width : "", // the width of the canvas. Default is 250px
        height : "", // the width of the canvas. Default is 150px
      }
    },
    ...
    ...
    ...
  ];
```



Create a iframe tag. Add an attribute ```data-chart``` and an id and then add it to your section:

```html
<section>
  <iframe id="some-selector" style="width:500px; height:500px;" data-chart></iframe>
</section>
```

If you want to access all the charts in the presentation, add a functionality like this AFTER the ```Reveal.initialize```:

```javascript
Reveal.addEventListener("slidechanged",function(){
  setTimeout(function(){ // Needed because the charter.js isnt loaded and executed by that time.
    // To access them
    // The RevealChart contains iframe ids as properties (replacing '-' with '_')
    console.log(RevealChart.some_selector.canvas);
  },500);
},false);
```

## Contact Us

If you guys encounter any bugs, or issues. please contact me via email:

**Authors** : Sagar D V <dvenkatsagar@gmail.com>

**Version** : 0.1.6 (alpha)
