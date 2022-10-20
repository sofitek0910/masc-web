import { alpha, styled } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/feather/style.css";
import avatarImageDefault from "../../assets/img/avatar_default_image.png";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(4),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

const Index = () => {
	const { user, myDecodedToken } = useSelector((state) => state.dashboard);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorE2, setAnchorE2] = React.useState(null);
	const [anchorE3, setAnchorE3] = React.useState(null);
	const open1 = Boolean(anchorEl);
	const open2 = Boolean(anchorE2);
	const open3 = Boolean(anchorE3);
	const [avatarImage, setAvatarImage] = useState("");
	const [userName, setUserName] = useState("");
	const MINIO_HOST = process.env.REACT_APP_MINIO_HOST;
	const BUCKET_AVATAR = process.env.REACT_APP_MINIO_BUCKET_AVATAR;

	const handleSystemClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleSystemClose = () => {
		setAnchorEl(null);
	};
	const handleDiscordClick = (event) => {
		setAnchorE2(event.currentTarget);
	};
	const handleDiscordClose = () => {
		setAnchorE2(null);
	};

	const handleAccountClick = (event) => {
		setAnchorE3(event.currentTarget);
	};
	const handleAccountClose = () => {
		setAnchorE3(null);
	};

	useEffect(() => {
		if (myDecodedToken !== null) {
			if (myDecodedToken.discord_avatar === undefined) {
				setAvatarImage(avatarImageDefault);
			} else {
				setAvatarImage(
					`${MINIO_HOST}${BUCKET_AVATAR}/${myDecodedToken.discord_avatar.slice(
						0,
						2
					)}/${myDecodedToken.discord_avatar.slice(2, 4)}/${
						myDecodedToken.discord_avatar
					}.jpg`
				);
			}
			setUserName(
				myDecodedToken.preferred_username
					.slice(0, myDecodedToken.preferred_username.indexOf("#"))
					.toUpperCase()
			);
		}
	}, [myDecodedToken]);

	const { keycloak } = useKeycloak();

	const onLogout = () => {
		keycloak.logout();
		window.localStorage.removeItem("idToken");
		window.localStorage.removeItem("refreshToken");
		window.localStorage.removeItem("token");
		window.localStorage.removeItem("session-token");
	};

	return (
		<Navbar expand="lg" sticky="top" className="newHeader">
			<Navbar.Brand href="/search/audio" className="mx-2">
				<img
					src="/static/logo-rec-500px.png"
					style={{ width: "100px" }}
					alt="logo"
					title="logo"
				/>
			</Navbar.Brand>
			<Nav.Item className="mx-1">
				<Link to="/search/audio">
					<i className="ft-music"></i>AUDIO
				</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/pattern">PATTERN</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/plugin">PLUGIN</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/patch">PATCH</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/midi">MIDI</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/rhythm">RHYTHM</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/transition">TRANSITION</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Link to="/search/sequence">SEQUENCE</Link>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Button
					id="system-menu"
					aria-controls={open1 ? "system-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open1 ? "true" : undefined}
					variant="contained"
					disableElevation
					style={{ backgroundColor: "transparent" }}
					onClick={handleSystemClick}
					endIcon={<KeyboardArrowDownIcon />}
				>
					SYSTEM
				</Button>
				<StyledMenu
					id="system-menu"
					MenuListProps={{
						"aria-labelledby": "system-menu",
					}}
					anchorEl={anchorEl}
					open={open1}
					onClose={handleSystemClose}
					style={{ marginTop: "1.875rem", marginLeft: "4rem" }}
				>
					<MenuItem onClick={handleSystemClose}>
						<a href="https://docs.musicascode.com" className="dropdownItem">
							Docs
						</a>
					</MenuItem>
					<MenuItem onClick={handleSystemClose}>
						<a href="https://status.musicascode.com" className="dropdownItem">
							Status
						</a>
					</MenuItem>
				</StyledMenu>
			</Nav.Item>
			<Nav.Item className="mx-1">
				<Button
					id="discord-menu"
					aria-controls={open2 ? "discord-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open2 ? "true" : undefined}
					variant="contained"
					style={{ backgroundColor: "transparent" }}
					disableElevation
					onClick={handleDiscordClick}
					endIcon={<KeyboardArrowDownIcon />}
				>
					DISCORD
				</Button>
				<StyledMenu
					id="discord-menu"
					MenuListProps={{
						"aria-labelledby": "discord-menu",
					}}
					anchorEl={anchorE2}
					open={open2}
					onClose={handleDiscordClose}
					style={{ marginTop: "1.875rem", marginLeft: "4rem" }}
				>
					<MenuItem onClick={handleDiscordClose}>
						<a
							href="https://discord.com/oauth2/authorize?client_id=690930989052067850&scope=bot&permissions=66321471"
							className="dropdownItem"
						>
							Invite Our Bot
						</a>
					</MenuItem>
					<MenuItem onClick={handleDiscordClose}>
						<a href="https://discord.gg/3ve6Ue6" className="dropdownItem">
							Join Our Channel
						</a>
					</MenuItem>
				</StyledMenu>
			</Nav.Item>
			{!user ? (
				<Nav.Item className="ms-auto">
					<Nav.Link href="/login">Login</Nav.Link>
				</Nav.Item>
			) : (
				<>
					<Nav.Item
						className="AccountUserInfo"
						style={{ justifySelf: "end", marginRight: "30px" }}
					>
						<Button
							id="account-button"
							aria-controls={open3 ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open3 ? "true" : undefined}
							onClick={handleAccountClick}
						>
							<img
								src={avatarImage}
								alt="user_avatar"
								style={{
									width: "1.875rem",
									height: "1.875rem",
									borderRadius: "50%",
									marginRight: "0.5rem",
								}}
							/>
							{userName}
						</Button>
						<Menu
							id="account-menu"
							anchorEl={anchorE3}
							open={open3}
							MenuListProps={{
								"aria-labelledby": "account-button",
							}}
							style={{ marginTop: "2rem", marginLeft: "6rem" }}
							onClose={handleAccountClose}
						>
							<MenuItem>
								<Link to={"/pattern/NEW/editor"} className="accountUser">
									Pattern Editor
								</Link>
							</MenuItem>
							<MenuItem>
								<Link to={"/settings"} className="accountUser">
									Settings
								</Link>
							</MenuItem>
							<MenuItem>
								<Link
									to={`/search/audio`}
									className="accountUser"
									onClick={onLogout}
								>
									Logout
								</Link>
							</MenuItem>
						</Menu>
					</Nav.Item>
				</>
			)}
		</Navbar>
	);
};

export default Index;
