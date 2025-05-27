import folium

# Coordenadas
lat = -9.98131858444757
lon = -76.24075873422063

# Crear el mapa centrado en las coordenadas
mapa = folium.Map(location=[lat, lon], zoom_start=15)

# Agregar un marcador con información personalizada
popup_texto = """
<b>Ubicación personalizada</b><br>
Aquí puedes colocar cualquier información,<br>
como una dirección, un nombre de lugar, o una descripción.
"""
folium.Marker([lat, lon], popup=popup_texto, tooltip="Haz clic para más info").add_to(mapa)

# Guardar el mapa como un archivo HTML
mapa.save("ubicacion1.html")

print("Mapa generado exitosamente: abre 'ubicacion1.html' en tu navegador.")
