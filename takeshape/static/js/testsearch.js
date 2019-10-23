
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
			hitsPerPage: 8,
			clickAnalytics: true
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
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
				item: `
					<div style="padding-top: 20px; padding-bottom: 20px; border-bottom: 1px solid #DFDFDF;">
						<h3 class="is-size-4">
							{{{ _highlightResult.name.value }}}
						</h3>
						<br>
						<span class="clearfix">
							Aged: {{ characteristics.aged }},
							Milks: {{ characteristics.milk }}
						</span>
					</div>
				`,
        empty: `
					<div id="no-results-message">
						<p>
							We didn't find any results for the search <em>"{{query}}"</em>.
						</p>
						<a href="." class='clear-all'>Clear search</a>
					</div>
				`
      },
      transformData: {
        item(item) {
          return item;
        },
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
    })
  );

	// Use this widget to set the input query box.
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-query',
			templates: {
				last: '',
				previous: 'Previous',
				next: 'Next'
			},
			cssClasses: {
				list: 'pagination-list',
				//previousPageItem: 'pagination-previous',
				//nextPageItem: 'pagination-next',
				selectedItem: 'is-current',
				link: 'pagination-link'
			}
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
