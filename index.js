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
const testMessageTitle = `🥳🥳 New TEST Version Of Black IDE ${isWeb ? '**Web**' : '**Desktop**'} Released!!`;
const prodMessageTitle = `🥳🥳 Black IDE  ${isWeb ? '**Web**' : '**Desktop**'} **v${VERSION}** Has Been Released!!`;

const params = {
	username: "Github Bot",
	avatar_url: "",
	embeds: [
		{
			"title": isProduction ? prodMessageTitle : testMessageTitle,
			"description": `${RUNNER_ID} - ${COMMIT_ID}`,
			"color": "647562",
			"fields": [
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