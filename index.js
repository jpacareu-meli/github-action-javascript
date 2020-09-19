const core = require("@actions/core");
const github = require("@actions/github");
const api = require('octonode');


async function getPullRequests() {
  const client = api.client(process.env.GITHUB_TOKEN);
  const repo = client.repo(github.context.payload.repository.full_name);
  const result = await repo.prsAsync({ per_page: 100, state: "open" });
  return result[0];
}

async function run() {
  try {
    const nameToGreet = core.getInput("whotogreet");
    console.log(`Hello ${nameToGreet}!`);
    const prs = await getPullRequests()
    const prsJSON = JSON.stringify(prs, undefined, 2);
    console.log(`The OPEN PRs are: ${prsJSON}`);
    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
