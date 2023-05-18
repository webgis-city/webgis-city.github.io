var scaleControl = new ol.control.ScaleLine({
    bar: true,
    steps: 4,
    text: true,
    minWidth:100,
  });
  map.addControl(scaleControl);

var mousePositionControl = new ol.control.MousePosition({
    className: 'custom-mouse-position',
    projection: 'EPSG:4326',
    coordinateFormat: function(coordinate){return ol.coordinate.format(coordinate, '{x},{y}', 6);}
   });
  map.addControl(mousePositionControl);

   