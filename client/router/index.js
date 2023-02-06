import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import Main from '../layouts/Main'

// views
import Login from '../authentication/login'
import { Dashboard } from '../views/dashboard'
import { Letters } from '../views/surat'
import { LetterUpdate } from '../views/surat/update'
import { CreateLetters } from '../views/surat/tambah'
import { Users } from '../views/users'
import { Categories } from '../views/kategori'
import { Departments } from '../views/departemen'
import { getIsAdmin } from '../common/sessions/common'
import { ErrorPage } from '../views/error/404'
import { UserSettings } from '../views/settings'
export default () => {
  const isAdmin = getIsAdmin()
  const navigate = useHistory()

  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route>
          <Main>
            <Switch>
              {isAdmin === '1' ?
                <>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/assign-letter' exact component={CreateLetters} />
                  <Route path='/users' exact component={Users} />
                  <Route path='/kategori' exact component={Categories} />
                  <Route path='/departemen' exact component={Departments} />
                  <Route path='/kategori' exact component={Letters} />
                  <Route path='/reply' exact component={LetterUpdate} />
                  <Route path='/settings' exact component={UserSettings} />
                </>
                :
                <>
                  <Route path='/kategori' exact component={Letters} />
                  <Route path='/reply' exact component={LetterUpdate} />
                  <Route path='/settings' exact component={UserSettings} />
                </>
              }
              <Route path='*' exact={true} component={ErrorPage} />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  )
}