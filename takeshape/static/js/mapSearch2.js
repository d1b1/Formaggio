/* global algoliasearch instantsearch */

function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', () => reject('Error loading script.'));
    script.addEventListener('abort', () => reject('Script loading aborted.'));

    document.head.appendChild(script);
  });
}

injectScript(
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyAKBlmyMd5Bkdv3SrZrQtyrO77m6Wt3Z34'
).then(function() {

    var searchClient = algoliasearch(
      'OBBTFVLBPT',
      'b2bb1464328d945084725777e82f0536'
    );

    const search = instantsearch({
      indexName: 'cheese',
      searchClient,
    });

		search.addWidget(
			instantsearch.widgets.configure({
				hitsPerPage: 10,
			})
		)

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-query',
				showReset: false,
				showSubmit: false,
				showLoadingIndicator: true,
				placeholder: 'Enter a cheese name...',
				cssClasses: {
					input: 'input is-large'
				},
      })
    );

    search.addWidget(
      instantsearch.widgets.geoSearch({
        container: '#map',
        googleReference: window.google,
				enableRefineControl: true,
    		enableRefineOnMapMove: false,
				mapOptions: {
			    streetViewControl: true,
			  },
				enableRefine: true,
				builtInMarker: {
			    createOptions(item) {
			      return {
			        title: item.name,
			      };
			    },
			    events: {
			      click({ event, item, marker, map }) {
			        console.log(item);

							var infowindow = new google.maps.InfoWindow({
								content: `
									<div style="width: 300px;">
										<figure class="image is-48x48" style="padding: 5px; border:1px solid #DFDFDF; float: left; margin-right: 10px;">
											<img src="${item.photoUrl}">
										</figure>

										<b style="font-size: 18px;">
											${item.name}
										</b>
										<p>
											${item.description || ''}
										</p>
										<p>
											<b>Style:</b> ${item.characteristics.style}
										</p>
										<p>
											<b>Maker:</b> ${item.agents[0].name}
										</p>
										<br>
										<b>Milk:</b> ${item.characteristics.milk}<br>
										<b>Texture:</b> ${item.characteristics.texture}<br>
										<b>Rennet:</b> ${item.characteristics.rennetType}<br>
										<b>Rind:</b> ${item.characteristics.covering}<br>
									</div>
								`
							});

							var marker = new google.maps.Marker({
								position: { lat: item._geoloc.lat, lng: item._geoloc.lng },
								map: map,
								title: 'Uluru (Ayers Rock)'
							});

							marker.addListener('click', function() {
								infowindow.open(map, marker);
							});
			      },
			    },
			  },
      })
    );

		search.addWidget({
		  render: function(data) {
		  	var $hits = [];
		    data.results.hits.forEach(function(hit) {
		    	var $hit = $('<div class="hit">' + hit.name + '</div>');
		      $hit.click(function() {
		        console.log(hit, 'clicked');
						console.log(window.google.maps);
						var map = $("#map")
						window.google.maps.setCenter(new google.maps.LatLng(54.57951, -4.41387));
		      });
		      $hits.push($hit);
		    });
		    $('#hits').html($hits);
		  }
		});

		// search.addWidget(
		// 	instantsearch.widgets.hits({
		// 		container: '#hits',
		// 		templates: {
		// 			item: `
		// 			hddd{{ item._geoloc }}
		// 				<div onclick="go({{ item._geoloc.lat || 0}}, {{ item._geoloc.lng || 0}})">
		// 				<figure class="image is-48x48" style="padding: 5px; border:1px solid #DFDFDF; float: left; margin-right: 10px;">
		// 					<img src="{{ photoUrl}}">
		// 				</figure>
		// 				<h4>
		// 					{{{ _highlightResult.name.value }}}
		// 				</h4>
		// 				Milk: {{ characteristics.milk }},
		// 				Texture: {{ characteristics.texture }}
		// 				</div>
		// 			`,
		// 			empty: `
		// 				<div id="no-results-message">
		// 					<p>
		// 						We didn't find any results for the search <em>"{{query}}"</em>.
		// 					</p>
		// 					<a href="." class='clear-all'>Clear search</a>
		// 				</div>
		// 			`
		// 		},
		// 		cssClasses: {
		// 			list: 'hit-list',
		// 			items: 'hit-item'
		// 		},
		// 		transformData: {
		// 			item(item) {
		// 				console.log('ddd', item);
		// 				return item;
		// 			},
		// 		},
		// 	})
		// );

    search.start();
  }
);
