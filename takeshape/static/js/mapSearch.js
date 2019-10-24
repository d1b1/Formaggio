
function initSearch() {

	console.log('Starting the Search now');

	app({
		appId: 'OBBTFVLBPT',
		apiKey: 'b2bb1464328d945084725777e82f0536',
		indexName: 'cheese',
	});

	function app(opts) {
	  const search = instantsearch({
			searchClient: algoliasearch(opts.appId, opts.apiKey),
	    indexName: opts.indexName,
	    searchFunction: opts.searchFunction,
	  });

		search.addWidget(
			instantsearch.widgets.configure({
				hitsPerPage: 100,
				aroundLatLngViaIP: true,
			})
		)

		search.addWidget(
			instantsearch.widgets.poweredBy({
			  container: '#powered-by',
			})
		);

	  search.addWidget(
	    instantsearch.widgets.searchBox({
	      container: '#search-query',
				cssClasses: {
					input: 'input is-large'
				},
	      placeholder: 'Search for cheese info...'
	    })
	  );

		search.addWidget(
			instantsearch.widgets.geoSearch({
			  container: '#map',
			  googleReference: window.google,
			  initialZoom: 1,
			  enableRefine: true,
			  enableClearMapRefinement: true,
			  enableRefineControl: true,
			  enableRefineOnMapMove: true,
			  //templates: object,
			  //cssClasses: object,
				// initialPosition: object,
				// mapOptions: object,
				// builtInMarker: object,
				// customHTMLMarker: object,
			})
		);

	  search.addWidget(
	    instantsearch.widgets.stats({
	      container: '#stats',
	    })
	  );

		// Use this widget to add the list of Coverings.
		search.addWidget(
	    instantsearch.widgets.refinementList({
	      container: '#covering',
	      attribute: 'characteristics.covering',
				showMore: false,
				showMoreLimit: 10,
				searchable: false,
	      templates: {
					item: `
			      <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
			        <span>{{label}} ({{count}})</span>
			      </a>
			    `,
					noResults: '<div class="sffv_no-results">No matching brands.</div>',
					noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
	      }
	    })
	  );

		search.addWidget(
			instantsearch.widgets.clearRefinements({
			  container: "#clearAll"
			})
		);

	  search.addWidget(
	    instantsearch.widgets.refinementList({
	      container: '#milk',
	      attribute: 'characteristics.milk',
	      showMore: false,
				showMoreLimit: 10,
				searchable: false,
				cssClasses: {
					searchableInput: "input is-large",
				},
	      templates: {
					item: `
						<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
							<span>
								{{label}} ({{count}})
							</span>
						</a>
					`,
					noResults: '<div class="sffv_no-results">No matching brands.</div>',
					noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
	      }
	    })
	  );

		search.addWidget(
	    instantsearch.widgets.refinementList({
	      container: '#aged',
	      attribute: 'characteristics.aged',
				showMore: false,
				showMoreLimit: 10,
				searchable: false,
	      templates: {
					item: `
						<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
							<span>{{label}} ({{count}})</span>
						</a>
					`,
					noResults: '<div class="sffv_no-results">No matching brands.</div>',
					noRefinementRoot: '<div class="sffv_no-results">No matching brands.</div>'
	      },
	    })
	  );

	  search.start();
	}
}
