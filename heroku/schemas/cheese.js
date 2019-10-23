{ _id
	agents {
		_id
		address {
			addressLine1
			addressLine2
			city
			country
			state
			zipCode
		}
		descriptionSummary
		email
		logo {
			_id
			caption
			credit
			description
			filename
			mimeType
			path
			sourceUrl
			title
			uploadStatus
		}
		name
		operators
		phone
		socialMedia {
			facebook
			instagram
			twitter
			youTube
		}
		type
		websiteUrl
		yearFounded
	}
	characteristics {
		aged
		covering
		flavors
		milk
		rennetType
		standardsAndProcessing
		style
		texture
	}
	description
	labelOrPhoto {
		_id
		caption
		credit
		description
		filename
		mimeType
		path
		sourceUrl
		title
		uploadStatus
	}
	name
	pairings
	photos {
		photo {
			_id
			caption
			credit
			description
			filename
			mimeType
			path
			sourceUrl
			title
			uploadStatus
		}
	}
	source
	tastesLike {
		_id
		agents {
			_id
			address {
				addressLine1
				addressLine2
				city
				country
				state
				zipCode
			}
			descriptionSummary
			email
			name
			operators
			phone
			socialMedia {
				facebook
				instagram
				twitter
				youTube
			}
			type
			websiteUrl
			yearFounded
		}
		characteristics {
			aged
			covering
			flavors
			milk
			rennetType
			standardsAndProcessing
			style
			texture
		}
		description
		labelOrPhoto {
			_id
			caption
			credit
			description
			filename
			mimeType
			path
			sourceUrl
			title
			uploadStatus
		}
		name
		pairings
		photos {
			photo {
				_id
				caption
				credit
				description
				filename
				mimeType
				path
				sourceUrl
				title
				uploadStatus
			}
		}
		source
		tastesLike {
			_id
			characteristics {
				aged
				covering
				flavors
				milk
				rennetType
				standardsAndProcessing
				style
				texture
			}
			description
			name
			pairings
			source
		}
	}
}
