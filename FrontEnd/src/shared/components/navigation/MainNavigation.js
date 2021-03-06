import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom";
import { URL } from "../../../constants";
import Button from "react-bootstrap/Button";
function MainNavigation(props) {
	const history = useHistory();

	const [user, setUser] = useState({});
	useEffect(() => {
		const getUser = async () => {
			// go into local storage to get the id for the current user
			// if theres no id for the user, then set the user to be an emtpy object
			// if theres user, we grab the user data by id from the backend and set the user to be the data
			const id = localStorage.getItem("_id");
			if (!id) {
				setUser({});
			} else {
				const res = await fetch(`${URL}/api/users/user/${id}`);
				const user = await res.json();
				setUser(user);
			}
		};
		getUser();
	}, []);

	// after user log out, we set the current user again to be emtpy
	// clear the id out of browser local storage
	// go back to the auth page
	const logout = () => {
		setUser({});
		localStorage.removeItem("_id");
		history.push("/auth");
	};

	return (
		<Navbar bg="light" expand="lg">
			{/*Use as={Link} here to change ReactJS Bootstrap NavBar Link to react Routing Based for Single Page Application*/}
			<Navbar.Brand as={Link} to="/">
				YourPlaces
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={NavLink} to="/">
						ALL USERS
					</Nav.Link>
					{user.email ? (
						<Nav.Link as={NavLink} to={`${user._id}/places`}>
							MY PLACES
						</Nav.Link>
					) : null}
					{user.email ? (
						<Nav.Link as={NavLink} to="/places/new">
							ADD PLACES
						</Nav.Link>
					) : null}

					{!user.email ? (
						<Nav.Link as={NavLink} to="/auth">
							LOGIN
						</Nav.Link>
					) : (
						<Button onClick={logout}>LOGOUT</Button>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainNavigation;
