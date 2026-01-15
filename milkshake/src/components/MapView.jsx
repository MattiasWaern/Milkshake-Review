import { useEffect, useRef } from "react";

function MapView({places, onPlaceClick, averageRating}){
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if(!document.getElementById('leaflet-css')){
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


        function initMap(){
            if(!mapRef.current || mapInstanceRef.current) return;

            const map = window.L.map(mapRef.current).setView([59.8586, 17.6389], 13);

            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            mapInstanceRef.current = map;


            places.forEach(place => {
                if (place.location){
                    const marker = window.L.marker([place.location.lat, place.location.lng]).addTo(map);

                    const popupContent = `
                    <div style="text-align: center;">
                        <h3 style="margin: 0 0 8px 0;">${place.place}</h3>
                        <div style="font-size: 1.2em; color: #667eea; font-weight: bold;">
                            ${averageRating(place.reviews)} ★
                        </div>
                        <div style="color: #666; margin: 5px 0;">
                            ${place.reviews.length} recensioner
                        </div>
                        <button 
                            onclick="window.selectPlace('${place.place}')"
                            style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 8px;
                            cursor: pointer;
                            margin-top: 8px;
                            font-weight: 600;
                            "
                        >
                            Visa recensioner
                        </button>
                    </div>
                    `;

                    marker.bindPopup(popupContent);
                }
            });

            const bounds = places
                .filter(p => p.location)
                .map(p => [p.location.lat, p.location.lng]);

                if(bounds.length > 0){
                    map.fitBounds(bounds, { padding: [50, 50]});
                }
            }

            window.selectPlace = (placeName) => {
                onPlaceClick(placeName);
            };

            return () => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.remove();
                    mapInstanceRef.current = null;
                }
            };
         }, [places, onPlaceClick, averageRating]);

         const placesWithLocation = places.filter(p => p.location).length;
         const placesWithoutLocation = places.length - placesWithLocation;

         return(
            <div className="map-container">
                {placesWithoutLocation > 0 && (
                    <div className="map-info">
                       ℹ️ {placesWithoutLocation} ställen saknar platskoordinater och visas inte på kartan
                    </div>
                )}
                <div ref={mapRef} className="map"></div>
            </div>
         );
}


export default MapView;