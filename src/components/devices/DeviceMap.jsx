import React from "react";
import { withTaskContext } from "@twilio/flex-ui";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

const mapContainerStyles = {
	position: "relative",
	width: "100%",
	height: "600px",
};

const addresses = require("./addresses-us-100.json").addresses;

class DeviceMap extends React.Component {
	constructor(props) {
		super(props);

		let pins = [];
		let devicesActive = Math.floor(Math.random() * 10) + 1;
		for (let index = 0; index < devicesActive; index++) {
			let address = addresses[Math.floor(Math.random() * addresses.length)];
			let active = (Math.floor(Math.random() * 10) + 1) % 2 == 0;
			address.icon = active
				? "//raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png"
				: "//raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_grey.png";
			pins.push(address);
		}

		let mapBounds = new this.props.google.maps.LatLngBounds();
		for (let index = 0; index < pins.length; index++) {
			// mapBounds.extend(pins[index].coordinates);
		}

		this.state = {
			bounds: mapBounds,
			locations: pins,
		};
	}

	displayMarkers = () => {
		return this.state.locations.map((loc, index) => {
			let locationTitle = `${loc.address1}, ${loc.city}, ${loc.state}`;

			return (
				<Marker
					key={index}
					id={index}
					title={locationTitle}
					options={{
						icon: `${loc.icon}`,
					}}
					position={{
						lat: loc.coordinates.lat,
						lng: loc.coordinates.lng,
					}}
					onClick={this.onMarkerClick}
				/>
			);
		});
	};

	render() {
		return (
			<div style={mapContainerStyles}>
				<Map
					google={this.props.google}
					zoom={4}
					bounds={this.state.bounds}
					initialCenter={{
						lat: "39.50",
						lng: "-98.35",
					}}
				>
					{this.displayMarkers()}
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDEyfOQrycakL4z0P9ImSzF92MXKPTnUIU",
})(withTaskContext(DeviceMap));
