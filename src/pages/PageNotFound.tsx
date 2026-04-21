function PageNotFound() {
    return (
        <>
            <div className="col-12 md:col-6 lg:col-4 flex flex-column align-items-center gap-5 pb-5 mx-auto">
                <h1>Page not found</h1>
                <div className="error-404">404</div>
                <div>This page doesn't exist</div>
                <a href="/"
                    className="btn-main primary-btn">Back to Home</a>
            </div>
        </>
    )
}

export default PageNotFound