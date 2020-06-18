const formatDate = (date) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  let d = new Date(date).toLocaleString("es-CO", options);
  return (
    <span>
      {d}
    </span>
  )
}
function Header(props) {
  return (
    <div>
        <Card variant="success" bg="success" text="light">
          <Card.Header as="h1">Hoteles</Card.Header>
          <Card.Body>
            <Card.Text>
              {!props.initial ? (
                null
              ) : (
                <span>Desde el <strong> {formatDate(props.initial)} </strong></span>
              )}

              {!props.final ? (
                null
              ) : (
                <span>Hasta el <strong> {formatDate(props.final)} </strong></span>
              )}
              {/* //  {props.initial} {props.final} */}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  );
}
