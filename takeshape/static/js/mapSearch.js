
// var apts = instantsearch({
//   appId: 'OBBTFVLBPT',
//   apiKey: 'b2bb1464328d945084725777e82f0536',
//   indexName: 'cheese',
// });

var apts = instantsearch({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'airbnb',
});

var aptsHits = instantsearch.widgets.hits({
  container: document.querySelector('#hits'),
  hitsPerPage: 3,
  templates: {
    item: '{{name}}'
  }
});

var searchBox = instantsearch.widgets.searchBox({
  container: document.querySelector('#search-query'),
  wrapInput: false,
	cssClasses: {
		input: 'input is-large'
	}
});

var customMapWidget = {
  _autocompleteContainer: document.querySelector('#places'),
  _mapContainer: document.querySelector('#map'),
  _hitToMarker: function(hit) {

		if (!hit._geoloc) return null;

    return new google.maps.Marker({
      position: {
					lat: hit._geoloc.lat,
					lng: hit._geoloc.lng
			},
      map: this._map,
      title: hit.name
    });
  },
  _handlePlaceChange: function(place) {
  	// https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
  	var place = this._autocomplete.getPlace();

		if (place.geometry === undefined) {
      // user did not select any place, see https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
      // events paragraph
			if (place.name === '') {
        // input was cleared
        this._helper
          .setQueryParameter('aroundLatLng')
          .search();
      }
      return;
    }

    // see https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
    var latlng = place.geometry.location.toUrlValue();

    // https://www.algolia.com/doc/guides/geo-search/geo-search-overview/#filter-and-sort-around-a-location
    this._helper
      .setQueryParameter('aroundLatLng', latlng)
      .search();
  },
  init: function(params) {
  	this._helper = params.helper;
    this._autocomplete = new google.maps.places.Autocomplete(this._autocompleteContainer);
    this._autocomplete.addListener('place_changed', this._handlePlaceChange.bind(this));
    this._map = new google.maps.Map(this._mapContainer, {zoom: 1, center: new google.maps.LatLng(0, 0)});
  },
  render: function(params) {
    var markers = params.results.hits.map(this._hitToMarker.bind(this));
    var bounds = new google.maps.LatLngBounds();
    markers.forEach(function(marker) {
			// console.log('ddd', marker);
			try {
				bounds.extend(marker.getPosition());
			} catch(err) {

			}
      //
    });
    this._map.fitBounds(bounds);
  }
};

apts.addWidget(searchBox);
apts.addWidget(aptsHits);
apts.addWidget(customMapWidget);

apts.start();
