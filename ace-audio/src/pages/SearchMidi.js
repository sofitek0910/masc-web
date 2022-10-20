import {
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetchData } from "utilities/helper/helper";
import NewHeader from "../modules/NewHeader";

const useStyles = makeStyles({
	table: {
		borderRadius: "0",
	},
	dropdown: {
		minWidth: "14rem",
	},
	patchBtn: {
		marginTop: "1rem",
		marginBottom: "1rem",
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},
	flexEnd: {
		display: "flex",
		justifyContent: "flex-end",
	},
	marginTop: {
		marginTop: "2rem",
	},
	marginBottom: {
		marginBottom: "2rem",
	},
	tableRowGray: {
		backgroundColor: "#f5f5f5",
	},
	titleRow: {
		fontSize: "1.5rem",
		backgroundColor: "#f5f5f5",
	},
	creator: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row-reverse",
	},
	searchRhythms: {
		display: "flex",
		flexDirection: "column",
	},
});
const Index = () => {
	const classes = useStyles();
	const { token } = useSelector((state) => state.dashboard);
	console.log(token);
	const [isFetching, setIsFetching] = useState(true);
	// Search Filters for dropdown
	const searchFilters = [
		{
			display: "o_sub",
			value: "o_sub",
		},
		{
			display: "rhythm",
			value: "rhythm",
		},
	];

	const [searchFilter, setSearchFilter] = useState("o_sub");
	const [searches, setSearches] = useState([]);

	//Fetching the midi search data.
	useEffect(() => {
		setIsFetching(true);
		const url = `https://masc-api.musicascode.com/mc/midi/search?page=1`;
		getFetchData({ url, token })
			.then((res) => res.json())
			.then((res) => {
				setSearches(res);
				setIsFetching(false);
			});
	}, []);

	// Get search filter selected from dropdown
	const handleSearchFilterChange = (event) => {
		setSearchFilter(event.target.value);
	};
	return (
		<div>
			<NewHeader />
			<Container maxWidth="xl">
				<Grid container>
					<Grid item xs={12} className={classes.patchBtn}>
						<Link to={`/midi/NEW/editor`}>
							<Button variant="primary">New MIDI</Button>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.marginBottom}>
						<Typography variant="h4">Search MIDI</Typography>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.flexEnd}>
						<FormControl className={classes.dropdown}>
							<InputLabel id="patch-search">Search Filters</InputLabel>
							<Select
								labelId="midi-search"
								id="midi-search"
								value={searchFilter}
								label="searchFilter"
								onChange={handleSearchFilterChange}
							>
								{searchFilters.map((filter) => (
									<MenuItem key={filter.value} value={filter.value}>
										{filter.display}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper} className={classes.table}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell
											align="left"
											className={classes.titleRow}
											colSpan={4}
										>
											{searchFilter}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>GUID</TableCell>
										<TableCell align="center">Rhythms</TableCell>
										<TableCell align="center">Creator</TableCell>
										<TableCell align="center">Date</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{isFetching ? null : searches.length !== 0 &&
									  searches !== null &&
									  searches !== undefined ? (
										searches.midis.map((search, index) => (
											<TableRow
												className={index % 2 === 0 ? classes.tableRowGray : ""}
												key={index}
											>
												<TableCell align="th">
													<Link to={`/midi/${search.guid}`}>{search.guid}</Link>
												</TableCell>
												<TableCell align="center">
													<div className={classes.searchRhythms}>
														{search.rhythms.map((rhythm) => {
															return (
																<>
																	<span>{rhythm.rhythm}</span>
																</>
															);
														})}
													</div>
												</TableCell>
												<TableCell align="center" className={classes.creator}>
													<div
														className="midiSearch-o_name"
														style={{ marginLeft: "10px" }}
													>
														{search.o_name}
													</div>
													<div className="midiSearch-o_avatar">
														<img
															src={`${
																process.env.REACT_APP_MINIO_HOST +
																process.env.REACT_APP_MINIO_BUCKET_AVATAR +
																search.o_avatar
															}.jpg`}
															alt="avatar"
															style={{
																width: "40px",
																height: "40px",
																borderRadius: "50%",
															}}
														/>
													</div>
												</TableCell>
												<TableCell align="center">{search.created}</TableCell>
											</TableRow>
										))
									) : (
										<TableCell component="th" scope="row">
											No midi search Found
										</TableCell>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Index;
