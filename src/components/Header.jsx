import React, { useContext } from "react";
import { CartContext } from "../App";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import { Avatar, List, ListItem } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Setting from "./Setting";
import { Link, useLocation } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';
import Login from './Login';



export default function Header(props) {
	const urlTokens = useLocation().pathname.split("/");
	let { cartItems } = useContext(CartContext);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	

	const StyledBadge = withStyles((theme) => ({
		badge: {
			right: -3,
			top: 13,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
		},
	}))(Badge);
	
	return (
		<header className="m-navbar py-2 px-3">
			<ul className="left-nav"></ul>
			<ul className="right-nav">
				<li>
					<IconButton aria-label="cart">
						<StyledBadge badgeContent={cartItems.length} color="secondary">
							<ShoppingCartIcon />
						</StyledBadge>
					</IconButton>
				</li>
				<li>
					<Avatar onClick={handleClick}>MK</Avatar>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}>
						<List>
						{
							NavbarLinks.map(link =>( 
								<Link to={`/dashboard${link.path}`} key={link.id}>
									<div className={`navbar-links ${
										urlTokens.includes(link.path) ? "active" : ""
									}`}>   
									</div>
									<div className={`navbar-links`}>
										<h4>{link.icon}</h4>
										<h5>{link.label}</h5>
									</div>
								</Link>
							))
            			}
						</List>
					</Popover>
	
				</li>
			</ul>
		</header>
	);
}
