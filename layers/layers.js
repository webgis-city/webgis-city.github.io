var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Ostan_1 = new ol.format.GeoJSON();
var features_Ostan_1 = format_Ostan_1.readFeatures(json_Ostan_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ostan_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ostan_1.addFeatures(features_Ostan_1);
var lyr_Ostan_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Ostan_1, 
                style: style_Ostan_1,
                interactive: true,
                title: '<img src="styles/legend/Ostan_1.png" /> Ostan'
            });
var format_Station2_2 = new ol.format.GeoJSON();
var features_Station2_2 = format_Station2_2.readFeatures(json_Station2_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Station2_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Station2_2.addFeatures(features_Station2_2);cluster_Station2_2 = new ol.source.Cluster({
  distance: 10,
  source: jsonSource_Station2_2
});
var lyr_Station2_2 = new ol.layer.Vector({
                declutter: true,
                source:cluster_Station2_2, 
                style: style_Station2_2,
                interactive: true,
                title: '<img src="styles/legend/Station2_2.png" /> Station2'
            });
var format_photo_3 = new ol.format.GeoJSON();
var features_photo_3 = format_photo_3.readFeatures(json_photo_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_photo_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_photo_3.addFeatures(features_photo_3);
var lyr_photo_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_photo_3, 
                style: style_photo_3,
                interactive: true,
                title: '<img src="styles/legend/photo_3.png" /> photo'
            });

lyr_OSMStandard_0.setVisible(true);lyr_Ostan_1.setVisible(true);lyr_Station2_2.setVisible(true);lyr_photo_3.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_Ostan_1,lyr_Station2_2,lyr_photo_3];
lyr_Ostan_1.set('fieldAliases', {'OSTAN': 'OSTAN', 'URL': 'URL', });
lyr_Station2_2.set('fieldAliases', {'name': 'name', 'ostan': 'ostan', 'x': 'x', 'y': 'y', 'h': 'h', 't': 't', 'p': 'p', });
lyr_photo_3.set('fieldAliases', {'id': 'id', 'Name': 'Name', 'Img': 'Img', });
lyr_Ostan_1.set('fieldImages', {'OSTAN': 'TextEdit', 'URL': 'TextEdit', });
lyr_Station2_2.set('fieldImages', {'name': 'TextEdit', 'ostan': 'TextEdit', 'x': 'TextEdit', 'y': 'TextEdit', 'h': 'TextEdit', 't': 'TextEdit', 'p': 'TextEdit', });
lyr_photo_3.set('fieldImages', {'id': 'TextEdit', 'Name': 'TextEdit', 'Img': 'ExternalResource', });
lyr_Ostan_1.set('fieldLabels', {'OSTAN': 'no label', 'URL': 'no label', });
lyr_Station2_2.set('fieldLabels', {'name': 'no label', 'ostan': 'inline label', 'x': 'header label', 'y': 'inline label', 'h': 'no label', 't': 'no label', 'p': 'no label', });
lyr_photo_3.set('fieldLabels', {'id': 'no label', 'Name': 'no label', 'Img': 'no label', });
lyr_photo_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});