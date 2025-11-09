import { Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import Home from './pages/Home';
import RegistrarLectura from './pages/RegistrarLectura';
import Mediciones from './pages/Mediciones';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContainer />}>
        <Route index element={<Home />} />
        <Route path="registrar" element={<RegistrarLectura />} />
        <Route path="mediciones" element={<Mediciones />} />
      </Route>
    </Routes>
  );
}
export default App;
