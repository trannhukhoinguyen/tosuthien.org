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

        const buttons = container.querySelectorAll<HTMLButtonElement>(".tabs button");
        const contents = container.querySelectorAll<HTMLElement>("[data-content]");

        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const tab = btn.dataset.tab || "";

                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                contents.forEach(el => {
                    el.classList.toggle("active", el.dataset.content === tab);
                });
            });
        });

        const mapEl = container.querySelector('.map') as HTMLElement;
        if (!mapEl) return;

        let map: any = null;
        let markers: any[] = [];

        function initMap() {
            if (map) return;

            map = L.map(mapEl).setView([16, 108], 5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
                .addTo(map);

            container.querySelectorAll<HTMLLIElement>("li").forEach(li => {
                const latStr = li.dataset.lat;
                const lngStr = li.dataset.lng;
                const title = li.dataset.title || "";

                if (!latStr || !lngStr) return;

                const lat = parseFloat(latStr);
                const lng = parseFloat(lngStr);

                if (isNaN(lat) || isNaN(lng)) return;

                const marker = L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(title);

                markers.push({ marker, lat, lng, li });

                li.addEventListener("mouseenter", () => {
                    markers.forEach(m => m.marker.closePopup());

                    map.setView([lat, lng], 13);
                    marker.openPopup();
                    marker.setZIndexOffset(1000);
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
} else {
    initMegaMenus();
}
