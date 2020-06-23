const formatDate = (date) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  let d = new Date(date).toLocaleString("es-CO", options);
  return (
    <span>
      {d}
    </span>
  )
}

function Header({initial, final}) {
  return (
    <div>
        <Card variant="success" bg="success" text="light">
          <Card.Header as="h1">Hoteles</Card.Header>
          <Card.Body>
            <Card.Text>
              {!initial ? (
                <span> -- </span>
              ) : (
                <span>Desde el <strong> {formatDate(initial)} </strong></span>
              )}

              {!final ? (
                <span> -- </span>
              ) : (
                <span>Hasta el <strong> {formatDate(final)} </strong></span>
              )}
              {/* //  {props.initial} {props.final} */}
            </Card.Text>
          </Card.Body>
        </Card>
    </div>
  );
}
