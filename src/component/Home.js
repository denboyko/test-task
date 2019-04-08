import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {searchByName} from "../api/Employee";
import Button from "@material-ui/core/Button";
import EmployeeTable from "./EmployeeTable";
import Modal from "./utils/Modal";
import EmployeeModal from "./EmployeeModal";
import {logout} from "../api/Auth";
// import Pagination from "./utils/Pagination";


const styles = (theme) => ({
    header: {
        position: "relative",
        display: "flex",
        justifyContent: "flex-end",
        height: 80,
    },
    title: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: theme.palette.primary.headerText,
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "120%",
    },
    logoutButton: {
        height: "100%",
        padding: "0 20px",
        color: "#1658F3",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "none",
        fontFamily: "'Lato', sans-serif",
    },
    content: {
        padding: 50,
    },
    noEmployee: {
        textAlign: "center",
        padding: 20,
        color: "grey",
    }
});

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            employees: [],
            openModal: false,
            search: "",
            perPage: 10,
            count: 10,
        };
    }

    componentDidMount() {
        this.searchEmployees();
    }

    searchEmployees() {
        searchByName(this.state.search, this.state.page, this.state.perPage, (employees) => this.setState({employees}));
    }

    handleSearch(search) {
        this.setState({search}, () => this.searchEmployees());
    }

    openModal(id, readOnly) {
        this.setState({openModal: true, employeeId: id, readOnly});
    }

    closeModal() {
        this.setState({openModal: false});
    }

    onCreate() {
        this.setState({openModal: false}, () => this.searchEmployees());
    }

    handleChangePage(page) {
        this.setState({page}, () => this.searchEmployees());
    }

    handleCreate() {
        this.openModal();
    }

    handleView(id) {
        this.openModal(id, true);
    }

    handleEdit(id) {
        this.openModal(id);
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div className={classes.header}>
                    <h4 className={classes.title}>Employee management</h4>
                    <Button className={classes.logoutButton}
                            onClick={() => logout(this.props.checkAuth)}>Logout</Button>
                </div>

                <div className={classes.content}>
                    <div className="container">
                        <div>
                            <p>Search</p>
                            <input className="search"
                                   placeholder="Type employee name..."
                                   value={this.state.search}
                                   onChange={(event) => this.handleSearch(event.target.value)}
                            />
                        </div>

                        <div>
                            <Button variant="contained" color="primary" onClick={() => this.handleCreate()}>Create a new
                                employee</Button>
                        </div>
                    </div>
                    {this.state.employees.length > 0 ?
                        <div>
                            <EmployeeTable handleView={(id) => this.handleView(id)}
                                           handleEdit={(id) => this.handleEdit(id)}
                                           reload={() => this.searchEmployees()}
                                           employees={this.state.employees}/>
                            {/*<Pagination*/}
                            {/*page={this.state.page}*/}
                            {/*rowsPerPage={this.state.perPage}*/}
                            {/*count={this.state.count}*/}
                            {/*onChangePage={(event, value) => this.handleChangePage(value)}*/}
                            {/*/>        ]*/}
                        </div> :
                        <p className={classes.noEmployee}>There is no employees yet.</p>}
                </div>

                <Modal
                    open={this.state.openModal}
                    onClose={() => this.closeModal()}
                >
                    <EmployeeModal employeeId={this.state.employeeId}
                                   readOnly={this.state.readOnly}
                                   onCreate={() => this.onCreate()}
                                   onClose={() => this.closeModal()}/>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Home);