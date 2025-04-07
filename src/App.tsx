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
import ContextProvider from '@/src/components/ContextProvider'
import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import SetRootPasswordRoute from '@/src/security/SetRootPasswordRoute'
import ProductionRoute from '@/src/security/ProductionRoute'
import PrivateRoute from '@/src/security/PrivateRoute'
import RootRoute from '@/src/security/RootRoute'
import SetRootPasswordPage from '@/src/pages/SetRootPasswordPage'
import LoginPage from '@/src/pages/LoginPage'
import HomePage from '@/src/pages/HomePage'
import ChangePasswordPage from '@/src/pages/ChangePasswordPage'
import InvoicesPage from '@/src/pages/InvoicesPage'
import UsersPage from '@/src/pages/UsersPage'
import AddUserPage from '@/src/pages/AddUserPage'
import AddInvoicePage from '@/src/pages/AddInvoicePage'
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
                path='/users/login'
                element={<LoginPage/>}
              />
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
                  path='/home'
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