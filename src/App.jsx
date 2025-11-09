import { Routes, Route } from 'react-router-dom';


function Home() {
  return <h1>Página Inicio</h1>;
}

function Otro() {
  return <h1>Página Otro</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/otro" element={<Otro />} />
    </Routes>
  );
}
export default App;

