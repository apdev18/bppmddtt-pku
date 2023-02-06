import './App.css';
import Routers from "./router";
import { cBseUrl } from './constants/constants';
import {
  popperMin,
  anchorJs,
  Is,
  fontAwesome,
  lodaSh,
  httpsPolyfill,
  List,
  featherIcons,
  dayJs,
  phoenix,
  eCharts,
  chart,
  leaFlet,
  leafletMarkercluster,
  leafletTilelayer,
  ecommerceDashboard
} from './scripts/scripts'
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <script src={cBseUrl + anchorJs} type="text/javascript" />
        <script src={cBseUrl + popperMin} type="text/javascript" />
        <script src={cBseUrl + Is} type="text/javascript" />
        <script src={cBseUrl + fontAwesome} type="text/javascript" />
        <script src={cBseUrl + lodaSh} type="text/javascript" />
        <script src={cBseUrl + List} type="text/javascript" />
        <script src={cBseUrl + featherIcons} type="text/javascript" />
        <script src={cBseUrl + dayJs} type="text/javascript" />
        <script src={cBseUrl + phoenix} type="text/javascript" />
        <script src={cBseUrl + eCharts} type="text/javascript" />
        <script src={cBseUrl + chart} type="text/javascript" />
        <script src={cBseUrl + leaFlet} type="text/javascript" />
        <script src={cBseUrl + List} type="text/javascript" />
        <script src={cBseUrl + leafletMarkercluster} type="text/javascript" />
        <script src={cBseUrl + leafletTilelayer} type="text/javascript" />
        <script src={cBseUrl + ecommerceDashboard} type="text/javascript" />
        <script src={httpsPolyfill} type="text/javascript" />

      </Helmet>
      <Routers />
    </div>
  );
}

export default App;