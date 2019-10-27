
$script(
  'https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyCZV7qjwy_JL03EguX6JcmplaFYKzZkK28',
	// 'https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyBawL8VbstJDdU5397SUX7pEt9DslAwWgQ',
  function() {
    // var search = instantsearch({
    //   searchClient: algoliasearch(
    //     'latency',
    //     '6be0576ff61c053d5f9a3225e2a90f76'
    //   ),
    //   indexName: 'airbnb',
    //   routing: true,
    // });

	  var search = instantsearch({
			searchClient: algoliasearch('OBBTFVLBPT', 'b2bb1464328d945084725777e82f0536'),
	    indexName: 'cheese',
			routing: true
	  });

		search.addWidgets([

			instantsearch.widgets.configure({
				hitsPerPage: 1000,
				aroundLatLngViaIP: true
			}),

			instantsearch.widgets.poweredBy({
			  container: '#powered-by'
			}),

	    instantsearch.widgets.searchBox({
	      container: '#search-query',
				cssClasses: {
					input: 'input is-large'
				},
	      placeholder: 'Search for cheese info...'
	    }),

			instantsearch.widgets.geoSearch({
			  container: '#map',
				googleReference: window.google,
			  initialZoom: 5,
			  enableRefine: true,
			  enableClearMapRefinement: true,
			  enableRefineControl: true,
			  enableRefineOnMapMove: true,
				initialPosition: {
					lat: 42.338477,
					lng: -71.073187
				},
			}),

	    // instantsearch.widgets.stats({
	    //   container: '#stats'
	    // })

	  ])

		search.start();
	}
);
