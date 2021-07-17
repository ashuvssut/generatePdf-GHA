const core = require("@actions/core");
const github = require("@actions/github");
const puppeteer = require("puppeteer");

const getCurrentCommit = async (octokit, owner, repo, branch = "main") => {
	const { data: refData } = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branch}`,
	});
	const commitSha = refData.object.sha;
	// console.log(commitSha)
	const { data: commitData } = await octokit.rest.git.getCommit({
		owner,
		repo,
		commit_sha: commitSha,
	});
	// console.log(commitData)
	return {
		commitSha,
		treeSha: commitData.tree.sha,
	};
};

// const createBlobForFile = async (octokit, owner, repo, filePath) => {
// 	const content = await getFileAsUTF8(filePath);
// 	const blobData = await octo.git.createBlob({
// 		owner: org,
// 		repo,
// 		content,
// 		encoding: "base64",
// 	});
// 	return blobData.data;
// };

const getPdfBase64 = async () => {

	const URL = "https://ashuvssut.github.io/ashuvssut-resume/";
	const domSelector = "#resume-wrap";
	const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
	const page = await browser.newPage();
	await page.goto(URL, {waitUntil: "networkidle2"});
	const desiredHtml = await page.$eval(domSelector, element => {
		return element.innerHTML;
	});

	await page.setContent(desiredHtml, { waitUntil: "networkidle2" });
	await page.evaluateHandle("document.fonts.ready");

	// create a pdf buffer with my preffered settings
	const pdfBuffer = await page.pdf({
		format: "A4",
		landscape: false,
		pageRanges: "1",
		printBackground: true,
		margin: "none",
	});
	return pdfBuffer.toString('base64')
};

const getDateTime = () => {
	var currentdate = new Date();
	var datetime =
		"Last Sync: " +
		currentdate.getDate() +
		"/" +
		(currentdate.getMonth() + 1) +
		"/" +
		currentdate.getFullYear() +
		" @ " +
		currentdate.getHours() +
		":" +
		currentdate.getMinutes() +
		":" +
		currentdate.getSeconds();
}
const uploadToRepo = async (octokit, filePath, owner, repo, branch = `main`) => {
	const currentCommit = await getCurrentCommit(octokit, owner, repo, branch);
	const pdfBase64 = getPdfBase64();
	// const fileBlob = createBlobForFile(octokit, filePath, owner, repo);
	const datetime = getDateTime()
	// const result = await 
};

const main = async () => {
	const GITHUB_TOKEN = "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";
	const octokit = github.getOctokit(GITHUB_TOKEN);

	const OWNER = "ashuvssut";
	const REPO = "generatePdf-GHA";
	const BRANCH = "download";

	octokit.rest.repos.createOrUpdateFile({
		OWNER,
		REPO,
		message: `updating Resume pdf ${datetime}`,
		path: "Resume _ Ashutosh Khanduala.pdf",
		content,
	});

	await uploadToRepo(octokit, "./test/test", OWNER, REPO, BRANCH);
};

main();
