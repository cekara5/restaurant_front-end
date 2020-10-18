import React from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api, { getUser } from "../../api/api";
import { AddWorkingTimes } from "../../types/dto/AddWorkingTimes";
import { ApiResponseType } from "../../types/dto/ApiResponseType";
import { WorkingTime } from "../../types/dto/WorkingTime";
class DaysOfWeek {
    monday: WorkingTime;
    tuesday: WorkingTime;
    wednesday: WorkingTime;
    thursday: WorkingTime;
    friday: WorkingTime;
    saturday: WorkingTime;
    sunday: WorkingTime;
    constructor() {
        this.monday = new WorkingTime(1);
        this.tuesday = new WorkingTime(2);
        this.wednesday = new WorkingTime(3);
        this.thursday = new WorkingTime(4);
        this.friday = new WorkingTime(5);
        this.saturday = new WorkingTime(6);
        this.sunday = new WorkingTime(7);
    }
}
interface AddWorkingTimeState {
    restourantId: number;
    workingTimes: WorkingTime[];
    days: DaysOfWeek;
    workingTimeAdded: boolean;
    hours: string[];
    minutes: string[];
    isUserLoggedIn: boolean;
    errorMessage: string;
    validated: boolean;
}

export class AddWorkingTimeComponent extends React.Component {

    state: AddWorkingTimeState;

    constructor(props: Readonly<{}>) {
        super(props);
        const hours = [];
        for (let i = 0; i < 24; i++) {
            let hour = i < 10 ? '0' + i : i.toString();
            hours.push(hour);
        }

        this.state = {
            restourantId: 0,
            workingTimes: [],
            days: new DaysOfWeek(),
            workingTimeAdded: false,
            isUserLoggedIn: true,
            hours: hours,
            minutes: ['00', '30'],
            errorMessage: "",
            validated: false,
        };
    }

    render() {
        if (this.state.isUserLoggedIn === false) {
            return <Redirect to="/manager/login" />;
        }
        if (this.state.workingTimeAdded) {
            return (
                <Redirect
                    to={"/"}
                ></Redirect>
            );
        }
        return (
            <Container>
                <Alert
                    variant="danger"
                    className={this.state.errorMessage ? "" : "d-none"}
                >
                    {this.state.errorMessage}
                </Alert>
                <Form
                    noValidate
                    validated={this.state.validated}
                    onSubmit={this.handleSubmit}
                >
                    <Form.Group>
                        <Form.Label>Ponedeljak</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="monday_openingTime_hours"
                            value={this.state.days.monday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="monday_openingTime_mins"
                            value={this.state.days.monday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="monday_closingTime_hours"
                            value={this.state.days.monday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="monday_closingTime_mins"
                            value={this.state.days.monday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Utorak</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="tuesday_openingTime_hours"
                            value={this.state.days.tuesday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="tuesday_openingTime_mins"
                            value={this.state.days.tuesday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="tuesday_closingTime_hours"
                            value={this.state.days.tuesday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="tuesday_closingTime_mins"
                            value={this.state.days.tuesday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sreda</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="wednesday_openingTime_hours"
                            value={this.state.days.wednesday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="wednesday_openingTime_mins"
                            value={this.state.days.wednesday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="wednesday_closingTime_hours"
                            value={this.state.days.wednesday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="wednesday_closingTime_mins"
                            value={this.state.days.wednesday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Četvrtak</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="thursday_openingTime_hours"
                            value={this.state.days.thursday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="thursday_openingTime_mins"
                            value={this.state.days.thursday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="thursday_closingTime_hours"
                            value={this.state.days.thursday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="thursday_closingTime_mins"
                            value={this.state.days.thursday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Petak</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="friday_openingTime_hours"
                            value={this.state.days.friday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="friday_openingTime_mins"
                            value={this.state.days.friday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="friday_closingTime_hours"
                            value={this.state.days.friday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="friday_closingTime_mins"
                            value={this.state.days.friday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Subota</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="saturday_openingTime_hours"
                            value={this.state.days.saturday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="saturday_openingTime_mins"
                            value={this.state.days.saturday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="saturday_closingTime_hours"
                            value={this.state.days.saturday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="saturday_closingTime_mins"
                            value={this.state.days.saturday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nedelja</Form.Label>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="sunday_openingTime_hours"
                            value={this.state.days.sunday.openingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="sunday_openingTime_mins"
                            value={this.state.days.sunday.openingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>

                        :
                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="sunday_closingTime_hours"
                            value={this.state.days.sunday.closingTime.split(":")[0] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">hh</option>
                            {this.state.hours.map(this.singleHourOption)}
                        </Form.Control>

                        <Form.Control
                            as="select"
                            className={"option-choosetime"}
                            custom
                            id="sunday_closingTime_mins"
                            value={this.state.days.sunday.closingTime.split(":")[1] || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">mm</option>
                            {this.state.minutes.map(this.singleMinsOption)}
                        </Form.Control>

                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Sačuvati
                    </Button>
                </Form>
            </Container>
        );
    }

    componentWillMount() {
        this.getAllData();
    }

    getAllData() {
        console.log(getUser())
        const userId = getUser()?.id;
        api("manager/restourant/" + userId, "get").then((res: ApiResponseType) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                console.log("greska");
                return;
            }
            if (res.status === "ok") {
                this.putRestourantIdInState(res.data?.data.id);
            } else {
                console.log("greska");
            }
        });
    }

    handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            this.setFormValidate(true);
            return;
        }

        // punjenje niza radnog vremena za svaki dan; salje se na server
        const addWorkingTimes = new AddWorkingTimes();
        for (const day in this.state.days) {
            const workingTimeToAdd = (this.state.days as any)[day] as WorkingTime;
            workingTimeToAdd.restourantId = this.state.restourantId;
            addWorkingTimes.workingTimes.push(workingTimeToAdd);
        }
        console.log(addWorkingTimes);
        api("restourant/working-time/add", "post", addWorkingTimes).then((res: ApiResponseType) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
            }

            if (res.status === "ok") {
                if (res.data?.status === "error") {
                    this.setErrorMessage(res.data.message);
                } else {
                    this.setWorkingTimesAddedState(true);
                }
            } else if (res.status === "error") {
                this.setErrorMessage("Server error");
            }

        });
    };

    private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selecedtIdArray = event.target.id.split("_");
        const day = selecedtIdArray[0]; // monday/tuesday/wednesday...
        const time = selecedtIdArray[1]; // openingTime/closingTime
        const hoursOrMins = selecedtIdArray[2]; // hours/mins
        const newValue = event.target.value;
        const newWorkTime = (this.state.days as any)[day];
        if (hoursOrMins === "hours") {
            newWorkTime[time] = newValue + ":" + newWorkTime[time].split(":")[1];
        }
        else {
            newWorkTime[time] = newWorkTime[time].split(":")[0] + ":" + newValue;
        }
        const newDays = Object.assign(this.state.days, {
            [day]: newWorkTime
        })
        const newState = Object.assign(this.state, {
            days: newDays
        });
        console.log(event.target.value)
        console.log(newState)
        this.setState(newState);
    };

    private putRestourantIdInState(id: number) {
        const newState = Object.assign(this.state, {
            restourantId: id
        });
        this.setState(newState);
    }

    private setErrorMessage(errorMessage: string) {
        const newState = Object.assign(this.state, {
            errorMessage: errorMessage,
        });
        this.setState(newState);
    }

    private setFormValidate(validated: boolean) {
        const newState = Object.assign(this.state, {
            validated: validated,
        });
        this.setState(newState);
    }

    private setWorkingTimesAddedState(isAdded: boolean) {
        const newState = Object.assign(this.state, {
            workingTimesAdded: isAdded
        });
        this.setState(newState);
        console.log(newState)
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isUserLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    private singleMinsOption(min: string) {
        return <option value={min}>{min}</option>;
    }
    private singleHourOption(hour: string) {
        return <option value={hour}>{hour}</option>;
    }
}