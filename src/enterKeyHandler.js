const enterKeyHandler = (
  event,
  submitHandler
) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitHandler(event)
  }
}
export default enterKeyHandler