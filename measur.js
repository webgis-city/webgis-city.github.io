   
// start : Length and Area Measurement Control

var lengthButton =  document.createElement('button');
lengthButton.innerHTML = '<img src="Icone/line_measure.png" alt="" style="width:15px;height:15px;filter:brightness(0) invert(0);vertical-align:middle"></img>';
lengthButton.className = 'myButton';
lengthButton.id = 'lengthButton';

var lengthElement = document.createElement('div');
lengthElement.className = 'lengthButtonDiv';
lengthElement.appendChild(lengthButton);

var lengthControl = new ol.control.Control({
    element: lengthElement
})
var lengthFlag = false;
lengthButton.addEventListener("click", () => {
    lengthButton.classList.toggle('clicked');
    lengthFlag  = !lengthFlag;
    document.getElementById("map").style.cursor = "default";
    if(lengthFlag){
        map.removeInteraction(draw);
        addInteraction('LineString');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0)elements[0].remove();

    }
})
map.addControl(lengthControl);

var areaButton = document.createElement('button');
areaButton.innerHTML = '<img src="Icone/area_measure.png" alt="" style="width:15px;height:15px;filter:brightness(0) invert(0);vertical-align:middle"></img>';
areaButton.className = 'myButton';
areaButton.id = 'areaButton';

var areaElement = document.createElement('div');
areaElement.className = 'areaButtonDiv';
areaElement.appendChild(areaButton);

var areaControl = new ol.control.Control({
    element: areaElement
})

var areaFlag = false;
areaButton.addEventListener("click", () => {
    areaButton.classList.toggle('clicked');
    areaFlag  = !areaFlag;
    document.getElementById("map").style.cursor = "default";
    if(areaFlag){
        map.removeInteraction(draw);
        addInteraction('Polygon');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0)elements[0].remove();

    }
})
map.addControl(areaControl);

/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */

var continuePolygonMsg = 'Click to continue polygon, Double click to complete';

/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
 var continueLineMsg = 'Click to continue line, Double click to complete';

 var draw;  // global so we can remove it later

 var source = new ol.source.Vector();
 var vector = new ol.layer.Vector({
     source: source,
     style: new ol.style.Style({
          fill: new ol.style.Fill({
             color: 'rgba(255, 255, 255, 0.4)',
     }),
     stroke: new ol.style.Stroke({
         color: '#ffcc33',
         width: 2,
     }),
     image: new ol.style.Circle({
         radius: 7,
        fill: new ol.style.Fill({
            color: '#ffcc33',
        }),
    }),
 }),
});
map.addLayer(vector);

function addInteraction(intType) {

draw = new ol.interaction.Draw({
    source: source,
    type: intType,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(200, 200, 200, 0.6)',
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 5,
           stroke: new ol.style.Stroke({
               color: 'rgba(0, 0, 0, 0.7)',
           }),
           fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
           }),
       }),
    }),
   });
   map.addInteraction(draw);

   createMeasureTooltip();
   createHelpTooltip();

   /**
    * Currently drawn feature.
    * @type {import("../src/ol/Feature.js").default}
    */
   var sketch;
   /**
    * Handle pointer move.
    * @param {import("../src/ol/MapBrowserEvent").default} evt the event.
  */

   var pointerMoveHandler = function (evt){
       if (evt.dragging){
           return;
       }
       
       /**@type {string} */

       var helpMsg = 'Click to start drawing';
       if (sketch){
           var geom = sketch.getGeometry();
           //if (geom instanceof ol.geom.Polygon) {
           // helpMsg = continuePolygonMsg;
           // } else if (geom instanceof ol.geom.LineString) {
           // helpMsg = continueLineMsg;
           // }
       }

       // helpTooltipElement.innerHTML = helpMsg;
       // helpTooltip.setPosition(evt.coordinat);
       // helpTooltipElement.classList.remove('hidden');
   };

   map.on('pointermove', pointerMoveHandler);

   //var listener;
   draw.on('drawstart', function (evt){
       //set sketch
       sketch = evt.feature;

       /** @type {import("../src/ol/coordinate.js").Coordinate|undefined}*/
       var tooltipCoord = evt.coordinate;


       //listener = sketch.getGeometry().on('change', function (evt){
           sketch.getGeometry().on('change', function (evt){
               var geom = evt.target;
               var output;
               if (geom instanceof ol.geom.Polygon){
                   output = formatArea(geom);
                   tooltipCoord = geom.getInteriorPoint().getCoordinates();
               } else if (geom instanceof ol.geom.LineString){
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();  
               }

            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
           });
       });

       draw.on('drawend', function(){
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
       });
   }

   /**
    * The help tooltip element.
    * @type {HTMLElement}
    */
   var helpTooltipElement;
   /**
    * Overlay to show the help messages.
    * @type {Overlay}
    */
   var helpTooltip;
   /**
    * Creates a new help tooltip
    */

   function createHelpTooltip(){
       if (helpTooltipElement){
           helpTooltipElement.parentNode.removeChild(helpTooltipElement);
       }
       helpTooltipElement = document.createElement('div');
       helpTooltipElement.className = 'ol-tooltip hidden';
       helpTooltip = new ol.Overlay({
           element:  helpTooltipElement,
           offset: [15, 0],
           positioning: 'center-left',
       });
       map.addOverlay(helpTooltip);
   }

   map.getViewport().addEventListener('mouseout', function(){
    helpTooltipElement.classList.add('hidden');
   });

   /**
    * The measure tooltip element.
    * @type {HTMLElement}
    */

   var measureTooltipElement;

   /**
    * Overlay to show the measurement.
    * @type {Overlay}
    */
var measureTooltip;

/**
 * Creates a new measure tooltip
 */


function createMeasureTooltip(){
    if (measureTooltipElement){
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);

}
/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */

var formatLength = function (line){
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';

    }
    return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} The formatted area.
 */
 var formatArea = function (polygon){
    var area = ol.sphere.getArea(polygon);
    var output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';

    }
    return output;
}; 

var element = document.createElement('div');
element.className = 'measure-control ol-unselectable ol-control';
element.appendChild(button);

ol.control.Control.call(this, {
  element: element,
  target: options.target
});