import { default as styled } from "react-emotion";

// let timelineHeight = window.innerHeight - 150;
//max-height: ${timelineHeight}px;

export const EventStream2Styles = styled("div")`
	.timelineContainer {
		overflow: scroll;
		overflow-x: hidden;
		position: static;
	}

	.timeline {
	}

	.timeline div {
		font-size: 12px;
		font-weight: normal;
		font-family: "Open Sans";
		line-height: 18.48px;
	}
`;
