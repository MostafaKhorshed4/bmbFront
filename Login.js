const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');

//registerBtn.addEventListener('DOMContentLoaded', (e) => {
//	e.preventDefault();
//	const name = document.getElementById('name').value;
//	const email = document.getElementById('email').value;
//	const password = document.getElementById('password').value;
//	// You can add your own code here to register the new customer
//	console.log(`New customer registered: ${name}, ${email}, ${password}`);
//});

loginForm.addEventListener('submit', e => {
	e.preventDefault();
	const name = document.getElementById('loginemail').value;
	const password = document.getElementById('loginpassword').value;
	const loginobj = {
		name,
		password
	};
	// Make a request to the login API using fetch
	fetch('https://localhost:44353/api/Customer/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(loginobj)
	})
		.then(response => {
			if (response.ok) {
				response.json().then(data => {
					const token = data.token;
					const customer = data.customerId;
					localStorage.setItem('token', token);
					localStorage.setItem('customer', customer);
					window.location.href = 'Order.Html';
				});
			} else {
				// Login failed, show error message
				window.location.href = 'Order.Html';
				alert('Login failed. Please try again.');

			}
		});
});
registerForm.addEventListener('submit', e => {
	e.preventDefault();

	const name = document.getElementById('name').value;
	const mail = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const registerobj = {
		name ,
		mail ,
		password 
	};
	// Make a request to the login API using fetch
	fetch('https://localhost:44353/api/Customer/Registration', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(registerobj)
	})
		.then(response => {
			if (response.ok) {
				// Login successful, redirect to dashboard or home page
				window.location.href = '#';
			} else {
				// Login failed, show error message
				alert('Login failed. Please try again.');

			}
		});
});

	//document.getElementById('register-link').addEventListener('click', () => {
	//	registerForm.classList.add('active');
	//	loginForm.classList.remove('active');
	//});
	document.addEventListener('DOMContentLoaded', function () {
		const registerLink = document.getElementById('register-link');
		const registerForm = document.getElementById('register-form');
		const loginLink = document.getElementById('login-link');
		const loginForm = document.getElementById('login-form');

		registerLink.addEventListener('click', function () {
			registerForm.style.display = 'block';
			loginForm.style.display = 'none';
		});

		loginLink.addEventListener('click', function () {
			loginForm.style.display = 'block';
			registerForm.style.display = 'none';
		});
	});

