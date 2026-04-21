import loadingSpinner from '../assets/icons/loadingSpinner.svg'
export default function Spinner() {
    return (
        <>
            <div className="spinner-15">
                <img src={loadingSpinner} />
            </div>
            Loading...
        </>
    )
}