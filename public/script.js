const propertiesUrl = '/api/properties';

fetch(propertiesUrl)
  .then(response => response.json())
  .then(properties => {
    const propertiesList = document.getElementById('properties-list');
    properties.forEach(property => {
      const propertyHtml = `
        <li>
          <h2>${property.name}</h2>
          <p>Address: ${property.address}</p>
         