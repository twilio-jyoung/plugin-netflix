import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

import CustomTaskListContainer from "./components/CustomTaskList/CustomTaskList.Container";
import reducers, { namespace } from "./states";
import Panel2Container from "./components/common/Panel2Container";

const PLUGIN_NAME = "NetflixPlugin";

export default class NetflixPlugin extends FlexPlugin {
	constructor() {
		super(PLUGIN_NAME);
	}

	async init(flex, manager) {
		flex.AgentDesktopView.Panel1.defaultProps.splitterOrientation = "vertical";
		flex.AgentDesktopView.defaultProps.splitterOptions = {
			initialFirstPanelSize: "400px",
			minimumFirstPanelSize: "250px",
		};
		flex.MainHeader.defaultProps.logoUrl =
			"//1000logos.net/wp-content/uploads/2017/05/Netflix-Logo-2006.png";

		flex.AgentDesktopView.Panel2.Content.remove("container");
		flex.AgentDesktopView.Panel2.Content.add(
			<Panel2Container
				key="tabs"
				theme={manager.configuration.theme}
				flex={flex}
				manager={manager}
			/>
		);

		// this.registerReducers(manager);

		// const options = { sortOrder: -1 };
		// flex.AgentDesktopView.Panel1.Content.add(
		// 	<CustomTaskListContainer key="NetflixPlugin-component" />,
		// 	options
		// );
	}

	registerReducers(manager) {
		if (!manager.store.addReducer) {
			// eslint-disable-next-line
			console.error(
				`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
			);
			return;
		}

		manager.store.addReducer(namespace, reducers);
	}
}
