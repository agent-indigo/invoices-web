const Footer = () => {
    return (
        <footer className="bg-light text-center py-3">
            {Date().toLocaleString('en-CA', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })}
        </footer>
    )
}
export default Footer