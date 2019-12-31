import React from 'react';
import { EnhancedTable } from './components/pages';
import { HeaderBlock, FooterBlock } from './components/blocks';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './components/styles/index.scss';
function App() {
  return (
    <div className="app">
      <HeaderBlock/>
          <Router>
              <Switch>
                  <Route path="/education.queue"  component={EnhancedTable}/>
                  <Route path="/"><Redirect to="/education.queue"/></Route>
                </Switch>
          </Router>
        <FooterBlock/>
    </div>
  );
}

export default App;
