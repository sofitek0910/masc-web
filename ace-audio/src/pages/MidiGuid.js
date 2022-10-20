import "../styles/midiguid.css";
import {
	Box,
	Container,
	Grid,
	Tab,
	Tabs,
	Typography,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AceEditor from "../components/AceEditor";

import PropTypes from "prop-types";
import React, { memo, useEffect, useRef, useState } from "react";
import PianoRoll from "react-piano-roll";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewHeader from "../modules/NewHeader";
import { getFetchData } from "utilities/helper/helper";
import axios from "axios";
import { PlayCircleFilled, Stop } from "@material-ui/icons";

// import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
// import "react-piano/dist/styles.css";
// import ReactSoundFontPlayer from "react-soundfont-player";
// import SoundfontProvider from "components/SoundfontProvider";

const useStyles = makeStyles({
	justifyCenter: {
		display: "flex",
		justifyContent: "center",
	},
	marginTop: {
		marginTop: "2rem",
	},
	titleRow: {
		fontSize: "1.5rem",
		backgroundColor: "#f5f5f5",
		width: "100rem",
	},
	marginBottom: {
		marginBottom: "2rem",
	},
	pianoWrapper: {
		display: "inline-flex",
		borderTop: "5px solid #dddddd",
		backgroundColor: "#dddddd",
		padding: "0px 10px 10px 10px",
	},
});

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const MidiGuid = () => {
	const classes = useStyles();
	const { guid } = useParams();
	const { token } = useSelector((state) => state.dashboard);
	const [isFetching, setIsFetching] = useState(true);
	const [midiData, setMidiData] = useState([]);
	const [midiPiano, setMidiPiano] = useState([]);
	const [midiJson, setMidiJson] = useState({});
	const [midiCVS, setMidiCVS] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);

	// const firstNote = MidiNumbers.fromNote("c3");
	// const lastNote = MidiNumbers.fromNote("f5");
	// const keyboardShortcuts = KeyboardShortcuts.create({
	// 	firstNote: firstNote,
	// 	lastNote: lastNote,
	// 	keyboardConfig: KeyboardShortcuts.HOME_ROW,
	// });

	// webkitAudioContext fallback needed to support Safari
	// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	// const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

	const playbackRef = useRef();
	const [value, setValue] = React.useState(0);

	window.addEventListener("keydown", ({ key }) => {
		if (playbackRef.current === undefined) {
			return;
		} else if (key === " ") {
			playbackRef.current.toggle();
		} else if (key === "Enter") {
			playbackRef.current.seek("0:0:0");
		}
	});

	const getMidiData = async (url) => {
		const { data } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		setMidiData(data);
		setMidiJson(data.midijson);
		setMidiCVS(data.py_midicsv);
	};

	useEffect(() => {
		setIsFetching(true);
		const url = `https://masc-api-jgen.musicascode.com/midi/${guid}/pianoroll`;
		getFetchData({ url, token })
			.then((res) => res.json())
			.then((res) => {
				setMidiPiano(res);
			});

		getMidiData(`https://masc-api-jgen.musicascode.com/midi/${guid}`);

		setIsFetching(false);
	}, [guid]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const Piano = memo(() => {
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<PianoRoll
					width={900}
					height={400}
					zoom={10}
					resolution={2}
					gridLineColor={0x333333}
					blackGridBgColor={0x1e1e1e}
					whiteGridBgColor={0x282828}
					noteData={midiPiano}
					// 			  noteData={[
					//   ["0:0:0", "F5", ""],
					//   ["0:0:0", "C4", "2n"],
					//   ["0:0:0", "D4", "2n"],
					//   ["0:0:0", "E4", "2n"],
					//   ["0:2:0", "B4", "4n"],
					//   ["0:3:0", "A#4", "4n"],
					//   ["0:0:0", "F2", ""],
					// ]}
					ref={playbackRef}
				/>
			</div>
		);
	});

	const handlePlay = () => {
		setIsPlaying(!isPlaying);
		playbackRef.current.toggle();
	};

	const handleStop = () => {
		setIsPlaying(false);
		playbackRef.current.pause();
		playbackRef.current.seek("0:0:0");
	};

	return (
		<>
			<NewHeader />
			<Container>
				<Grid container spacing={3} style={{ marginTop: "1rem" }}>
					{midiData.length === 0 && !isFetching ? (
						<Grid item xs={12} sx={{ width: "100%" }}>
							<Typography align="center">Midi: {guid} Not Found!</Typography>
						</Grid>
					) : (
						<>
							<Grid
								item
								xs={12}
								sx={{ width: "100%" }}
								display={"flex"}
								justifyContent={"center"}
							>
								<Typography
									align="center"
									variant="h5"
									className={classes.marginBottom}
								>
									Midi {guid}
								</Typography>
								<Piano />
								{/* <midi-player
									src="https://magenta.github.io/magenta-js/music/demos/melody.mid"
									sound-font
									visualizer="#myPianoRollVisualizer"
								></midi-player>

								<midi-visualizer
									type="piano-roll"
									id="myPianoRollVisualizer"
									src="https://magenta.github.io/magenta-js/music/demos/melody.mid"
								></midi-visualizer> */}
							</Grid>
							<Grid item xs={12}></Grid>
							<Grid item xs={12} sx={{ width: "100%" }}>
								{isFetching ? (
									<Typography align="center">Loading...</Typography>
								) : (
									<>
										<Box
											sx={{
												borderBottom: 1,
												borderColor: "divider",
												display: "flex",
												justifyContent: "center",
											}}
										>
											<Tabs
												value={value}
												onChange={handleChange}
												aria-label="basic tabs example"
											>
												{/* <Tab label="Piano Roll" {...a11yProps(0)} /> */}
												<Tab label="JSON" {...a11yProps(0)} />
												<Tab label="CVS" {...a11yProps(1)} />
											</Tabs>
										</Box>
										{/* <TabPanel value={value} index={0}>
											<div>WIP</div>
										</TabPanel> */}
										<TabPanel value={value} index={0}>
											<AceEditor
												wrapEnabled={true}
												readOnly={true}
												mode="json"
												theme={"monokai"}
												value={JSON.stringify(midiJson, null, "\t")}
												height={"25rem"}
												width={"50rem"}
											/>
										</TabPanel>
										<TabPanel value={value} index={1}>
											<AceEditor
												wrapEnabled={true}
												readOnly={true}
												value={JSON.stringify(midiCVS, null, "\t")}
												mode="json"
												theme={"monokai"}
												height={"25rem"}
												width={"50rem"}
											/>
										</TabPanel>
									</>
								)}
							</Grid>
							{/* <Grid item xs={12}>
								<TableContainer component={Paper} className={classes.table}>
									<Table className={classes.table} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell
													align="left"
													className={classes.titleRow}
													colSpan={5}
												>
													Midi Details
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>Creator</TableCell>
												<TableCell align="center">Details</TableCell>
											</TableRow>
										</TableHead>
										<TableBody></TableBody>
									</Table>
								</TableContainer>
							</Grid> */}
						</>
					)}
				</Grid>
			</Container>
		</>
	);
};

export default MidiGuid;
