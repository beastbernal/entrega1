const CardHotel = ({info}) =>{
    console.debug("info", info);
    return (
        <Card key={info.name + '-card'} border="primary">
        <Card.Img variant="top" src={info.photo} />
        <Card.Body>
            <Card.Title className="alert-primary">{info.name}</Card.Title>
            <Card.Text>
            {info.description}  
            {/* <br/>
            {"initial =>" + moment(info.availabilityFrom).format("YYYY-MM-DD") } -
            <br/>
            {"final =>" + moment(info.availabilityTo).format("YYYY-MM-DD")} - */}
            </Card.Text>
            <ListGroup variant="flush">
                <WidgetText text={info.city +", " + info.country} icon="fa-map-marker" iconNumber="1"/>
                <ListGroup.Item className="col-strict">
                    <Row noGutters>
                        <Col sm={8}>
                            <WidgetText text={ info.rooms + " Habitaciones"}  icon="fa-bed" iconNumber="1" />
                        </Col>
                        <Col>
                            <WidgetText text={ ""}  icon="fa-usd" iconNumber={info.price} />
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            <Button variant="success" block>Reservar</Button>
        </Card.Body>
        </Card>
    );
}

const Cards = ({array}) => {
    console.debug("hotels", array);
    return (<Container>
        <Row >
        {
        array.map((option) => {
            return (
                <Col sm={4} key={option.name + '-col'}>
                    <CardHotel info={option} key={option.name}/>
                </Col>
            );
        })
        }
        </Row>
    </Container>
    );
}

