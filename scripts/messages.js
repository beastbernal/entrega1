const formatDate = (date) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
  let d = new Date(date).toLocaleString("es-CO", options);
  return (
    <span>
      {d}
    </span>
  )
}

function ModalMsg({title, message, show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} centered  size="lg">
        <Modal.Header closeButton className="alert-primary">
        <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Aceptar
        </Button>
        </Modal.Footer>
    </Modal>
  );
}
