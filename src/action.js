const core = require("@actions/core");
const github = require("@actions/github");

const getCurrentCommit = async (octokit, owner, repo, branch = "main") => {
	const { data: refData } = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branch}`,
	});
	const commitSha = refData.object.sha;
	console.log(commitSha)
};

const uploadToRepo = async (octokit, filePath, owner, repo, branch = `main`) => {
	const currentCommit = await getCurrentCommit(octokit, owner, repo, branch);
};

const main = async () => {
	const GITHUB_TOKEN = "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";
	const octokit = github.getOctokit(GITHUB_TOKEN);

	const OWNER = "ashuvssut";
	const REPO = "ashuvssut-resume";
	const BRANCH = "download";

	await uploadToRepo(octokit, "./", OWNER, REPO, BRANCH);
};

main();
