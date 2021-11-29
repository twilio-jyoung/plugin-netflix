import React from 'react'
import DeviceMap from './DeviceMap'

// const addresses = require("./addresses-us-100.json").addresses;

const DevicePage = () => {
  // let locations = [];
  // let devicesActive = Math.floor(Math.random() * 10) + 1;
  // for (let index = 0; index < devicesActive; index++) {
  // 	locations.push(addresses[Math.floor(Math.random() * addresses.length)]);
  // }

  return <DeviceMap key="map" />
}

export default DevicePage
