import React from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api from "../../api/api";
import { ApiResponseType } from "../../types/dto/ApiResponseType";
import { AddRestaurantType } from "../../types/dto/AddRestaurantType";
import { CityType } from "../../types/dto/CityType";


interface AddRestaurantState {
    restaurant: AddRestaurantType;
    cities: CityType[];
    restaurantAdded: boolean;
    restaurantAddedName: string;
    isUserLoggedIn: boolean;
    errorMessage: string;
    validated: boolean;
}
export class AddRestaurantComponent extends React.Component {
    state: AddRestaurantState;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            restaurant: new AddRestaurantType(),
            cities: [],
            restaurantAdded: false,
            restaurantAddedName: "",
            isUserLoggedIn: true,
            errorMessage: "",
            validated: false,
        };
    }

    render() {
        if (this.state.isUserLoggedIn === false) {
            return <Redirect to="/manager/login" />;
        }
        if (this.state.restaurantAdded) {
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
                        <Form.Label>Ime</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ime"
                            id="name"
                            value={this.state.restaurant.name}
                            onChange={this.formInputChanged}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Polje ne sme biti prazno.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            as="select"
                            custom
                            id="cityId"
                            value={this.state.restaurant.cityId || ""}
                            onChange={this.formInputChanged}
                            required
                        >
                            <option value="">Izaberite grad</option>
                            {this.state.cities.map(this.singleCityOption)}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Morate izabrati grad.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Adresa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Adresa"
                            id="address"
                            value={this.state.restaurant.address}
                            onChange={this.formInputChanged}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Polje ne sme biti prazno.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Opis restorana</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Lozinka"
                            id="description"
                            value={this.state.restaurant.description}
                            onChange={this.formInputChanged}
                        />
                        <Form.Control.Feedback type="invalid">
                            Polje nije proslo proveru.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Slika</Form.Label>
                        <Form.File
                            id="confirmPassword"
                            onChange={this.formInputChanged}
                        />
                        <Form.Control.Feedback type="invalid">
                            Polje nije proslo proveru.
                        </Form.Control.Feedback>
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
        api("utility/cities", "get").then((res: ApiResponseType) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                console.log("greska");
                return;
            }
            if (res.status === "ok") {
                this.putCitiesInState(res.data?.data);
            } else {
                console.log("greska");
            }
        });
    }

    putCitiesInState(cities: CityType[]) {
        const newState = Object.assign(this.state, {
            cities: cities,
        });
        this.setState(newState);
    }

    singleCityOption(city: CityType) {
        return <option value={city.id}>{city.name}</option>;
    }

    handleSubmit = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            this.setFormValidate(true);
            return;
        }

        api("restourant/add", "post", this.state.restaurant).then((res: ApiResponseType) => {
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
            }

            if (res.status === "ok") {
                if (res.data?.status === "error") {
                    this.setErrorMessage(res.data.message);
                } else {
                    this.setRestaurantAddedState(true, res.data?.data.name);
                }
            } else if (res.status === "error") {
                this.setErrorMessage("Server error");
            }

        });
    };

    private formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = Object.assign(this.state, {
            restaurant: Object.assign(this.state.restaurant, {
                [event.target.id]: event.target.value
            })
        });
        console.log(event.target.value)
        console.log(newState)
        this.setState(newState);
    };

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

    private setRestaurantAddedState(isAdded: boolean, restaurantAddedName: string) {
        const newState = Object.assign(this.state, {
            restaurantAdded: isAdded,
            restaurantAddedName: restaurantAddedName,
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
}