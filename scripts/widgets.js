function IconGroup({ icon, iconNumber }) {
  let content = [];
  if (iconNumber < 0) {
    content.push("Aún no ha seleccionado esta opción");
  } else {
    for (let i = 0; i < iconNumber; i++) {
      content.push(
        <i className={"fa " + icon + " fa-lg"} key={"icon-" + i}></i>
      );
    }
  }
  return content;
}

function WidgetSize({ sizeNumber }) {
  let content = [];
  if (sizeNumber < 0) {
    content.push("Aún no ha seleccionado esta opción");
  } else {
    for (let i = 0; i < sizeNumber; i++) {
      content.push(
        <i className={"fa fa-bed fa-lg"} key={"icon-" + i}></i>
      );
    }
  }
  return content;
}

function WidgetGeneric({ text }) {
  let content = [];
  if (text < 0 || text.length === 0)  {
    content.push("Aún no ha seleccionado esta opción");     
  } else {
    content.push(<p key={"k -" + text}>{text}</p>);
  }
  return content;
}

function WidgetText({ text, icon, iconNumber }) {
  return (
    <div className="col-reduce">
      <InputGroup className="mb-3" variant="primary">
        <InputGroup.Prepend className="alert-primary">
          <InputGroup.Text id="basic-addon1" className="alert-primary">
            <IconGroup icon={icon} iconNumber={iconNumber} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          readOnly
          className="alert-primary label-icon"
          disabled
          value={text}
          placeholder={text}
          aria-label={text}
          aria-describedby={text}
        />
      </InputGroup>
    </div>
  );
}


function WidgetListEmpty({filter}){
    return (
        <ListGroup as="ul">
            <ListGroup.Item as="li" variant="primary">
            <Row noGutters>
                <Col sm={4}>
                    Fecha de inicio:
                </Col>
                <Col>
                    <WidgetGeneric text={filter.availabilityFrom}/>
                </Col>
            </Row>                     
            </ListGroup.Item>
            <ListGroup.Item as="li" >
            <Row noGutters>
                <Col sm={4}>
                    Fecha de Fin: 
                </Col>
                <Col>
                    <WidgetGeneric text={filter.availabilityTo}/>
                </Col>
            </Row>       
            </ListGroup.Item>
            <ListGroup.Item as="li" variant="primary">
            <Row noGutters>
                <Col sm={4}>
                    País:
                </Col>
                <Col>
                    <WidgetGeneric text={filter.country}/>
                </Col>
            </Row>      
            </ListGroup.Item>
            <ListGroup.Item as="li" >
            <Row noGutters>
                <Col sm={4}>
                    Precio
                </Col>
                <Col>
                    <IconGroup text={ ""}  icon="fa-usd" iconNumber={filter.price} />
                </Col>
            </Row>
            </ListGroup.Item>
            <ListGroup.Item as="li" >
            <Row noGutters>
                <Col sm={4}>
                    Tamaño:
                </Col>
                <Col>
                    <WidgetSize sizeNumber={filter.rooms}/>
                </Col>
            </Row>    
            </ListGroup.Item>
        </ListGroup>
    );
}