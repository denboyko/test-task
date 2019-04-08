import React from "react"
import withStyles from "@material-ui/core/styles/withStyles";
import {login} from "../api/Auth";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";

const styles = (theme) => ({
    title: {
        color: "#3A3F62",
        margin: 0,
        fontSize: "18px",
        fontWeight: "500",
        padding: 20,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    inputHolder: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: 10,
        fontSize: 14,
        outline: "none",
        borderRadius: 5,
        border: "1px solid grey",
    }
});

class Login extends React.Component {
    handleLogin = () => {
        login(this.state.username, this.state.password, this.props.checkAuth);
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(field, value) {
        this.setState({[field]: value});
    }

    render() {
        const {classes} = this.props;
        if (this.props.redirect) {
            return <Redirect to="/"/>
        }
        return (
            <div className={classes.container}>
                <h3 className={classes.title}>Login, please...</h3>
                <div className={classes.inputHolder}>
                    <label className="input_label" htmlFor="username">Username</label>
                    <input type="text"
                           placeholder="Type your username..."
                           id="username"
                           className={classes.input}
                           onChange={(event) => this.handleChange("username", event.target.value)}
                           value={this.state.username}/>
                </div>
                <div className={classes.inputHolder}>
                    <label className="input_label" htmlFor="password">Password</label>
                    <input type="text"
                           className={classes.input}
                           placeholder="Type your password..."
                           id="password"
                           onChange={(event) => this.handleChange("password", event.target.value)}
                           value={this.state.password}/>
                </div>
                <Button variant="contained" color="primary" onClick={this.handleLogin}>Create</Button>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Login);