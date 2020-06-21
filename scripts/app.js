//Clase frincipal mantiene los estados y llama los componentes
class HotelForm extends React.Component {
  constructor(props) {
    super(props);
    
    const GENERIC_VALUE = "-1";

    this.state = {
      showMessage: false,
      titleMessage: "",
      message: "",
      hotels: [],
      selectedDay: undefined,
      isEmpty: true,
      minFirstDate: null,
      minSecondDate: null,
      isDisabled: false,
      initialDate: "",
      finalDate: "",
      country: GENERIC_VALUE,
      price: GENERIC_VALUE,
      rooms: GENERIC_VALUE,
      COUNTRIES: [
        { value: -1, name: "Todos los paises" },
        { value: "Argentina", name: "Argentina" },
        { value: "Brasil", name: "Brasil" },
        { value: "Chile", name: "Chile" },
        { value: "Uruguay", name: "Uruguay" },
      ], 
      PRICES: [
        { value: -1, name: "Todos los precios" },
        { value: 1, name: "$" },
        { value: 2, name: "$$" },
        { value: 3, name: "$$$" },
        { value: 4, name: "$$$$" },
      ],  
      SIZES: [
        { value: -1, name: "Todos los tamaños" },
        { value: 1, name: "Hotel Pequeño" },
        { value: 2, name: "Hotel Mediano" },
        { value: 3, name: "Hotel Grande" },
      ]
      // filterBevahior
    };
  }

  handleClose = () =>
    this.setState({
      showMessage: false,
    });

  handleShow = () => ({
    showMessage: true,
  });

  formatStringDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  componentDidMount() {
    let dDay = this.formatStringDate(today);
    console.log("dDay", dDay);
    this.setState({
      hotels: hotelsData,
      minFirstDate: dDay,
      minSecondDate: dDay,
    });
  }

  //Filtra los precios si recibe un -1 los muestra todos
  filterRooms = (rooms, selectedRooms) => {
    switch (selectedRooms) {
      case "-1":
        return true;
      //Hotel pequeño 1 hasta 10 camas
      case "1": 
        if(rooms >= 1 && rooms <= 10) {
          return true;
        }
        break;
      //Hotel mediano 11 hasta 20 camas  
      case "2": 
        if(rooms >= 11 && rooms <= 20) {
          return true;
        }
        break;
      //Hotel mediano mas de 20 camas 
      case "3": 
        if(rooms >= 20) {
          return true;
        }
        break;  
      default:
        return false;
      }
    return false;
  };

  //Filtra los precios si recibe un -1 los muestra todos
  filterPrice = (price, selectedPrice) => {
    return selectedPrice === "-1"
      ? true
      : parseInt(selectedPrice) === parseInt(price);
  };

  //Filtra los paises si recibe un -1 los muestra todos
  filterCountry = (country, selectedCountry) => {
    return selectedCountry === "-1"
      ? true
      : selectedCountry.toLowerCase() === country.toLowerCase();
  };

  //Filtra la fecha inicial, la fecha seleccionada es superior o igual a las fechas iniciales disponibles
  filterInitialDate = (date, selectedDate) => {
    let result = true;
    if (!!selectedDate && selectedDate.length === 10) {
      //valida si la fecha es igual o superior
      result =
        moment(date).isSame(selectedDate) ||
        moment(date).isBefore(selectedDate);
    }
    return result;
  };

  //Filtra la fecha inicial, la fecha seleccionada es inferior o igual a las fechas finales disponibles
  filterFinalDate = (date, selectedDate) => {
    let result = true;
    // let dateParse = this.formatStringDate(date);
    if (!!selectedDate && selectedDate.length === 10) {
      //valida si la fecha es igual o inferior
      result =
        moment(date).isSame(selectedDate) ||
        moment(selectedDate).isBefore(date);
    }
    return result;
  };

  filterItems = (filter) => {
    let arrayFilter = hotelsData.filter(
      (el) =>
        this.filterInitialDate(
          this.formatStringDate(el.availabilityFrom),
          filter.availabilityFrom
        ) &&
        this.filterFinalDate(
          this.formatStringDate(el.availabilityTo),
          filter.availabilityTo
        ) &&
        this.filterCountry(el.country, filter.country) &&
        this.filterPrice(el.price, filter.price) &&
        this.filterRooms(el.rooms, filter.rooms) 
    );
    console.log("arrayFilter", arrayFilter);
    this.setState({
      hotels: arrayFilter,
    });
  };

  //Captura los cambios de fechas que solo cambian las fechas en el header
  handleFilterChange = (event) => {
    let selectedValue = event.target.value;
    let initialDate = this.state.initialDate;
    let finalDate = this.state.finalDate;
    let country = this.state.country;
    let price = this.state.price;
    let rooms = this.state.rooms;
    let todayFormat = this.formatStringDate(today);
    let showMessage = false;
    let titleMessage = "";
    let message = "";

    //Valida la fecha final si es menor a la fecha inicial la borra
    if (event.target.name === "initialDate") {
      if (this.state.finalDate && moment(finalDate).isBefore(selectedValue)) {
        finalDate = "";
      }
      if (
        !moment(selectedValue).isBefore(today) ||
        moment(selectedValue).isSame(todayFormat)
      ) {
        initialDate = selectedValue;
      } else {
        //this.handleShow();
        initialDate = todayFormat;
        showMessage = true;
        titleMessage = "Fecha no valida";
        message =
          "La fecha inicial no puede ser menor a la fecha actual, se define como fecha inicial la fecha de hoy";
      }
    } else if (event.target.name === "finalDate") {
      finalDate = selectedValue;
      if (this.state.initialDate) {
        initialDate = this.state.initialDate;
      }
      if (initialDate && moment(selectedValue).isBefore(initialDate)) {
        finalDate = initialDate;
        showMessage = true;
        titleMessage = "Fecha no valida";
        message =
          "La fecha final no puede ser menor a la fecha inicial, se define como fecha final la fecha inicial";
      }
    } else if (event.target.name === "country") {
      country = event.target.value;
    } else if (event.target.name === "price") {
      price = event.target.value;
    } else if (event.target.name === "rooms") {
      rooms = event.target.value;
    }

    this.setState(
      {
        initialDate: initialDate,
        finalDate: finalDate,
        showMessage: showMessage,
        titleMessage: titleMessage,
        message: message,
        country: country,
        price: price,
        rooms: rooms,
      },
      () => {
        let options = {
          availabilityFrom: initialDate,
          availabilityTo: finalDate,
          country: country,
          price: price,
          rooms: rooms,
        };
        this.filterItems(options);
      }
    );
  };

  //Captura los cambios de fechas que solo cambian las fechas en el header
  handleFirstDateChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, () => {});
  };

  //Captura los cambios de los select de filtros de Pais, tamaño y precio
  handleSelectChange = (event) => {
    let filterHotels =
      event.target.value === this.GENERIC_VALUE
        ? hotelsData
        : this.filterItems(event.target.id, event.target.value);
    this.setState({ hotels: filterHotels }, () => {
      console.debug(this.state.hotels);
    });
  };

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay,
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
    });
  };

  handleSubmit = (event) => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };

  render() {
    const { selectedDay, isDisabled, isEmpty } = this.state;
    return (
      <div>
        {/* Header */}
        <Header initial={this.state.initialDate} final={this.state.finalDate} />
        {/* Header */}

        {/* Filters */}
        <Container fluid>
          <Row noGutters>
            <Col xs={12} md={2}>
              <Alert variant="primary" className="col-reduce">
                <FormGroup>
                  {/* <Form.Label>Fecha Inicial</Form.Label> */}
                  <Form.Control
                    type="date"
                    placeholder="aaaa-mm-dd"
                    min={this.state.minFirstDate}
                    name="initialDate"
                    size="sm"
                    value={this.state.initialDate}
                    onChange={() => this.handleFilterChange(event)}
                  />
                </FormGroup>
              </Alert>
            </Col>
            <Col xs={12} md={2}>
              <Alert variant="primary" className="col-reduce">
                <FormGroup>
                  {/* <Form.Label>Fecha Final</Form.Label> */}
                  <Form.Control
                    type="date"
                    placeholder="aaaa-mm-dd"
                    min={this.state.minSecondDate}
                    name="finalDate"
                    size="sm"
                    value={this.state.finalDate}
                    onChange={() => this.handleFilterChange(event)}
                  />
                </FormGroup>
              </Alert>
            </Col>
            <Col xs={12} md={4}>
              <Alert variant="primary" className="col-reduce">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control
                    as="select"
                    size="sm"
                    name="country"
                    onChange={() => this.handleFilterChange(event)}
                  >
                    {this.state.COUNTRIES.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Alert>
            </Col>
            <Col xs={12} md={2}>
              <Alert variant="primary" className="col-reduce">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control
                    as="select"
                    size="sm"
                    name="price"
                    onChange={() => this.handleFilterChange(event)}
                  >
                    {this.state.PRICES.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Alert>
            </Col>
            <Col xs={12} md={2}>
              <Alert variant="primary" className="col-reduce">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control
                    as="select"
                    size="sm"
                    name="rooms"
                    onChange={() => this.handleFilterChange(event)}
                  >
                    {this.state.SIZES.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Alert>
            </Col>
          </Row>
        </Container>
        {/* Filters */}

        {/* Cards */}
        <Cards array={this.state.hotels}></Cards>

        {/* Cards */}
        {/* <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleFilterChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
        <ModalMsg
          show={this.state.showMessage}
          title={this.state.titleMessage}
          message={this.state.message}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

ReactDOM.render(<HotelForm />, document.getElementById("app"));
