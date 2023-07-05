import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstForm from './components/page/FirstForm';
import KakeiboForm from './components/page/KakeiboForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<FirstForm />}></Route>
        <Route path={'/kakeibo'} element={<KakeiboForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
