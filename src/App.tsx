import {
  FunctionComponent,
  ReactElement
} from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import ContextProvider from './components/ContextProvider'
import Header from './components/Header'
import Footer from './components/Footer'
import SetRootPasswordRoute from './security/SetRootPasswordRoute'
import ProductionRoute from './security/ProductionRoute'
import PrivateRoute from './security/PrivateRoute'
import RootRoute from './security/RootRoute'
import LoginRoute from './security/LoginRoute'
import SetRootPasswordPage from './pages/SetRootPasswordPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import InvoicesPage from './pages/InvoicesPage'
import UsersPage from './pages/UsersPage'
import AddUserPage from './pages/AddUserPage'
import AddInvoicePage from './pages/AddInvoicePage'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App: FunctionComponent = (): ReactElement => (
  <ContextProvider>
    <BrowserRouter>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path=''
              element={<SetRootPasswordRoute/>}
            >
              <Route
                path='/setRootUserPassword'
                element={<SetRootPasswordPage/>}
              />
            </Route>
            <Route
              path=''
              element={<ProductionRoute/>}
            >
              <Route
                path=''
                element={<LoginRoute/>}
              >
                <Route
                  path='/users/login'
                  element={<LoginPage/>}
                />
              </Route>
              <Route
                path=''
                element={<PrivateRoute/>}
              >
                <Route
                  path='/users/logout'
                  element={<LoginPage/>}
                />
                <Route
                  index={true}
                  path='/'
                  element={<HomePage/>}
                />
                <Route
                  path='/users/changePassword'
                  element={<ChangePasswordPage/>}
                />
                <Route
                  path='/invoices/list'
                  element={<InvoicesPage/>}
                />
                <Route
                  path='/invoices/add'
                  element={<AddInvoicePage/>}
                />
                <Route
                  path=''
                  element={<RootRoute/>}
                >
                  <Route
                    path='/users/list'
                    element={<UsersPage/>}
                  />
                  <Route
                    path='/users/add'
                    element={<AddUserPage/>}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </BrowserRouter>
  </ContextProvider>
)
export default App