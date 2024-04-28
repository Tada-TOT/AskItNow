var questions;

/*document.addEventListener("DOMContentLoaded", () => {
	getQuestions(); Added onLoad in index.html's body..
	if (localStorage.getItem("user") != undefined) { ***A function dows is implemented and assigned to auth.html page only.***
		window.location.assign("index.html");
	}
});*/

function toggleForms() {
	document.getElementById("reg-sec").removeAttribute("hidden");
	document.getElementById("login-sec").setAttribute("hidden", "");
};

function openNewQuestionDialog() {
	NQDialog = document.getElementById("newQs");
	document.querySelector("#allQs button").addEventListener("click", e => {
		NQDialog.removeAttribute("hidden");
	});
	closeI = document.querySelector("#asknewquestion").nextElementSibling.addEventListener("click", e => {
		NQDialog.setAttribute("hidden", "");
	});
};

async function getQuestions() {
	[questions, status] = await fetchHelper("http://localhost:3000/questions?_sort=-createdAt", "GET", "");
	showQuestions(questions);
};

function showQuestions(qsList) {
	const questionsSection = document.getElementById("allAns");
	questionsSection.innerHTML = "";
	qsList.forEach(qs => {
		var answered = qs.answered;
		var tags = "";
		const date = new Date(qs.createdAt);

		if (answered) {
			answered = ""
		} else {
			answered = "hidden"
		}
		qs.tags.forEach(tag => {
			tags += `<a class="tag" href="#">${tag}</a>\n`;
		});

		const ques =
			`<article id="${qs.id}">
			<div class="lefted">
				<div class="upvote">
					<span class="accepted" ${answered}>✔</span>
					<br ${answered}>
					<span>${qs.answers.length} Answers</span>
				</div>
				<div>
					<h2><a href="./html/question.html">${qs.title}</a></h2>
					<p>${qs.description}</p>
					${tags}
				</div>
			</div>
			<div class="details">
				<span>Asked by: ${qs.author.username}</span>
				<br>
				<span>Asked on: <time datetime="${date}">${np(date.getDate())}/${np(date.getMonth() + 1)}/${date.getFullYear()}</time></span>
			</div>
		</article>`

		questionsSection.innerHTML += ques;
	});
};

function sortQuestions(criteria) {
	switch (criteria.toLowerCase()) {
		case "newest":
			questions.sort((a, z) => {
				return (a.createdAt >= z.createdAt) ? -1 : 1;
			});
			showQuestions(questions);
			break;
		case "oldest":
			questions.sort((a, z) => {
				return (a.createdAt <= z.createdAt) ? -1 : 1;
			});
			showQuestions(questions);
			break;
		case "most answered":
			questions.sort((a, z) => {
				return (a.answers.length >= z.answers.length) ? -1 : 1;
			});
			showQuestions(questions);
			break;
		default:
			showQuestions(questions);
	}
};

function filterQuestions(criteria) {
	const filtered = [];
	switch (criteria.toLowerCase()) {
		case "answered":
			questions.forEach(qs => {
				if (qs.answers.length != 0)
					filtered.push(qs);
			});
			showQuestions(filtered);
			break;
		case "unanswered":
			questions.forEach(qs => {
				if (qs.answers.length === 0)
					filtered.push(qs);
			});
			showQuestions(filtered);
			break;
		case "all":
			// fall
		default:
			showQuestions(questions);
	}
};

async function validateLoginForm(event) {
	event.preventDefault();

	const email = document.getElementById("email-log").value.trim();
	const pass = document.getElementById("password-log").value;
	//const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if ((pass != "") && (email != "")) {
		const payload = JSON.stringify({
			"email": email,
			"password": pass,
		});
		const [response, status] = await fetchHelper("http://localhost:3000/login", "POST", payload);
		if ((status >= 200) && (status < 400)) {
			localStorage.setItem("user", JSON.stringify(response.user));
			window.location.assign("../index.html");
		} else {
			alert("Email or Password isn't Correct.");
		}
	} else {
		alert("Please Fill All Fields Correctly to Login");
	}
};

async function validateRegisterForm(event) {
	event.preventDefault();

	const email = document.getElementById("email-reg").value.trim();
	const pass = document.getElementById("password-reg").value;
	const name = document.getElementById("fullname").value.trim();
	const bio = document.getElementById("bio").value.trim();
	const avatar = document.getElementById("avatar").value;
	//const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if ((pass != "") && (email != "") && (name != "") && (bio != "")) {
		const payload = JSON.stringify({
			"email": email,
			"password": pass,
			"fullName": name,
			"bio": bio,
			"avatar": avatar,
		});
		const [response, status] = await fetchHelper("http://localhost:3000/register", "POST", payload);
		if ((status >= 200) && (status < 400)) {
			localStorage.setItem("user", JSON.stringify(response.user));
			window.location.assign("../index.html");
		} else {
			alert("Email is already registered.");
		}
	} else {
		alert("Please Fill All Fields Correctly to Register");
	}
};

function checkUserLogin() {
	const userInfo = localStorage.getItem("user");
	if ((userInfo != undefined) && (userInfo != "")) {
		console.log(userInfo);
		window.location.assign("../index.html");
	}
}

async function validateNewQuestionForm(event) {
	event.preventDefault();

	const title = document.getElementById("title").value.trim();
	const desc = document.getElementById("details").value.trim();
	const tags = document.getElementById("tags").value.trim().split(",").map(t => t.trim());;
	const creatAt = new Date();
	var id, username;

	const user = JSON.parse(localStorage.getItem("user"));
	if (user) {
		id = user.id;
		username = user.fullName;
	} else {
		id = 1;
		username = "Anonymous";
	}

	if ((title != "") && (desc != "") && (tags.length != 0)) {
		const payload = JSON.stringify({
			"title": title,
			"description": desc,
			"tags": tags,
			"createdAt": creatAt,
			"answers": [],
			"answered": false,
			"author": {
				"id": id,
				"username": username
			}
		});
		const [response, status] = await fetchHelper("http://localhost:3000/questions", "POST", payload);
		if ((status >= 200) && (status < 400) && (response != undefined)) {
			window.location.assign("index.html");
		} else {
			alert("Somthing went wrong, try again.");
		}
	} else {
		alert("Please Fill All Fields Correctly to Post the Question.");
	}
};

// Helper Functions:

async function fetchHelper(url, method, payload) {
	var status;
	var request = new Request(url, {
		method: method,
	});
	if (method == "POST") {
		request = new Request(url, {
			method: method,
			body: payload,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		});
	}
	const res = await fetch(request)
		.then((response) => {
			if ((response.status >= 200) && (response.status < 500)) {
				status = response.status;
				return response.json();
			} /*else {
				throw new Error("JSON-server Error!");
			}*/
		})
		.catch((error) => {
			console.error(error);
		});

	return [res, status];
};

function np(num) { //numPadding
	return (num < 10) ? ("0" + num) : num;
};
