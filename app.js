require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer",
    "esri/Graphic",
    "esri/widgets/Search",
], function (Map, MapView, GraphicsLayer, Graphic, Search) {

    // Crea el mapa
    var map = new Map({
        basemap: "streets-night-vector",
    });

    // Crea la vista del mapa
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-96.875, 38.5],
        zoom: 4,
    });

    // Crea una capa de gráficos para las bandas de rock
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const search = new Search({  //Add Search widget
        view: view,
    });


    // Agrega las bandas de rock como gráficos
    var bands = [];

    fetch('datos.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        bands = data.bands;

        bands.forEach(function (band) {
            var graphic = new Graphic({
                geometry: {
                    type: "point",
                    longitude: band.location[0],
                    latitude: band.location[1],
                },
                symbol: {
                    type: "simple-marker",
                    color: "#E90064",
                    size: "15px",
                },
                attributes: {
                    Name: band.name,
                },
                popupTemplate: {
                    title: "{Name}",
                    content: "<div><img src='" + band.image + "'></div>" + "{Name} es una banda de rock conocida.",
                },
            });
            view.ui.add(search, "top-right");
            graphicsLayer.add(graphic);
        });
    })
});