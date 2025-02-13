import { h } from 'preact';
import { screen } from '@testing-library/preact';
import { render } from 'utils/test_utils';
import '@testing-library/jest-dom';
import * as timeago from "timeago.js";

import TimeAgo from './timeAgo';

describe('time ago component', () => {
	it("formats raw data into  formated date", async () => {
		let date = (new Date()).getTime()/1000;
		render(<TimeAgo date={date} />);
		expect(
			await screen.findByText(timeago.format(new Date(date * 1000)))
		).toBeInTheDocument();
	});
});
