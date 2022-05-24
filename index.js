const axios = require('axios');
const core = require('@actions/core');

const DISCORD_WEBHOOK = core.getInput('discord_webhook', {
	required: true
});

const BRANCH = core.getInput('branch', {
	required: true
});

const COMMIT_ID = core.getInput('commit_id', {
	required: true
});

const RUNNER_ID = core.getInput('runner_id', {
	required: true
})

const REQUEST_ID = core.getInput('request_id', {
	required: true
})

const CLIENT = core.getInput('client', {
	required: true
})

const VERSION = core.getInput('version', {
	required: true
})

const TEST_SERVER_API_URL = core.getInput('test_server_api_url', {
	required: true
})

const isProduction = BRANCH === 'master';
const isWeb = CLIENT === 'web';
const testMessageTitle = `📢📢 ${isWeb ? '**Web**' : '**Desktop**'} - New TEST Version Of Black IDE Released!!`;
const prodMessageTitle = `🥳🥳 Black IDE  ${isWeb ? '**Web**' : '**Desktop**'} **v${VERSION}** Has Been Released!!`;

let fields = [];
if (isWeb) {
	fields = isProduction ? [
		{
			name: "You can access the web IDE by 👇",
			value: "https://ide.black"
		}
	] : [
		{
			name: "You can access the web IDE by 👇",
			value: "https://eth-test.ide.black"
		}
	]
} else {
	fields = isProduction ? [
		{
			"name": "You can download the release assets from Github 👇",
			"value": `[Click Me For Release Assets](https://github.com/ObsidianLabs/Black-IDE/releases`,
		}
	] : [
		{
			"name": "Mac OS",
			"value": `[Download](${TEST_SERVER_API_URL}/${RUNNER_ID}-${COMMIT_ID}/Black-IDE-${VERSION}.dmg)`,
			"inline": true
		},
		{
			"name": "Windows",
			"value": `[Download](${TEST_SERVER_API_URL}/${RUNNER_ID}-${COMMIT_ID}/Black-IDE-${VERSION}.exe)`,
			"inline": true
		},
		{

			"name": "Linux",
			"value": `[Download](${TEST_SERVER_API_URL}/${RUNNER_ID}-${COMMIT_ID}/Black-IDE-${VERSION}.zip)`,
			"inline": true
		}
	]
}

const params = {
	username: "Github Bot",
	avatar_url: "",
	embeds: [
		{
			"title": isProduction ? prodMessageTitle : testMessageTitle,
			"description": `${REQUEST_ID} - ${RUNNER_ID} - ${COMMIT_ID}`,
			"color": "647562",
			"fields": fields
		}
	],
}

axios({
	method: 'post',
	url: DISCORD_WEBHOOK,
	data: JSON.stringify(params),
	headers: {
		'Content-type': 'application/json'
	},
});