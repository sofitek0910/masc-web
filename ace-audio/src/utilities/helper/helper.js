import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { isEdge } from "react-flow-renderer";

let axiosIns = null;

export const useAxios = (baseURL) => {
	const [keycloak, initialized] = useKeycloak();
	const [axiosInstance, setAxiosInstance] = useState({});

	useEffect(() => {
		const instance = axios.create({
			baseURL,
			headers: {
				Authorization: !process.env.IS_DEVELOPED
					? initialized
						? `Bearer ${keycloak.token}`
						: undefined
					: `Bearer ${process.env.TOKEN}`,
			},
		});

		setAxiosInstance({ instance });
		if (!axiosIns) axiosIns = { instance };
		return () => {
			setAxiosInstance({});
		};
	}, [baseURL, initialized, keycloak, keycloak.token]);

	return axiosInstance.instance;
};

export const getAxiosInstance = () => axiosIns;

export const copyToClipBoard = (string) => {
	const dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = string;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
};

export const getQueryString = (params) => {
	const listUnNull = Object.keys(params).filter(
		(key) => params[key] && params[key] !== null
	);
	return listUnNull.map((key) => key + "=" + params[key]).join("&");
};

// export const getNodeById = (id, nodes) => nodes.find((el) => el.id === id);

export const canConnectNodes = (params, nodes) => {
	const { target, targetHandle, sourceHandle } = params;

	if (sourceHandle === "midi") {
		// midi connect only to plugin_target_top
		return (
			targetHandle === "plugin_target_top" &&
			nodes.some(
				(el) => el.target !== target && el.targetHandle !== targetHandle
			)
		);
	}

	if (sourceHandle === "patch") {
		// patch connect only to plugin_target_bottom &&
		return (
			targetHandle === "plugin_target_bottom" &&
			nodes.some(
				(el) => el.target !== target && el.targetHandle !== targetHandle
			)
		);
	}

	if (sourceHandle === "plugin_output_right") {
		// plugin connect only to the input of other plugin or the channel input
		return (
			targetHandle === "plugin_target_left" ||
			targetHandle === "output_target_left"
		);
	}
};

export const isAudioRequestValid = (nodes) => {
	let sources = [],
		edges = [];
	// types = [];

	nodes.map((elem) => {
		if (Object.keys(elem).includes("source")) {
			sources.push(elem.source);
		}

		if (Object.keys(elem).includes("target")) {
			if (isEdge(elem)) edges.push(elem.target);
		}

		// node types in array
		// if (Object.keys(elem).includes("type")) {
		//   if (Object.keys(nodeTypes).includes(elem.type)) types.push(elem.type);
		// }
	});

	// sources array must be unique & number of edges === 6
	if (_.uniq(sources).length === 6 && edges.length === 6) {
		return true;
		// TODO: check if all midi saved
		// let checks = _.countBy(types);

		// let midiWithGuidsCount = nodes.filter(
		//   (node) => node.type === "midi" && node.data.guid !== ""
		// ).length;

		// check plugins name
		// let pluginWithNames = nodeElements.filter(node=>node.type === "plugin" && node.data)

		// // if (_.isEqual(validFactoryObject, _.countBy(types))) {
	} else {
		return false;
	}
};

export const getFetchData = async ({ url, token }) => {
	return await fetch(url, {
		method: "get",
		headers: new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "*/*",
		}),
	});
};

export const axiosFetch = async ({ url, token }) => {
	const resp = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log(resp);
	return;
};

export const makeid = (length) => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
