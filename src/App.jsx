import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import store from './store'
import ConfigStatusFetcher from './components/ConfigStatusFetcher'
import Header from './components/Header'
import Footer from './components/Footer'
import SetupRoute from './security/SetupRoute'
import ProductionRoute from './security/ProductionRoute'
import PrivateRoute from './security/PrivateRoute'
import RootRoute from './security/RootRoute'
import SetupPage from './pages/SetupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import InvoicesPage from './pages/InvoicesPage'
import UsersPage from './pages/UsersPage'
import 'bootswatch/dist/united/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='' element={<SetupRoute/>}>
                <Route path='/setup' element={<SetupPage/>}/>
              </Route>
              <Route path='' element={<ProductionRoute/>}>
                <Route path='/users/login' element={<LoginPage/>}/>
                <Route path='' element={<PrivateRoute/>}>
                  <Route path='/users/logout' element={<LoginPage/>}/>
                  <Route index={true} path='/home' element={<HomePage/>}/>
                  <Route path='/users/changePassword' element={<ChangePasswordPage/>}/>
                  <Route path='/invoices' element={<InvoicesPage/>}/>
                  <Route path='' element={<RootRoute/>}>
                    <Route path='/users/list' element={<UsersPage/>}/>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer/>
        <ConfigStatusFetcher/>
        <ToastContainer/>
      </BrowserRouter>
    </Provider>
  )
}
export default App