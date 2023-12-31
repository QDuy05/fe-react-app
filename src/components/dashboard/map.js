// Map.js
import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import iconMarker from '../../images/iconMarker.png';
import VNMap from '../../geojson/diaphantinh.json'

const markerIcon = L.icon({
    iconUrl: iconMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const Map = ({ data }) => {
    const center = [14.0583, 108.2772]; // Tọa độ trung tâm Việt Nam

    // Sắp xếp mảng dữ liệu theo dân số giảm dần
    const sortedData = [...data].sort((a, b) => b.population - a.population);

    // Chọn 5 thành phố đầu tiên
    const top5Cities = sortedData.slice(0, 5);

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name); // Hiển thị Popup với tên đối tượng
        }
    };

    return (
        <MapContainer center={center} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON data={VNMap} style={{ fillColor: 'green', color: 'black', weight: 1 }} onEachFeature={onEachFeature} />

            {/* Chấm marker cho 5 thành phố có số liệu nhiều nhất */}
            {top5Cities.map(city => (
                <Marker key={city.name} position={city.coordinates} icon={markerIcon}>
                    <Popup>{city.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
