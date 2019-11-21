var setUser = function(user) {
	// search.addWidgets([
	// 	instantsearch.widgets.configure({
	// 		enablePersonalization: true,
	// 		userToken: user.id,
	// 	}),
	// ]);
}

netlifyIdentity.on('init', function(user) {
	if (user) {
		$('#session').html('<b>Welcome ' + user.user_metadata.full_name + '</b>')
		console.log('init', user);
		setUser(user);
	}
});

netlifyIdentity.on('login', (user) => {
	if (user) {
		$('#session').html('<b>Welcome ' + user.user_metadata.full_name + '</b>')
		setUser(user);
	}
});

netlifyIdentity.on('logout', () => {
	$('#session').html('Sign-In')
});
