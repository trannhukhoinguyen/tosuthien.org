import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: shadow,
});

export default function initMegaMenus() {
    document.querySelectorAll('.mega-menu').forEach(container => {
        const mapEl = container.querySelector('.map') as HTMLElement;
        if (!mapEl) return;

        let map: any = null;

        function initMap() {
            if (map) return;

            map = L.map(mapEl).setView([16, 108], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            container.querySelectorAll("li").forEach((li: any) => {
                const lat = parseFloat(li.dataset.lat);
                const lng = parseFloat(li.dataset.lng);
                const title = li.dataset.title;

                if (!lat || !lng) return;

                const marker = L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(title);

                li.addEventListener("mouseenter", () => {
                    map.setView([lat, lng], 12);
                    marker.openPopup();
                });
            });

            setTimeout(() => map.invalidateSize(), 300);
        }

        const dropdown = container.closest('.mega-dropdown');
        dropdown?.addEventListener('mouseenter', () => {
            setTimeout(initMap, 100);
        });
    });
}

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", initMegaMenus);
}
