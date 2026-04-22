
export default function Home() {
    return (
       <div className="w-full bg-gradient-main flex justify-content-center">
                <div className="flex flex-column lg:col-8 md:col-10 col-12 justify-content-center align-items-center mb-4">
                    <div className="text-center mb-4 p-2 md:p-0">
                        <h1 className="display-4">Home</h1>
                    </div>
                    <div className="col-10 md:col-12 flex flex-row align-items-center justify-content-center">
                        <p className="text-center">About:
                          <br />  This is a test task created to pass the selection for the position Junior React Developer
                          <br /> Click "Login" on top bar, you can create any User, choose Role (this is nessesery) 
                          <br />
                          <br />Registration and re-entry are available, the role is determined at the time of registration, validation of fields (zod schemes), error handling (during login, registration and creating applications)
                          <br /> Additionally, for the manager role, there are tabs for viewing applications, changing status, as well as a tab with a list of registered users in the system.
                        </p>
                    </div>
                </div>
            </div >
    )
}