import Map from "../vendor/map";

export default function connectMap() {
  if(!ymaps) return
  const map = document.querySelectorAll(".js-map")
  
  async function getMapJson(path) {
    try {
      if(!path) return
      
      const response = await fetch(path)
      return response.json()
    } catch (error) {
      console.error("Error while fetch map json", error)
    }
  }
  
  function initMap() {
    map?.forEach(async (elementMap) => {
      const jsonPath = elementMap?.dataset.json
      const zoom = Number(elementMap?.dataset.zoom)
      const mapIconPath = elementMap?.dataset.icon
      const mapCenter = elementMap?.dataset.center.split(", ")
      const mapCoordinates = await getMapJson(jsonPath)
      
      const isMapCenterExists = mapCenter.length !== 1 ? mapCenter : [55.786430, 49.124335]
      const isZoomExists = zoom ? zoom : 5
      
      setMapOptions(elementMap, {
        zoom: isZoomExists,
        mapCenter: isMapCenterExists,
        mapIconPath,
        mapCoordinates,
      })
    })
  }
  
  function setMapOptions(map, options) {
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
  
  return ymaps.ready(() => initMap())
}