import React from "react";
import Cookies from "js-cookie";
import * as axios from "axios";
import {Button, Form} from "react-bootstrap";
import {useSelector} from "react-redux";


const SearchButton = ({
                          setSearchPattern
                      }) => {
    const {token} = useSelector((state) => state.dashboard)

    function handleSearchButtonClick() {
        if (document.getElementById('custom-switch').checked) {
            const instance = axios.create({
                baseURL: 'https://masc-api.musicascode.com',
                timeout: 1000,
                headers: {Authorization: `Bearer ${token}`}
            })
            instance.get(`/mc/pattern/search/owned`).then(res => {
                setSearchPattern(res.data.pattern_search)
            })
        } else {
            const instance = axios.create({
                baseURL: 'https://masc-api.musicascode.com',
                timeout: 1000,
                headers: {Authorization: `Bearer ${token}`}
            })
            instance.get(`/mc/pattern/search/tempo/126.25`).then(res => {
                setSearchPattern(res.data.pattern_search)
            })
        }
    }

    return (

        <span>
            <Form className="form-check form-switch"
                  style={{
                      color: "white",
                      display: "inline-block",
                  }}>
                <Form.Check
                    type="checkbox"
                    id="custom-switch"
                    label="Public/Owned"
                    variant="secondary"
                />
            </Form>
            <span>
                <Button variant="light"
                        size="sm"
                        style={{
                            margin: "5px"
                        }}
                        onClick={() => {
                            handleSearchButtonClick()
                        }}>
                Search
            </Button>
            </span>
        </span>


    )
}
export default SearchButton;