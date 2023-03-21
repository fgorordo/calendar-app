export const CalendarEvent = ({ event }) => {
    const {title, user, start, end} = event;
    console.log(event)
  return (
    <>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </>
  )
}
