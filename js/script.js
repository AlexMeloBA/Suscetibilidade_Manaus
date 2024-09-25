window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';
  
    let places = staticLoadPlaces();
    renderPlaces(places);
};

var x = document.getElementById("mostrar");

function getLocation(){
    
    if (navigator.geolocation){
      
        navigator.geolocation.getCurrentPosition(showPosition);
        
    }
    else{x.innerHTML="O seu navegador não suporta Geolocalização.";}
}

function showPosition(position){
    alert("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
}

function staticLoadPlaces() {
    return [
        {
            name: 'Pokèmon',
            location: {
                 lat: '-8.0036992',
                 lng: '-34.8590141',
            },
        },
    ];
}

var models = [
    {
        url: 'https://arjs-cors-proxy.herokuapp.com/https://10.46.136.13/phng/ar-project/assets/02/brasao.gltf',
        scale: '0.5 0.5 0.5',
        info: '3° Centro de Geoinformação',
        rotation: '0 180 0',
    },
];


var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');
    
    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;
        //alert(latitude+longitude);
        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}