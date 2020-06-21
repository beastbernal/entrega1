const CardHotel = ({info}) =>{
    console.debug("info", info);
    return (
        <Card key={info.name + '-card'} border="primary">
        <Card.Img variant="top" src={info.photo} />
        <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Text>
            {info.description} - 
            <br/>
            {"initial =>" + moment(info.availabilityFrom).format("YYYY-MM-DD") } -
            <br/>
            {"final =>" + moment(info.availabilityTo).format("YYYY-MM-DD")} -
            </Card.Text>
            <ListGroup variant="flush">
                <ListGroup.Item>{info.city}, {info.country}</ListGroup.Item>
                <ListGroup.Item><Row><Col>rooms {info.rooms}</Col><Col>price {info.price}</Col></Row></ListGroup.Item>
            </ListGroup>
            <Button variant="success" block>Reservar</Button>
        </Card.Body>
        </Card>
    );
}

const Cards = ({array}) => {
    console.debug("hotels", array);
    return (<Container>
        <Row>
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

