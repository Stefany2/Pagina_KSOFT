import folium

# Coordenadas
lat = -9.98131858444757
lon = -76.24075873422063

# Crear el mapa centrado en las coordenadas
mapa = folium.Map(location=[lat, lon], zoom_start=15)

# Agregar un marcador con información personalizada
popup_texto = """
<b>COLPA ALTA B-13</b><br>
EMPRESA INGENERIA E INFORMATICA ,<br>
KINGSOFTWARE SAC.
"""
folium.Marker([lat, lon], popup=popup_texto, tooltip="Haz clic para más info").add_to(mapa)

# Guardar el mapa como un archivo HTML
mapa.save("ubicacion.html")

print("Mapa generado exitosamente: abre 'ubicacion.html' en tu navegador.")
