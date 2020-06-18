// const SegmentExampleStackedSegments = () => (
//   <Segment.Group stacked>
//     <Segment>Top</Segment>
//     <Segment>Middle</Segment>
//     <Segment>Bottom</Segment>
//   </Segment.Group>
// )
class HotelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      selectedDay: undefined,
      isEmpty: true,
      isDisabled: false,
      initialDate: null,
      finalDate: null,
      countries: [
        { value: -1, name: "Todos los paises" },
        { value: "Argentina", name: "Argentina" },
        { value: "Brasil", name: 'Brasil' },
        { value: "Chile", name: 'Chile' },
        { value: "Colombia", name: "Colombia" },
      ],
      prices: [
        { value: -1, name: "Todos los precios" },
        { value: 1, name: "$" },
        { value: 2, name: "$$" },
        { value: 3, name: "$$$" },
        { value: 4, name: "$$$$" },
      ],
      sizes: [
        { value: -1, name: "Todos los tamaños" },
        { value: 1, name: "Hotel Pequeño" },
        { value: 2, name: "Hotel Mediano" },
        { value: 3, name: "Hotel Grande" },
      ],
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        hotels: hotelsData,
      }
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
        {/* <Alert>
            This is a alert—check it out!
          </Alert> */}
        <Header initial={this.state.initialDate} final={this.state.finalDate} />
        {/* Header */}
        {/* <Card>
          <Card.Header as="h1">Hoteles</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong> Fecha de reserva</strong>
            </Card.Text>
          </Card.Body>
        </Card> */}
        {/* Header */}
        {/* Filters */}
        <Container fluid>
          <Row noGutters>
            <Col>
              <Alert variant="primary">
                <FormGroup>
                  {/* <Form.Label>Fecha Inicial</Form.Label> */}
                  <Form.Control type="date" placeholder="aaaa-mm-dd" 
                  name="initialDate" size="sm"
                  defaultValue={this.state.initialDate}
                  onChange={() => this.handleChange(event)} />
                </FormGroup>
                {/* <ControlLabel>Birthday</ControlLabel> */}
                {/* <FormControl
                  type="date"
                  style={{width:'100%'}}
                /> */}

                {/* <DayPickerInput
                value={selectedDay}
                onDayChange={this.handleDayChange}
                dayPickerProps={{
                  selectedDays: selectedDay,
                  disabledDays: {
                    daysOfWeek: [0, 6],
                  },
                }}
              /> */}
              </Alert>
            </Col>
            <Col>
              <Alert variant="primary">
                <FormGroup>
                  {/* <Form.Label>Fecha Final</Form.Label> */}
                  <Form.Control type="date" placeholder="aaaa-mm-dd" 
                  name="finalDate" size="sm"
                  defaultValue={this.state.finalDate}
                  onChange={() => this.handleChange(event)} />
                </FormGroup>
              </Alert>
            </Col>
            <Col>
              <Alert variant="primary">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control as="select" size="sm">
                    {this.state.countries.map((option) => {
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
            <Col>
              <Alert variant="primary">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control as="select" size="sm">
                    {this.state.prices.map((option) => {
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
            <Col>
              <Alert variant="primary">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  {/* <Form.Label>Paises</Form.Label> */}
                  <Form.Control as="select" size="sm">
                    {this.state.sizes.map((option) => {
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
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form> */}
      </div>
    );
  }
}

ReactDOM.render(<HotelForm />, document.getElementById("app"));
