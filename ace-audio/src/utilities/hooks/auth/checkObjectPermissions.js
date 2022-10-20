import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useState from "react-usestateref";
import { permissionObjects } from "../../../constants/permissionObjects";


const useCheckObjectPermission = (asset) => {
    const {myDecodedToken} = useSelector((state) => state.dashboard);
    const [keycloak] = useKeycloak();

    var [objectState,setObject,objectRef]=useState('anonymous')
    var [visibleState,setVisible,visibleRef]=useState(true)
    function increment(){
        if (keycloak.authenticated) {
            setObject("authorized")
        }else if (!keycloak.authenticated) {
            setObject('anonymous')
        } else if (myDecodedToken.groups[0] === 'web-dev') {
            setObject('developer')
        }

        // Actually check
        let object = Object.keys(permissionObjects)
        for (let j = 0; j < object.length; j++) {

            let objectEnding = object[j];
            let objectPermission = permissionObjects[objectEnding];
            if (object[j] === asset) {
                
                for (let i = 0; i < objectPermission.length; i++) {
                    if (objectPermission[i].visibility === true) {
                        if (objectPermission[i].url === window.location.pathname &&
                            objectPermission[i].permission === objectRef.current) {
                            return {"permissionObject": 'anonymous',visible: visibleRef.current}
                        } else {
                            return {"permissionObject": 'anonymous',visible: visibleRef.current}
                        }
                    } else if (objectPermission[i].visibility === false) {
                        if (objectPermission[i].url === window.location.pathname &&
                            objectPermission[i].permission === objectRef.current) {
                            return {"permissionObject": 'anonymous',visible: visibleRef.current}
                        } else {
                            return {"permissionObject": 'anonymous',visible: visibleRef.current}
                        }
                    }
                }
            }

            else {
                console.log('Something wrong with Permission Object')
            }
        }
    }
    useEffect(()=>{
        increment()

    },[])
    return {objectState}
}
    // setTokenGroup('developers')
    // console.log('TokeGroup')
    //     console.log(tokenGroup)
    // console.log('Developers')
    // console.log(objectState)
    // setObjectState('Anonymous')
    // console.log('New objectstate')
    // console.log(objectState)
    //

    // function checkPermission(asset) {

    //     if (myDecodedToken.groups[0] === 'web-dev') {
    //
    //         // console.log(objectState)
    //         setObjectState((prevState) => ({
    //             ...prevState,
    //             permission: "developers",
    //             visible: true,
    //         }))
    //     }
    //     else if (keycloak.authenticated) {
    //
    //         // setTokenGroup("authorized")
    //         console.log(objectState)
    //         setObjectState((prevState) => ({
    //             ...prevState,
    //             permission: "authorized",
    //             visible: true,
    //         }))
    //     }else if (!myDecodedToken.groups[0]) {
    //
    //         console.log(objectState)
    //         // // setTokenGroup("anonymous")
    //         setObjectState((prevState) => ({
    //             ...prevState,
    //             permission: "anonymous",
    //             visible: true,
    //         }))
    //     } else {
    //
    //         setObjectState((prevState) => ({
    //             ...prevState,
    //             permission: "anonymous",
    //             visible: true,
    //         }))
    //         // console.log(objectState)
    //         // setTokenGroup(prevState => ({
    //         //     ...prevState,
    //         //     "anonymous"
    //         // }))
    //     }
    //
    //     // Actually check
    //     let object = Object.keys(permissionObjects)
    //     for (let j = 0; j < object.length; j++) {
    //         let objectEnding = object[j];
    //         // console.log(eval(objectEnding))
    //         let objectPermission = permissionObjects[objectEnding];
    //
    //         // console.log('sdfsdf')
    //         // console.log(objectPermission)
    //
    //         if (object[j] === asset) {
    //             for (let i = 0; i < objectPermission.length; i++) {
    //                 console.log(tokenGroup)
    //
    //                 if (objectPermission[i].visibility === true) {
    //                     if (objectPermission[i].url === window.location.pathname &&
    //                         objectPermission[i].permission === tokenGroup) {
    //
    //                         setObjectState((prevState) => ({
    //                             ...prevState,
    //                             permission: tokenGroup,
    //                             visible: true,
    //                         }))
    //                     } else {
    //
    //                         setObjectState((prevState) => ({
    //                             ...prevState,
    //                             permission: tokenGroup,
    //                             visible: true,
    //                         }))
    //                     }
    //                 } else if (objectPermission[i].visibility === false) {
    //
    //                     if (objectPermission[i].url === window.location.pathname &&
    //                         objectPermission[i].permission === tokenGroup) {
    //
    //                         setObjectState((prevState) => ({
    //                             ...prevState,
    //                             permission: tokenGroup,
    //                             visible: false,
    //                         }))
    //                     } else {
    //
    //                         setObjectState((prevState) => ({
    //                             ...prevState,
    //                             permission: tokenGroup,
    //                             visible: false,
    //                         }))
    //                     }
    //                 }
    //             }
    //         }
    //
    //         else {
    //             console.log('Something wrong with Permission Object')
    //         }
    //     }
    // }
    // useDebugValue(() => {
    //   checkPermission(asset)
    // }, [])
//     ;
//     return {objectState, objectVisible};
// }

export default useCheckObjectPermission;