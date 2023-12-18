import Map from "../vendor/map";

export default function connectMap() {
  if(!ymaps) return
  const map = document.querySelectorAll(".js-map")
  
  async function getMapJson(path) {
    if(!path) return
    
    const response = await fetch(path)
    return response.json()
  }
  
  function getMapOptions() {
    map?.forEach(async (elementMap) => {
      const jsonPath = elementMap?.dataset.json
      const zoom = Number(elementMap?.dataset.zoom)
      const mapIconPath = elementMap?.dataset.icon
      const mapCenter = elementMap?.dataset.center.split(", ")
      const mapCoordinates = await getMapJson(jsonPath)
      
      initMap(elementMap, {
        zoom,
        mapCenter,
        mapIconPath,
        mapCoordinates,
      })
    })
  }
  
  function initMap(map, options) {
    const {
      zoom,
      mapCoordinates,
      mapCenter,
      mapIconPath
    } = options
    
    const yMap = new Map(map, {
      zoom: zoom,
      center: mapCenter,
      icon: {
        url: mapIconPath,
        size: [70, 70],
        offset: [-30, -60]
      }
    })
    
    mapCoordinates?.forEach((item) => {
      const coordinate = item?.coords.split(", ")
      yMap.addPlace(coordinate)
    })
  }
  
  return ymaps.ready(() => getMapOptions())
}