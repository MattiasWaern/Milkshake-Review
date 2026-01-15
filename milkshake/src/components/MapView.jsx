import { useEffect, useRef } from "react";

function MapView({places, onPlaceClick, averageRating}){
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if(!document.getElementById('leaflet.css')){
            const link = document.createElement('link');
            link.id = 'leaflet-css'
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
            document.head.appendChild(link);
        }


        if(!window.L){
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
            script.onload = initMap;
            document.body.appendChild(script);
        } else {
            initMap();
        }
    })
}